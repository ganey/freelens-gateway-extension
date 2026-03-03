import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import { type Gateway, type GatewayApi, gatewayStore } from "../k8s/gateway/gateway";

const sortingCallbacks = {
  name: (object: Gateway) => object.getName(),
  namespace: (object: Gateway) => object.getNs(),
  class: (object: Gateway) => object.getGatewayClassName(),
  listeners: (object: Gateway) => object.getListenerCount(),
  age: (object: Gateway) => object.getCreationTimestamp(),
};

const renderTableHeader = [
  { title: "Name", sortBy: "name" },
  { title: "Namespace", sortBy: "namespace" },
  { title: "Class", sortBy: "class" },
  { title: "Listeners", sortBy: "listeners" },
  { title: "Addresses" },
  { title: "Age", sortBy: "age" },
];

export const GatewayPage = observer(() => {
  const { Component } = Renderer;

  if (!Component) {
    return <div>Renderer.Component is not available</div>;
  }

  const { KubeObjectAge, KubeObjectListLayout, LinkToNamespace, WithTooltip } = Component;

  return (
    <KubeObjectListLayout<Gateway, GatewayApi>
      tableId="gatewaysTable"
      className="Gateways"
      store={gatewayStore}
      sortingCallbacks={sortingCallbacks}
      searchFilters={[(object: Gateway) => object.getSearchFields()]}
      renderHeaderTitle="Gateways"
      renderTableHeader={renderTableHeader}
      renderTableContents={(object: Gateway) => [
        <WithTooltip key="name">{object.getName()}</WithTooltip>,
        <LinkToNamespace key="namespace" namespace={object.getNs()} />,
        object.getGatewayClassName(),
        String(object.getListenerCount()),
        object.getAddressString(),
        <KubeObjectAge key="age" object={object} />,
      ]}
    />
  );
});
