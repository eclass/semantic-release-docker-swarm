/* eslint-disable require-jsdoc */
const { describe, it, before, after } = require('mocha')
const { expect } = require('chai')
const mock = require('mock-require')
const { WritableStreamBuffer, ReadableStreamBuffer } = require('stream-buffers')

describe('Publish', () => {
  let publish
  /** @type {import('../src/types').Config} */
  const pluginConfig = {}
  /** @type {import('../src/types').Context} */
  const context = {
    // @ts-ignore
    nextRelease: { version: '1.0.0' },
    env: process.env,
    cwd: process.cwd(),
    // @ts-ignore
    stdout: new WritableStreamBuffer(),
    // @ts-ignore
    stderr: new WritableStreamBuffer(),
    // @ts-ignore
    logger: { log: () => ({}) }
  }

  before(() => {
    const execaMock = (bin, params, options) => {
      const p = new Promise((resolve, reject) => {
        if (!options.env.DOCKER_HOST) {
          return reject(new Error('Docker host not found'))
        }
        resolve()
      })
      // @ts-ignore
      p.stdout = new ReadableStreamBuffer()
      // @ts-ignore
      p.stderr = new ReadableStreamBuffer()
      return p
    }
    mock('execa', execaMock)
    publish = require('../src/publish')
  })

  it('expect a EDOCKERHOST error', async () => {
    try {
      await publish(pluginConfig, context)
    } catch (errs) {
      const err = errs._errors[0]
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('EDOCKERHOST')
    }
  })

  it('expect success publish', async () => {
    pluginConfig.dockerHost = 'ssh://user@host'
    expect(await publish(pluginConfig, context)).to.be.a('undefined')
  })

  after(() => {
    mock.stopAll()
  })
})
/* eslint-enable require-jsdoc */
