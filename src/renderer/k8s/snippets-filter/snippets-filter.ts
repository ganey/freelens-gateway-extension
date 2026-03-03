import { Renderer } from "@freelensapp/extensions";

export interface Snippet {
  context: string;
  value: string;
}

export interface SnippetsFilterSpec {
  snippets: Snippet[];
}

export interface SnippetsFilterCondition {
  type: string;
  status: string;
  lastTransitionTime?: string;
  reason?: string;
  message?: string;
}

export interface SnippetsFilterStatus {
  conditions?: SnippetsFilterCondition[];
}

export class SnippetsFilter extends Renderer.K8sApi.LensExtensionKubeObject<
  Renderer.K8sApi.KubeObjectMetadata,
  SnippetsFilterStatus,
  SnippetsFilterSpec
> {
  static readonly kind = "SnippetsFilter";
  static readonly namespaced = true;
  static readonly apiBase = "/apis/gateway.nginx.org/v1alpha1/snippetsfilters";

  static readonly crd = {
    apiVersions: ["gateway.nginx.org/v1alpha1"],
    plural: "snippetsfilters",
    singular: "snippetsfilter",
    shortNames: [],
    title: "Snippets Filters",
  };

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

export class SnippetsFilterApi extends Renderer.K8sApi.KubeApi<SnippetsFilter> {}
export class SnippetsFilterStore extends Renderer.K8sApi.KubeObjectStore<SnippetsFilter, SnippetsFilterApi> {}

export const snippetsFilterApi = new SnippetsFilterApi({
  objectConstructor: SnippetsFilter,
});

export const snippetsFilterStore = new SnippetsFilterStore(snippetsFilterApi);
