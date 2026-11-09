import { Renderer } from "@freelensapp/extensions";
import { lazy } from "../utils";

export interface NginxGatewayLogging {
  level?: string;
}

export interface NginxGatewaySpec {
  logging?: NginxGatewayLogging;
}

export interface NginxGatewayCondition {
  type: string;
  status: string;
  lastTransitionTime?: string;
  reason?: string;
  message?: string;
}

export interface NginxGatewayStatus {
  conditions?: NginxGatewayCondition[];
}

export class NginxGateway extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.KubeObjectMetadata,
  NginxGatewayStatus,
  NginxGatewaySpec
> {
  static readonly kind = "NginxGateway";
  static readonly namespaced = true;
  static readonly apiBase = "/apis/gateway.nginx.org/v1alpha1/nginxgateways";

  static readonly crd = {
    apiVersions: ["gateway.nginx.org/v1alpha1"],
    plural: "nginxgateways",
    singular: "nginxgateway",
    shortNames: [],
    title: "NGINX Gateways",
  };

  getLogLevel() {
    return this.spec?.logging?.level ?? "info";
  }

  getConditions() {
    return this.status?.conditions ?? [];
  }
}

export class NginxGatewayApi extends Renderer.K8sApi.KubeApi<NginxGateway> {}
export class NginxGatewayStore extends Renderer.K8sApi.KubeObjectStore<NginxGateway, NginxGatewayApi> {}

export const nginxGatewayApi: NginxGatewayApi = lazy(
  () =>
    new NginxGatewayApi({
      objectConstructor: NginxGateway,
    }),
);

export const nginxGatewayStore: NginxGatewayStore = lazy(() => {
  const store = new NginxGatewayStore(nginxGatewayApi);
  Renderer.K8sApi.apiManager.registerStore(store);
  return store;
});
