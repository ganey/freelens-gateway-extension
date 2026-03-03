import { Renderer } from "@freelensapp/extensions";

export interface GatewayListener {
  name: string;
  hostname?: string;
  port: number;
  protocol: string;
  tls?: {
    mode?: string;
    certificateRefs?: Array<{
      kind?: string;
      name: string;
      namespace?: string;
    }>;
  };
  allowedRoutes?: {
    namespaces?: {
      from?: string;
      selector?: Record<string, any>;
    };
    kinds?: Array<{
      kind: string;
      group?: string;
    }>;
  };
}

export interface GatewayAddress {
  type?: string;
  value: string;
}

export interface GatewaySpec {
  gatewayClassName: string;
  listeners: GatewayListener[];
  addresses?: GatewayAddress[];
}

export interface GatewayStatusAddress {
  type?: string;
  value: string;
}

export interface GatewayCondition {
  type: string;
  status: string;
  lastTransitionTime?: string;
  reason?: string;
  message?: string;
}

export interface GatewayStatus {
  addresses?: GatewayStatusAddress[];
  conditions?: GatewayCondition[];
  listeners?: Array<{
    name: string;
    attachedRoutes: number;
    conditions: GatewayCondition[];
    supportedKinds: Array<{
      kind: string;
      group?: string;
    }>;
  }>;
}

export class Gateway extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.KubeObjectMetadata,
  GatewayStatus,
  GatewaySpec
> {
  static readonly kind = "Gateway";
  static readonly namespaced = true;
  static readonly apiBase = "/apis/gateway.networking.k8s.io/v1/gateways";

  static readonly crd = {
    apiVersions: ["gateway.networking.k8s.io/v1"],
    plural: "gateways",
    singular: "gateway",
    shortNames: ["gtw"],
    title: "Gateways",
  };

  getGatewayClassName() {
    return this.spec?.gatewayClassName ?? "";
  }

  getListeners() {
    return this.spec?.listeners ?? [];
  }

  getListenerCount() {
    return this.getListeners().length;
  }

  getAddresses() {
    return this.status?.addresses ?? this.spec?.addresses ?? [];
  }

  getAddressString() {
    return (
      this.getAddresses()
        .map((a) => a.value)
        .join(", ") || "None"
    );
  }

  getConditions() {
    return this.status?.conditions ?? [];
  }
}

export class GatewayApi extends Renderer.K8sApi.KubeApi<Gateway> {}
export class GatewayStore extends Renderer.K8sApi.KubeObjectStore<Gateway, GatewayApi> {}

export const gatewayApi = new GatewayApi({
  objectConstructor: Gateway,
});

export const gatewayStore = new GatewayStore(gatewayApi);
