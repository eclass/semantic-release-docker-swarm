/* eslint-disable sonarjs/no-duplicate-string */
const { describe, it } = require('mocha')
const { expect } = require('chai')
const { WritableStreamBuffer } = require('stream-buffers')
const verify = require('../src/verify')

describe('Verify', () => {
  /** @type {import('../src/types').Config} */
  const pluginConfig = {}
  /** @type {import('../src/types').Context} */
  const context = {
    env: process.env,
    cwd: process.cwd(),
    // @ts-ignore
    stdout: new WritableStreamBuffer(),
    // @ts-ignore
    stderr: new WritableStreamBuffer(),
    logger: console
  }

  it('expect a SemanticReleaseError if a dockerHost option is not defined', () => {
    try {
      verify(pluginConfig, context)
    } catch (errs) {
      const err = errs._errors[0]
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('ENODOCKERHOST')
    }
  })

  it('expect a SemanticReleaseError if a service option is not defined', () => {
    try {
      pluginConfig.dockerHost = 'ssh://user@host'
      verify(pluginConfig, context)
    } catch (errs) {
      const err = errs._errors[0]
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('ENODOCKERSERVICE')
    }
  })

  it('expect a SemanticReleaseError if a image option is not defined', () => {
    try {
      pluginConfig.service = 'mystack_myservice'
      verify(pluginConfig, context)
    } catch (errs) {
      const err = errs._errors[0]
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('ENODOCKERIMAGE')
    }
  })

  it('expect a SemanticReleaseError if a updateOrder is invalid', () => {
    try {
      pluginConfig.image = 'myimage:latest'
      pluginConfig.updateOrder = 'StartFirst'
      verify(pluginConfig, context)
    } catch (errs) {
      const err = errs._errors[0]
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('EINVALIDUPDATEORDER')
    }
  })

  it('expect success verify', () => {
    pluginConfig.updateOrder = 'start-first'
    expect(verify(pluginConfig, context)).to.be.a('undefined')
  })
})
/* eslint-enable sonarjs/no-duplicate-string */
