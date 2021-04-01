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
  if (
    !Array.isArray(pluginConfig.services) ||
    pluginConfig.services.length === 0
  ) {
    errors.push(getError('ENODOCKERSERVICES', ctx))
  } else {
    pluginConfig.services.forEach(service => {
      if (!service.name) {
        errors.push(getError('ENODOCKERSERVICE', ctx))
      }
      if (!service.image) {
        errors.push(getError('ENODOCKERIMAGE', ctx))
      }
      if (
        service.updateOrder &&
        !['start-first', 'stop-first'].includes(service.updateOrder)
      ) {
        errors.push(getError('EINVALIDUPDATEORDER', ctx))
      }
    })
  }
  if (errors.length > 0) {
    throw new AggregateError(errors)
  }
}
