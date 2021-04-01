const AggregateError = require('aggregate-error')
const getError = require('./get-error')

/**
 * @typedef {import('./types').Context} Context
 * @typedef {import('./types').Config} Config
 */
/**
 * @param {Config} pluginConfig -
 * @param {Context} ctx -
 * @returns {*} -
 * @example
 * verifyConditions(pluginConfig, ctx)
 */
module.exports = (pluginConfig, ctx) => {
  const errors = []
  if (!pluginConfig.dockerHost) {
    errors.push(getError('ENODOCKERHOST', ctx))
  }
  if (!pluginConfig.service) {
    errors.push(getError('ENODOCKERSERVICE', ctx))
  }
  if (!pluginConfig.image) {
    errors.push(getError('ENODOCKERIMAGE', ctx))
  }
  if (
    pluginConfig.updateOrder &&
    !['start-first', 'stop-first'].includes(pluginConfig.updateOrder)
  ) {
    errors.push(getError('EINVALIDUPDATEORDER', ctx))
  }
  if (errors.length > 0) {
    throw new AggregateError(errors)
  }
}
