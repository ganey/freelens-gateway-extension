import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import {
  type ClientSettingsPolicy,
  type ClientSettingsPolicyApi,
  clientSettingsPolicyStore,
} from "../k8s/client-settings-policy/client-settings-policy";

const sortingCallbacks = {
  name: (object: ClientSettingsPolicy) => object.getName(),
  namespace: (object: ClientSettingsPolicy) => object.getNs(),
  target: (object: ClientSettingsPolicy) => object.getTargetRef(),
  age: (object: ClientSettingsPolicy) => object.getCreationTimestamp(),
};

const renderTableHeader = [
  { title: "Name", sortBy: "name" },
  { title: "Namespace", sortBy: "namespace" },
  { title: "Target", sortBy: "target" },
  { title: "Age", sortBy: "age" },
];

export const ClientSettingsPolicyPage = observer(() => {
  const { Component } = Renderer;

  if (!Component) {
    return <div>Renderer.Component is not available</div>;
  }

  const { KubeObjectAge, KubeObjectListLayout, LinkToNamespace, WithTooltip } = Component;

  return (
    <KubeObjectListLayout<ClientSettingsPolicy, ClientSettingsPolicyApi>
      tableId="clientSettingsPoliciesTable"
      className="ClientSettingsPolicies"
      store={clientSettingsPolicyStore}
      sortingCallbacks={sortingCallbacks}
      searchFilters={[(object: ClientSettingsPolicy) => object.getSearchFields()]}
      renderHeaderTitle="Client Settings Policies"
      renderTableHeader={renderTableHeader}
      renderTableContents={(object: ClientSettingsPolicy) => [
        <WithTooltip key="name">{object.getName()}</WithTooltip>,
        <LinkToNamespace key="namespace" namespace={object.getNs()} />,
        object.getTargetRef(),
        <KubeObjectAge key="age" object={object} />,
      ]}
    />
  );
});
