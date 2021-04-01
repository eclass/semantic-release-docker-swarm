/* eslint-disable sonarjs/no-duplicate-string */
/**
 * @typedef {import('./types').Context} Context
 * @typedef {import('./types').SemanticReleaseError} SemanticReleaseError
 */

const pkg = require('../package.json')

const [homepage] = pkg.homepage.split('#')
/* eslint-disable no-unused-vars */
/**
 * @param {string} file -
 * @returns {string} -
 * @example
 * const link = linkify(href)
 */
const linkify = file => `${homepage}/blob/master/${file}`
/* eslint-enable no-unused-vars */

module.exports = new Map([
  [
    'ENODOCKERHOST',
    /**
     * @param {Context} ctx -
     * @returns {SemanticReleaseError} -
     */
    ctx => ({
      message: 'No docker host specified.',
      details: `A [docker host](${linkify(
        'README.md#environment-variables'
      )}) must be set \`dockerHost\` in plugin config.`
    })
  ],
  [
    'ENODOCKERSERVICE',
    /**
     * @param {Context} ctx -
     * @returns {SemanticReleaseError} -
     */
    ctx => ({
      message: 'No docker service specified.',
      details: `A [docker service](${linkify(
        'README.md#environment-variables'
      )}) must be set \`service\` in plugin config.`
    })
  ],
  [
    'ENODOCKERIMAGE',
    /**
     * @param {Context} ctx -
     * @returns {SemanticReleaseError} -
     */
    ctx => ({
      message: 'No docker image specified.',
      details: `A [docker image](${linkify(
        'README.md#environment-variables'
      )}) must be set \`image\` in plugin config.`
    })
  ],
  [
    'EINVALIDUPDATEORDER',
    /**
     * @param {Context} ctx -
     * @returns {SemanticReleaseError} -
     */
    ctx => ({
      message: 'Invalid updateOrder.',
      details: `The [updateOrder option](${linkify(
        'README.md#environment-variables'
      )}), if defined,  must be one of \`start-first\` or \`stop-first\` in plugin config.`
    })
  ],
  [
    'EDOCKERHOST',
    /**
     * @param {Context} ctx -
     * @returns {SemanticReleaseError} -
     */
    ctx => ({
      message: 'Error with docker host.',
      details: 'Fail send commands to remote docker host'
    })
  ]
])
/* eslint-enable sonarjs/no-duplicate-string */
