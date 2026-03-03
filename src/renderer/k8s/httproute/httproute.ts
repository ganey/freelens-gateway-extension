import { Renderer } from "@freelensapp/extensions";

export interface HTTPRouteParentRef {
  group?: string;
  kind?: string;
  namespace?: string;
  name: string;
  sectionName?: string;
  port?: number;
}

export interface HTTPRouteMatch {
  path?: {
    type?: string;
    value?: string;
  };
  headers?: Array<{
    type?: string;
    name: string;
    value: string;
  }>;
  queryParams?: Array<{
    type?: string;
    name: string;
    value: string;
  }>;
  method?: string;
}

export interface HTTPRouteBackendRef {
  group?: string;
  kind?: string;
  name: string;
  namespace?: string;
  port?: number;
  weight?: number;
}

export interface HTTPRouteFilter {
  type: string;
  requestHeaderModifier?: Record<string, any>;
  responseHeaderModifier?: Record<string, any>;
  requestMirror?: Record<string, any>;
  requestRedirect?: Record<string, any>;
  urlRewrite?: Record<string, any>;
  extensionRef?: Record<string, any>;
}

export interface HTTPRouteRule {
  matches?: HTTPRouteMatch[];
  filters?: HTTPRouteFilter[];
  backendRefs?: HTTPRouteBackendRef[];
  timeouts?: {
    request?: string;
    backendRequest?: string;
  };
}

export interface HTTPRouteSpec {
  parentRefs?: HTTPRouteParentRef[];
  hostnames?: string[];
  rules?: HTTPRouteRule[];
}

export interface HTTPRouteStatus {
  parents?: Array<{
    parentRef: HTTPRouteParentRef;
    controllerName: string;
    conditions: Array<{
      type: string;
      status: string;
      lastTransitionTime?: string;
      reason?: string;
      message?: string;
    }>;
  }>;
}

export class HTTPRoute extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.KubeObjectMetadata,
  HTTPRouteStatus,
  HTTPRouteSpec
> {
  static readonly kind = "HTTPRoute";
  static readonly namespaced = true;
  static readonly apiBase = "/apis/gateway.networking.k8s.io/v1/httproutes";

  static readonly crd = {
    apiVersions: ["gateway.networking.k8s.io/v1"],
    plural: "httproutes",
    singular: "httproute",
    shortNames: [],
    title: "HTTP Routes",
  };

  getParentRefs() {
    return this.spec?.parentRefs ?? [];
  }

  getParentRefString() {
    return (
      this.getParentRefs()
        .map((p) => p.name)
        .join(", ") || "None"
    );
  }

  getHostnames() {
    return this.spec?.hostnames ?? [];
  }

  getHostnameString() {
    return this.getHostnames().join(", ") || "*";
  }

  getRules() {
    return this.spec?.rules ?? [];
  }

  getRuleCount() {
    return this.getRules().length;
  }
}

export class HTTPRouteApi extends Renderer.K8sApi.KubeApi<HTTPRoute> {}
export class HTTPRouteStore extends Renderer.K8sApi.KubeObjectStore<HTTPRoute, HTTPRouteApi> {}

export const httpRouteApi = new HTTPRouteApi({
  objectConstructor: HTTPRoute,
});

export const httpRouteStore = new HTTPRouteStore(httpRouteApi);
