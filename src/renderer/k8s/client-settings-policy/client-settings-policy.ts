import { Renderer } from "@freelensapp/extensions";

export interface PolicyTargetRef {
  group: string;
  kind: string;
  name: string;
  namespace?: string;
}

export interface ClientSettingsPolicyBody {
  maxSize?: string;
  timeout?: {
    read?: string;
    send?: string;
  };
}

export interface ClientSettingsPolicyKeepAlive {
  requests?: number;
  time?: string;
  timeout?: {
    header?: string;
    server?: string;
  };
}

export interface ClientSettingsPolicySpec {
  targetRef: PolicyTargetRef;
  body?: ClientSettingsPolicyBody;
  keepAlive?: ClientSettingsPolicyKeepAlive;
}

export interface ClientSettingsPolicyCondition {
  type: string;
  status: string;
  lastTransitionTime?: string;
  reason?: string;
  message?: string;
}

export interface ClientSettingsPolicyStatus {
  conditions?: ClientSettingsPolicyCondition[];
}

export class ClientSettingsPolicy extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.KubeObjectMetadata,
  ClientSettingsPolicyStatus,
  ClientSettingsPolicySpec
> {
  static readonly kind = "ClientSettingsPolicy";
  static readonly namespaced = true;
  static readonly apiBase = "/apis/gateway.nginx.org/v1alpha2/clientsettingspolicies";

  static readonly crd = {
    apiVersions: ["gateway.nginx.org/v1alpha2"],
    plural: "clientsettingspolicies",
    singular: "clientsettingspolicy",
    shortNames: [],
    title: "Client Settings Policies",
  };

  getTargetRef() {
    const ref = this.spec?.targetRef;
    if (!ref) return "None";
    return `${ref.kind}/${ref.name}`;
  }

  getBody() {
    return this.spec?.body;
  }

  getKeepAlive() {
    return this.spec?.keepAlive;
  }

  getConditions() {
    return this.status?.conditions ?? [];
  }
}

export class ClientSettingsPolicyApi extends Renderer.K8sApi.KubeApi<ClientSettingsPolicy> {}
export class ClientSettingsPolicyStore extends Renderer.K8sApi.KubeObjectStore<
  ClientSettingsPolicy,
  ClientSettingsPolicyApi
> {}

export const clientSettingsPolicyApi = new ClientSettingsPolicyApi({
  objectConstructor: ClientSettingsPolicy,
});

export const clientSettingsPolicyStore = new ClientSettingsPolicyStore(clientSettingsPolicyApi);
