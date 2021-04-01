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
        'README.md#options'
      )}) must be set \`dockerHost\` in plugin config.`
    })
  ],
  [
    'ENODOCKERSERVICES',
    /**
     * @param {Context} ctx -
     * @returns {SemanticReleaseError} -
     */
    ctx => ({
      message: 'No docker services specified.',
      details: `A [docker services](${linkify(
        'README.md#options'
      )}) must be set \`services\` in plugin config.`
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
        'README.md#options'
      )}) must be set \`name\` in object \`service\` inside of \`services\` \`array\`.`
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
        'README.md#options'
      )}) must be set \`image\` in object \`service\` inside of \`services\` \`array\`.`
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
        'README.md#options'
      )}), if defined,  must be one of \`start-first\` or \`stop-first\` in object \`service\` inside of \`services\` \`array\`.`
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
