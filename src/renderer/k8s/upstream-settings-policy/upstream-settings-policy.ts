import { Renderer } from "@freelensapp/extensions";

export interface PolicyTargetRef {
  group: string;
  kind: string;
  name: string;
  namespace?: string;
}

export interface UpstreamSettingsPolicyKeepAlive {
  connections?: number;
  requests?: number;
  time?: string;
  timeout?: string;
}

export interface UpstreamSettingsPolicySpec {
  targetRefs: PolicyTargetRef[];
  zoneSize?: string;
  keepAlive?: UpstreamSettingsPolicyKeepAlive;
}

export interface UpstreamSettingsPolicyCondition {
  type: string;
  status: string;
  lastTransitionTime?: string;
  reason?: string;
  message?: string;
}

export interface UpstreamSettingsPolicyStatus {
  conditions?: UpstreamSettingsPolicyCondition[];
}

export class UpstreamSettingsPolicy extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.KubeObjectMetadata,
  UpstreamSettingsPolicyStatus,
  UpstreamSettingsPolicySpec
> {
  static readonly kind = "UpstreamSettingsPolicy";
  static readonly namespaced = true;
  static readonly apiBase = "/apis/gateway.nginx.org/v1alpha1/upstreamsettingspolicies";

  static readonly crd = {
    apiVersions: ["gateway.nginx.org/v1alpha1"],
    plural: "upstreamsettingspolicies",
    singular: "upstreamsettingspolicy",
    shortNames: [],
    title: "Upstream Settings Policies",
  };

  getTargetRefs() {
    return this.spec?.targetRefs ?? [];
  }

  getTargetRefString() {
    return (
      this.getTargetRefs()
        .map((r) => `${r.kind}/${r.name}`)
        .join(", ") || "None"
    );
  }

  getZoneSize() {
    return this.spec?.zoneSize ?? "";
  }

  getKeepAlive() {
    return this.spec?.keepAlive;
  }

  getConditions() {
    return this.status?.conditions ?? [];
  }
}

export class UpstreamSettingsPolicyApi extends Renderer.K8sApi.KubeApi<UpstreamSettingsPolicy> {}
export class UpstreamSettingsPolicyStore extends Renderer.K8sApi.KubeObjectStore<
  UpstreamSettingsPolicy,
  UpstreamSettingsPolicyApi
> {}

export const upstreamSettingsPolicyApi = new UpstreamSettingsPolicyApi({
  objectConstructor: UpstreamSettingsPolicy,
});

export const upstreamSettingsPolicyStore = new UpstreamSettingsPolicyStore(upstreamSettingsPolicyApi);
