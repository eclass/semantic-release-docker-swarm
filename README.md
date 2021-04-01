# @eclass/semantic-release-docker-swarm

[![npm](https://img.shields.io/npm/v/@eclass/semantic-release-docker-swarm.svg)](https://www.npmjs.com/package/@eclass/semantic-release-docker-swarm)
![Node.js CI](https://github.com/eclass/semantic-release-docker-swarm/workflows/Node.js%20CI/badge.svg)
[![downloads](https://img.shields.io/npm/dt/@eclass/semantic-release-docker-swarm.svg)](https://www.npmjs.com/package/@eclass/semantic-release-docker-swarm)
[![dependencies](https://img.shields.io/david/eclass/semantic-release-docker-swarm.svg)](https://david-dm.org/eclass/semantic-release-docker-swarm)
[![devDependency Status](https://img.shields.io/david/dev/eclass/semantic-release-docker-swarm.svg)](https://david-dm.org/eclass/semantic-release-docker-swarm#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/github/eclass/semantic-release-docker-swarm/badge.svg?branch=master)](https://coveralls.io/github/eclass/semantic-release-docker-swarm?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/f84f0bcb39c9a5c5fb99/maintainability)](https://codeclimate.com/github/eclass/semantic-release-docker-swarm/maintainability)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> [semantic-release](https://github.com/semantic-release/semantic-release) plugin to deploy docker swarm service

| Step               | Description                                |
| ------------------ | ------------------------------------------ |
| `verifyConditions` | Verify the presence of the plugin options. |
| `publish`          | Deploy app.                                |

## Install

```bash
npm i -D @eclass/semantic-release-docker-swarm
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/caribou/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/gitlab",
    "@eclass/semantic-release-docker-swarm"
  ]
}
```

## Configuration

### Options

| Variable      | Description                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------ |
| `dockerHost`  | URI for connect to remote docker host. Required. Example: `ssh://username@host`                  |
| `service`     | Name of the docker swarm service. Required.                                                      |
| `image`       | Name of docker image. Required. Example: `registry.gitlab.com/mygroup/myapp`                     |
| `updateOrder` | Order to update the service. Only `start-first` or `stop-first`. Optional. Default: `stop-first` |

### Examples

```json
{
  "plugins": [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/gitlab",
    [
      "@semantic-release/exec",
      {
        "prepareCmd": "sh .release/buildimage.sh"
      }
    ],
    [
      "@eclass/semantic-release-docker",
      {
        "baseImageName": "registry.gitlab.com/mygroup/myapp",
        "registries": [
          {
            "url": "registry.gitlab.com",
            "imageName": "registry.gitlab.com/mygroup/myapp",
            "user": "CI_REGISTRY_USER",
            "password": "CI_REGISTRY_PASSWORD"
          }
        ]
      }
    ],
    [
      "@eclass/semantic-release-docker-swarm",
      {
        "dockerHost": "ssh://username@host",
        "services": [
          {
            "name": "mystack_myservice",
            "image": "registry.gitlab.com/mygroup/myapp",
            "updateOrder": "start-first"
          },
          {
            "name": "mystack_myworker",
            "image": "registry.gitlab.com/mygroup/myapp",
            "updateOrder": "stop-first"
          }
        ]
      }
    ]
  ]
}
```

```yml
# .gitlab-ci.yml
release:
  image: node:alpine
  stage: release
  script:
    - npx semantic-release
  only:
    - master
```

```yml
# .travis.yml
language: node_js
cache:
  directories:
    - ~/.npm
node_js:
  - '12'
stages:
  - test
  - name: deploy
    if: branch = master
jobs:
  include:
    - stage: test
      script: npm t
    - stage: deploy
      script: npx semantic-release
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
