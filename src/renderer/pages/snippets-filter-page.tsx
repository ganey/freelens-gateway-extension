import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import {
  type SnippetsFilter,
  type SnippetsFilterApi,
  snippetsFilterStore,
} from "../k8s/snippets-filter/snippets-filter";

const sortingCallbacks = {
  name: (object: SnippetsFilter) => object.getName(),
  namespace: (object: SnippetsFilter) => object.getNs(),
  snippets: (object: SnippetsFilter) => object.getSnippetCount(),
  age: (object: SnippetsFilter) => object.getCreationTimestamp(),
};

const renderTableHeader = [
  { title: "Name", sortBy: "name" },
  { title: "Namespace", sortBy: "namespace" },
  { title: "Snippets", sortBy: "snippets" },
  { title: "Age", sortBy: "age" },
];

export const SnippetsFilterPage = observer(() => {
  const { Component } = Renderer;

  if (!Component) {
    return <div>Renderer.Component is not available</div>;
  }

  const { KubeObjectAge, KubeObjectListLayout, LinkToNamespace, WithTooltip } = Component;

  return (
    <KubeObjectListLayout<SnippetsFilter, SnippetsFilterApi>
      tableId="snippetsFiltersTable"
      className="SnippetsFilters"
      store={snippetsFilterStore}
      sortingCallbacks={sortingCallbacks}
      searchFilters={[(object: SnippetsFilter) => object.getSearchFields()]}
      renderHeaderTitle="Snippets Filters"
      renderTableHeader={renderTableHeader}
      renderTableContents={(object: SnippetsFilter) => [
        <WithTooltip key="name">{object.getName()}</WithTooltip>,
        <LinkToNamespace key="namespace" namespace={object.getNs()} />,
        String(object.getSnippetCount()),
        <KubeObjectAge key="age" object={object} />,
      ]}
    />
  );
});
