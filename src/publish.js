const execa = require('execa')
const AggregateError = require('aggregate-error')

const getError = require('./get-error')

/**
 * @typedef {import('./types').Context} Context
 * @typedef {import('./types').Config} Config
 */
/**
 * @param {Config} pluginConfig -
 * @param {Context} ctx -
 * @returns {Promise<*>} -
 * @example
 * verifyConditions(pluginConfig, ctx)
 */
module.exports = async (pluginConfig, ctx) => {
  try {
    ctx.logger.log('Pull new docker image in remote host')
    const env = { ...ctx.env, DOCKER_HOST: pluginConfig.dockerHost }
    const pullResult = execa(
      'docker',
      ['pull', `${pluginConfig.image}:${ctx.nextRelease.version}`],
      { cwd: ctx.cwd, env }
    )
    pullResult.stdout.pipe(ctx.stdout, { end: false })
    pullResult.stderr.pipe(ctx.stderr, { end: false })
    await pullResult
    ctx.logger.log(
      `Update service ${pluginConfig.service} to tag ${ctx.nextRelease.version}`
    )
    const updateOrder = pluginConfig.updateOrder || 'stop-first'
    const updateResult = execa(
      'docker',
      [
        'service',
        'update',
        '-d',
        '-q',
        '--image',
        `${pluginConfig.image}:${ctx.nextRelease.version}`,
        '--update-order',
        updateOrder,
        '--with-registry-auth',
        pluginConfig.service
      ],
      { cwd: ctx.cwd, env }
    )
    updateResult.stdout.pipe(ctx.stdout, { end: false })
    updateResult.stderr.pipe(ctx.stderr, { end: false })
    await updateResult
  } catch (err) {
    throw new AggregateError([getError('EDOCKERHOST', ctx)])
  }
}
