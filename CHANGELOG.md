# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-04-22

### Fixed

- Extension renderer failing to load after install from npm with
  `Cannot find module '.../out/renderer/index.js'`. The v0.1.0 build was
  emitted with `preserveModules: true`, producing a fragmented tree that
  included nested `out/renderer/node_modules/.vite_external/` directories.
  Publish/install pipelines can strip nested `node_modules` paths, breaking
  the require chain from the entry point. The renderer now ships as a single
  bundled `out/renderer/index.js`.

### Changed

- Production builds now bundle by default. Set `VITE_PRESERVE_MODULES=true`
  to opt into the old split-output behaviour.
- Moved `mobx` and `mobx-react` from `dependencies` to `devDependencies`.
  Both packages are provided by the Freelens host at runtime via globals.

## [0.1.0] - 2026-03-03

### Added

- Initial release with UI support for Kubernetes Gateway API resources
  (`Gateway`, `HTTPRoute`) and NGINX Gateway Fabric policies
  (`ClientSettingsPolicy`, `NginxGateway`, `NginxProxy`, `SnippetsFilter`,
  `SnippetsPolicy`, `UpstreamSettingsPolicy`).

[0.1.1]: https://github.com/ganey/freelens-gateway-extension/releases/tag/v0.1.1
[0.1.0]: https://github.com/ganey/freelens-gateway-extension/releases/tag/v0.1.0
