import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import {
  type SnippetsPolicy,
  type SnippetsPolicyApi,
  snippetsPolicyStore,
} from "../k8s/snippets-policy/snippets-policy";

const sortingCallbacks = {
  name: (object: SnippetsPolicy) => object.getName(),
  namespace: (object: SnippetsPolicy) => object.getNs(),
  targets: (object: SnippetsPolicy) => object.getTargetRefString(),
  snippets: (object: SnippetsPolicy) => object.getSnippetCount(),
  age: (object: SnippetsPolicy) => object.getCreationTimestamp(),
};

const renderTableHeader = [
  { title: "Name", sortBy: "name" },
  { title: "Namespace", sortBy: "namespace" },
  { title: "Targets", sortBy: "targets" },
  { title: "Snippets", sortBy: "snippets" },
  { title: "Age", sortBy: "age" },
];

export const SnippetsPolicyPage = observer(() => {
  const { Component } = Renderer;

  if (!Component) {
    return <div>Renderer.Component is not available</div>;
  }

  const { KubeObjectAge, KubeObjectListLayout, LinkToNamespace, WithTooltip } = Component;

  return (
    <KubeObjectListLayout<SnippetsPolicy, SnippetsPolicyApi>
      tableId="snippetsPoliciesTable"
      className="SnippetsPolicies"
      store={snippetsPolicyStore}
      sortingCallbacks={sortingCallbacks}
      searchFilters={[(object: SnippetsPolicy) => object.getSearchFields()]}
      renderHeaderTitle="Snippets Policies"
      renderTableHeader={renderTableHeader}
      renderTableContents={(object: SnippetsPolicy) => [
        <WithTooltip key="name">{object.getName()}</WithTooltip>,
        <LinkToNamespace key="namespace" namespace={object.getNs()} />,
        object.getTargetRefString(),
        String(object.getSnippetCount()),
        <KubeObjectAge key="age" object={object} />,
      ]}
    />
  );
});
