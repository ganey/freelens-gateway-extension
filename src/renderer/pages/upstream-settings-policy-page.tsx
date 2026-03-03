import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import {
  type UpstreamSettingsPolicy,
  type UpstreamSettingsPolicyApi,
  upstreamSettingsPolicyStore,
} from "../k8s/upstream-settings-policy/upstream-settings-policy";

const sortingCallbacks = {
  name: (object: UpstreamSettingsPolicy) => object.getName(),
  namespace: (object: UpstreamSettingsPolicy) => object.getNs(),
  targets: (object: UpstreamSettingsPolicy) => object.getTargetRefString(),
  zoneSize: (object: UpstreamSettingsPolicy) => object.getZoneSize(),
  age: (object: UpstreamSettingsPolicy) => object.getCreationTimestamp(),
};

const renderTableHeader = [
  { title: "Name", sortBy: "name" },
  { title: "Namespace", sortBy: "namespace" },
  { title: "Targets", sortBy: "targets" },
  { title: "Zone Size", sortBy: "zoneSize" },
  { title: "Age", sortBy: "age" },
];

export const UpstreamSettingsPolicyPage = observer(() => {
  const { Component } = Renderer;

  if (!Component) {
    return <div>Renderer.Component is not available</div>;
  }

  const { KubeObjectAge, KubeObjectListLayout, LinkToNamespace, WithTooltip } = Component;

  return (
    <KubeObjectListLayout<UpstreamSettingsPolicy, UpstreamSettingsPolicyApi>
      tableId="upstreamSettingsPoliciesTable"
      className="UpstreamSettingsPolicies"
      store={upstreamSettingsPolicyStore}
      sortingCallbacks={sortingCallbacks}
      searchFilters={[(object: UpstreamSettingsPolicy) => object.getSearchFields()]}
      renderHeaderTitle="Upstream Settings Policies"
      renderTableHeader={renderTableHeader}
      renderTableContents={(object: UpstreamSettingsPolicy) => [
        <WithTooltip key="name">{object.getName()}</WithTooltip>,
        <LinkToNamespace key="namespace" namespace={object.getNs()} />,
        object.getTargetRefString(),
        object.getZoneSize() || "-",
        <KubeObjectAge key="age" object={object} />,
      ]}
    />
  );
});
