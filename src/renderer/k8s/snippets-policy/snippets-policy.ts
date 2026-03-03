import { Renderer } from "@freelensapp/extensions";

export interface PolicyTargetRef {
  group: string;
  kind: string;
  name: string;
  namespace?: string;
}

export interface Snippet {
  context: string;
  value: string;
}

export interface SnippetsPolicySpec {
  targetRefs: PolicyTargetRef[];
  snippets: Snippet[];
}

export interface SnippetsPolicyCondition {
  type: string;
  status: string;
  lastTransitionTime?: string;
  reason?: string;
  message?: string;
}

export interface SnippetsPolicyStatus {
  conditions?: SnippetsPolicyCondition[];
}

export class SnippetsPolicy extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.KubeObjectMetadata,
  SnippetsPolicyStatus,
  SnippetsPolicySpec
> {
  static readonly kind = "SnippetsPolicy";
  static readonly namespaced = true;
  static readonly apiBase = "/apis/gateway.nginx.org/v1alpha1/snippetspolicies";

  static readonly crd = {
    apiVersions: ["gateway.nginx.org/v1alpha1"],
    plural: "snippetspolicies",
    singular: "snippetspolicy",
    shortNames: [],
    title: "Snippets Policies",
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

  getSnippets() {
    return this.spec?.snippets ?? [];
  }

  getSnippetCount() {
    return this.getSnippets().length;
  }

  getConditions() {
    return this.status?.conditions ?? [];
  }
}

export class SnippetsPolicyApi extends Renderer.K8sApi.KubeApi<SnippetsPolicy> {}
export class SnippetsPolicyStore extends Renderer.K8sApi.KubeObjectStore<SnippetsPolicy, SnippetsPolicyApi> {}

export const snippetsPolicyApi = new SnippetsPolicyApi({
  objectConstructor: SnippetsPolicy,
});

export const snippetsPolicyStore = new SnippetsPolicyStore(snippetsPolicyApi);
