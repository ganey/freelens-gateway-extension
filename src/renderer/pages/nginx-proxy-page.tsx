import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import { type NginxProxy, type NginxProxyApi, nginxProxyStore } from "../k8s/nginx-proxy/nginx-proxy";

const sortingCallbacks = {
  name: (object: NginxProxy) => object.getName(),
  namespace: (object: NginxProxy) => object.getNs(),
  ipFamily: (object: NginxProxy) => object.getIPFamily(),
  age: (object: NginxProxy) => object.getCreationTimestamp(),
};

const renderTableHeader = [
  { title: "Name", sortBy: "name" },
  { title: "Namespace", sortBy: "namespace" },
  { title: "IP Family", sortBy: "ipFamily" },
  { title: "HTTP/2", sortBy: "http2" },
  { title: "Age", sortBy: "age" },
];

export const NginxProxyPage = observer(() => {
  const { Component } = Renderer;

  if (!Component) {
    return <div>Renderer.Component is not available</div>;
  }

  const { KubeObjectAge, KubeObjectListLayout, LinkToNamespace, WithTooltip } = Component;

  return (
    <KubeObjectListLayout<NginxProxy, NginxProxyApi>
      tableId="nginxProxiesTable"
      className="NginxProxies"
      store={nginxProxyStore}
      sortingCallbacks={sortingCallbacks}
      searchFilters={[(object: NginxProxy) => object.getSearchFields()]}
      renderHeaderTitle="NGINX Proxies"
      renderTableHeader={renderTableHeader}
      renderTableContents={(object: NginxProxy) => [
        <WithTooltip key="name">{object.getName()}</WithTooltip>,
        <LinkToNamespace key="namespace" namespace={object.getNs()} />,
        object.getIPFamily(),
        object.isHTTP2Disabled() ? "Disabled" : "Enabled",
        <KubeObjectAge key="age" object={object} />,
      ]}
    />
  );
});
