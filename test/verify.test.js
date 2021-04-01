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

  it('expect a SemanticReleaseError if a services option is not defined', () => {
    try {
      pluginConfig.dockerHost = 'ssh://user@host'
      verify(pluginConfig, context)
    } catch (errs) {
      const err = errs._errors[0]
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('ENODOCKERSERVICES')
    }
  })

  it('expect a SemanticReleaseError if a services[].name option is not defined', () => {
    try {
      pluginConfig.services = [{}]
      verify(pluginConfig, context)
    } catch (errs) {
      const err = errs._errors[0]
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('ENODOCKERSERVICE')
    }
  })

  it('expect a SemanticReleaseError if a services[].image option is not defined', () => {
    try {
      pluginConfig.services = [{ name: 'mystack_myservice' }]
      verify(pluginConfig, context)
    } catch (errs) {
      const err = errs._errors[0]
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('ENODOCKERIMAGE')
    }
  })

  it('expect a SemanticReleaseError if a services[].updateOrder is invalid', () => {
    try {
      pluginConfig.services[0].image = 'myimage:latest'
      pluginConfig.services[0].updateOrder = 'StartFirst'
      verify(pluginConfig, context)
    } catch (errs) {
      const err = errs._errors[0]
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('EINVALIDUPDATEORDER')
    }
  })

  it('expect success verify', () => {
    pluginConfig.services[0].updateOrder = 'start-first'
    expect(verify(pluginConfig, context)).to.be.a('undefined')
  })
})
/* eslint-enable sonarjs/no-duplicate-string */
