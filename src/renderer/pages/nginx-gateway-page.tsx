import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import { type NginxGateway, type NginxGatewayApi, nginxGatewayStore } from "../k8s/nginx-gateway/nginx-gateway";

const sortingCallbacks = {
  name: (object: NginxGateway) => object.getName(),
  namespace: (object: NginxGateway) => object.getNs(),
  logLevel: (object: NginxGateway) => object.getLogLevel(),
  age: (object: NginxGateway) => object.getCreationTimestamp(),
};

const renderTableHeader = [
  { title: "Name", sortBy: "name" },
  { title: "Namespace", sortBy: "namespace" },
  { title: "Log Level", sortBy: "logLevel" },
  { title: "Age", sortBy: "age" },
];

export const NginxGatewayPage = observer(() => {
  const { Component } = Renderer;

  if (!Component) {
    return <div>Renderer.Component is not available</div>;
  }

  const { KubeObjectAge, KubeObjectListLayout, LinkToNamespace, WithTooltip } = Component;

  return (
    <KubeObjectListLayout<NginxGateway, NginxGatewayApi>
      tableId="nginxGatewaysTable"
      className="NginxGateways"
      store={nginxGatewayStore}
      sortingCallbacks={sortingCallbacks}
      searchFilters={[(object: NginxGateway) => object.getSearchFields()]}
      renderHeaderTitle="NGINX Gateways"
      renderTableHeader={renderTableHeader}
      renderTableContents={(object: NginxGateway) => [
        <WithTooltip key="name">{object.getName()}</WithTooltip>,
        <LinkToNamespace key="namespace" namespace={object.getNs()} />,
        object.getLogLevel(),
        <KubeObjectAge key="age" object={object} />,
      ]}
    />
  );
});
