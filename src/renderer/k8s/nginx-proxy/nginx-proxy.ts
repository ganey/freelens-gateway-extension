import { Renderer } from "@freelensapp/extensions";

export interface NginxProxyTelemetry {
  exporter?: {
    endpoint?: string;
    batchSize?: number;
    batchCount?: number;
    interval?: string;
  };
  serviceName?: string;
  spanAttributes?: Array<{
    key: string;
    value: string;
  }>;
}

export interface NginxProxySpec {
  ipFamily?: string;
  disableHTTP2?: boolean;
  telemetry?: NginxProxyTelemetry;
  rewriteClientIP?: {
    mode?: string;
    setIPRecursively?: boolean;
    trustedAddresses?: Array<{
      type: string;
      value: string;
    }>;
  };
}

export interface NginxProxyCondition {
  type: string;
  status: string;
  lastTransitionTime?: string;
  reason?: string;
  message?: string;
}

export interface NginxProxyStatus {
  conditions?: NginxProxyCondition[];
}

export class NginxProxy extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.KubeObjectMetadata,
  NginxProxyStatus,
  NginxProxySpec
> {
  static readonly kind = "NginxProxy";
  static readonly namespaced = true;
  static readonly apiBase = "/apis/gateway.nginx.org/v1alpha2/nginxproxies";

  static readonly crd = {
    apiVersions: ["gateway.nginx.org/v1alpha2"],
    plural: "nginxproxies",
    singular: "nginxproxy",
    shortNames: [],
    title: "NGINX Proxies",
  };

  getIPFamily() {
    return this.spec?.ipFamily ?? "dual";
  }

  isHTTP2Disabled() {
    return this.spec?.disableHTTP2 ?? false;
  }

  getConditions() {
    return this.status?.conditions ?? [];
  }
}

export class NginxProxyApi extends Renderer.K8sApi.KubeApi<NginxProxy> {}
export class NginxProxyStore extends Renderer.K8sApi.KubeObjectStore<NginxProxy, NginxProxyApi> {}

export const nginxProxyApi = new NginxProxyApi({
  objectConstructor: NginxProxy,
});

export const nginxProxyStore = new NginxProxyStore(nginxProxyApi);
