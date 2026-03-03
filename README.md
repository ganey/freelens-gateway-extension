# Freelens Gateway Extension

A [Freelens](https://github.com/freelensapp/freelens) extension that provides UI support for Kubernetes Gateway API resources and NGINX Gateway Fabric policies.

## Supported Resources

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

## Installation

### From npm

1. Open Freelens
2. Navigate to **Extensions** (File > Extensions)
3. Enter `freelens-gateway-extension` in the install input
4. Click **Install**

### From Release

1. Download the latest `.tgz` file from the [Releases](https://github.com/ganey/freelens-gateway-extension/releases) page
2. Open Freelens
3. Navigate to **Extensions** (File > Extensions)
4. Drag and drop the `.tgz` file into the install area, or paste the absolute path to the file
5. Click **Install**

### From Source

Requires Node.js >= 22 and pnpm.

```sh
git clone https://github.com/ganey/freelens-gateway-extension.git
cd freelens-gateway-extension
pnpm install
pnpm pack:dev
```

This produces a `.tgz` file in the project root. Install it in Freelens using the steps above.

## Prerequisites

The extension requires the relevant CRDs to be installed on your cluster.

### Gateway API CRDs

```sh
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.1/standard-install.yaml
```

### NGINX Gateway Fabric CRDs

NGINX Gateway Fabric CRDs are installed as part of the [NGINX Gateway Fabric installation](https://docs.nginx.com/nginx-gateway-fabric/installation/). Refer to the official documentation for setup instructions.

## Features

- **Sidebar navigation** with two menu groups: Gateway API and NGINX Gateway
- **List views** with sortable columns and search for all 8 resource types
- **Detail panels** shown when viewing individual resources, displaying spec and status information

## Development

```sh
pnpm install          # Install dependencies
pnpm build            # Type-check + build
pnpm build:force      # Build without type-check
pnpm type:check       # TypeScript type checking only
pnpm lint:check       # Run biome + prettier checks
pnpm lint:fix         # Auto-fix lint issues
pnpm clean            # Remove build output
```

## License

MIT
