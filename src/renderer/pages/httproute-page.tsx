import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import { type HTTPRoute, type HTTPRouteApi, httpRouteStore } from "../k8s/httproute/httproute";

const sortingCallbacks = {
  name: (object: HTTPRoute) => object.getName(),
  namespace: (object: HTTPRoute) => object.getNs(),
  hostnames: (object: HTTPRoute) => object.getHostnameString(),
  parents: (object: HTTPRoute) => object.getParentRefString(),
  rules: (object: HTTPRoute) => object.getRuleCount(),
  age: (object: HTTPRoute) => object.getCreationTimestamp(),
};

const renderTableHeader = [
  { title: "Name", sortBy: "name" },
  { title: "Namespace", sortBy: "namespace" },
  { title: "Hostnames", sortBy: "hostnames" },
  { title: "Parents", sortBy: "parents" },
  { title: "Rules", sortBy: "rules" },
  { title: "Age", sortBy: "age" },
];

export const HTTPRoutePage = observer(() => {
  const { Component } = Renderer;

  if (!Component) {
    return <div>Renderer.Component is not available</div>;
  }

  const { KubeObjectAge, KubeObjectListLayout, LinkToNamespace, WithTooltip } = Component;

  return (
    <KubeObjectListLayout<HTTPRoute, HTTPRouteApi>
      tableId="httpRoutesTable"
      className="HTTPRoutes"
      store={httpRouteStore}
      sortingCallbacks={sortingCallbacks}
      searchFilters={[(object: HTTPRoute) => object.getSearchFields()]}
      renderHeaderTitle="HTTP Routes"
      renderTableHeader={renderTableHeader}
      renderTableContents={(object: HTTPRoute) => [
        <WithTooltip key="name">{object.getName()}</WithTooltip>,
        <LinkToNamespace key="namespace" namespace={object.getNs()} />,
        object.getHostnameString(),
        object.getParentRefString(),
        String(object.getRuleCount()),
        <KubeObjectAge key="age" object={object} />,
      ]}
    />
  );
});
