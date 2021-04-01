# [2.0.0](https://github.com/eclass/semantic-release-docker-swarm/compare/v1.0.0...v2.0.0) (2021-04-01)


### Features

* **config:** enable multiple services ([c24803d](https://github.com/eclass/semantic-release-docker-swarm/commit/c24803dae99c1e5a5c366ed52dc6d32a2fd36c41))


### BREAKING CHANGES

* **config:** to migrate to v2 update config to services array

v1
```json
{
  "dockerHost": "ssh://username@host",
  "service": "mystack_myservice",
  "image": "registry.gitlab.com/mygroup/myapp",
  "updateOrder": "start-first"
}
```

v2
```json
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
```

# 1.0.0 (2021-04-01)


### Bug Fixes

* **deps:** update all dependencies ([858458d](https://github.com/eclass/semantic-release-docker-swarm/commit/858458d49540d2612a640483b27436deb94a8311))


### Features

* first release ([c788d55](https://github.com/eclass/semantic-release-docker-swarm/commit/c788d550490395d53351301780462cbb45ee2864))
