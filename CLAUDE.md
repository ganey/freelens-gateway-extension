# Freelens Gateway Extension

A Freelens extension that provides UI support for Kubernetes Gateway API resources
and NGINX Gateway Fabric policies.

## Project Overview

This extension adds sidebar pages, detail panels, and context menus for:

### Gateway API (gateway.networking.k8s.io)

- **Gateway** - Gateway API gateway resources
- **HTTPRoute** - HTTP routing rules attached to gateways

### NGINX Gateway Fabric (gateway.nginx.org)

- **ClientSettingsPolicy** - Client connection behavior settings
- **NginxGateway** - NGINX Gateway Fabric configuration
- **NginxProxy** - NGINX proxy settings
- **SnippetsFilter** - NGINX config snippet filters (route-level)
- **SnippetsPolicy** - NGINX config snippet policies (attached via targetRef)
- **UpstreamSettingsPolicy** - Upstream/backend connection tuning

## Architecture

Based on the [freelens-example-extension](https://github.com/freelensapp/freelens-example-extension).

### Dual-Process Model

- **Main process** (`src/main/index.ts`): Extends `Main.LensExtension`, handles activation
- **Renderer process** (`src/renderer/index.tsx`): Extends `Renderer.LensExtension`, registers all UI components

### Key Extension Points (renderer class properties)

- `clusterPages` - Full-page list views for each resource type
- `clusterPageMenus` - Sidebar menu entries with icons
- `kubeObjectDetailItems` - Detail panels shown when viewing a resource
- `kubeObjectMenuItems` - Context menu actions on resources

### Directory Structure

```
src/
  main/
    index.ts                    # Main process entry point
  renderer/
    index.tsx                   # Renderer entry, registers all extension points
    components/                 # Shared UI components
    details/                    # Detail panel components per resource
    icons/                      # SVG icons for sidebar
    k8s/                        # KubeObject definitions per resource
      gateway/                  # Gateway kind
      httproute/                # HTTPRoute kind
      client-settings-policy/   # ClientSettingsPolicy kind
      nginx-gateway/            # NginxGateway kind
      nginx-proxy/              # NginxProxy kind
      snippets-filter/          # SnippetsFilter kind
      snippets-policy/          # SnippetsPolicy kind
      upstream-settings-policy/ # UpstreamSettingsPolicy kind
    pages/                      # List page components per resource
```

### Kubernetes Object Pattern

Each resource follows this pattern in `src/renderer/k8s/<resource>/`:

```typescript
// Extend LensExtensionKubeObject with the resource's spec/status types
export class MyResource extends Renderer.K8sApi.LensExtensionKubeObject<...> {
  static readonly kind = "MyResource";
  static readonly namespaced = true; // or false
  static readonly apiBase = "/apis/<group>/<version>/<plural>";
  static readonly crd = { apiVersions: [...], plural: "...", singular: "...", ... };
}
export class MyResourceApi extends Renderer.K8sApi.KubeApi<MyResource> {}
export class MyResourceStore extends Renderer.K8sApi.KubeObjectStore<MyResource, MyResourceApi> {}
```

### Host-Provided Dependencies (externalized at build time)

These are NOT bundled — they come from the Freelens host app via globals:

- `@freelensapp/extensions` → `global.LensExtensions`
- `react` → `global.React`
- `react-dom` → `global.ReactDom`
- `react-router-dom` → `global.ReactRouterDom`
- `mobx` → `global.Mobx`
- `mobx-react` → `global.MobxReact`

## Tech Stack

- **TypeScript** with `jsx: "react-jsx"` (automatic runtime, no `import React` needed)
- **React 17** (provided by Freelens host)
- **MobX 6** with 2023-05 decorator syntax (`@observable accessor`)
- **electron-vite** for building (NOT webpack)
- **SCSS Modules** with camelCaseOnly convention and auto-generated `.d.scss.ts`
- **pnpm** as package manager (via corepack)
- **Node.js >= 22**
- **Biome** for linting/formatting
- **Prettier** for additional formatting

## Build Commands

```sh
pnpm i                # Install dependencies
pnpm build            # Type-check + build (outputs to out/)
pnpm build:force      # Build without type-check
pnpm pack:dev         # Bump prerelease + build + pack .tgz for testing
pnpm type:check       # TypeScript type checking only
pnpm lint:check       # Run biome + prettier checks
pnpm lint:fix         # Auto-fix lint issues
pnpm clean            # Remove out/
pnpm clean:all        # Remove out/, node_modules/, .tgz, .d.scss.ts
```

## Build Output

- `out/main/index.js` — Main process entry (CJS)
- `out/renderer/index.js` — Renderer process entry (CJS)
- Only `out/**/*` is published

## Key Conventions

- All deps are `devDependencies` (host provides runtime deps)
- Output format is CommonJS (required by Freelens 1.x)
- Default export from each entry point is the extension class
- Use `KubeObjectListLayout` for resource list pages
- Use `DrawerItem` components in detail panels
- CSS class names from modules use camelCase only
- Keep resources namespaced where appropriate (Gateway API resources are namespaced)

## API Groups and Versions

| Resource               | API Group                 | Version  | Namespaced |
| ---------------------- | ------------------------- | -------- | ---------- |
| Gateway                | gateway.networking.k8s.io | v1       | Yes        |
| HTTPRoute              | gateway.networking.k8s.io | v1       | Yes        |
| ClientSettingsPolicy   | gateway.nginx.org         | v1alpha2 | Yes        |
| NginxGateway           | gateway.nginx.org         | v1alpha1 | Yes        |
| NginxProxy             | gateway.nginx.org         | v1alpha2 | Yes        |
| SnippetsFilter         | gateway.nginx.org         | v1alpha1 | Yes        |
| SnippetsPolicy         | gateway.nginx.org         | v1alpha1 | Yes        |
| UpstreamSettingsPolicy | gateway.nginx.org         | v1alpha1 | Yes        |
