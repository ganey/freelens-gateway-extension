import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import type { Gateway } from "../k8s/gateway/gateway";

export const GatewayDetails = observer((props: any) => {
  const { Component } = Renderer;

  if (!Component) {
    return <div>Renderer.Component is not available</div>;
  }

  const { DrawerItem } = Component;
  const object: Gateway = props.object;

  if (!object) return null;

  return (
    <>
      <DrawerItem name="Gateway Class">{object.getGatewayClassName()}</DrawerItem>

      <DrawerItem name="Addresses">{object.getAddressString()}</DrawerItem>

      <DrawerItem name="Listeners">
        {object.getListeners().length === 0 ? (
          "None"
        ) : (
          <ul style={{ margin: 0, paddingLeft: "1.5em" }}>
            {object.getListeners().map((listener) => (
              <li key={listener.name}>
                {listener.name} - {listener.protocol}:{listener.port}
                {listener.hostname ? ` (${listener.hostname})` : ""}
              </li>
            ))}
          </ul>
        )}
      </DrawerItem>

      {object.getConditions().length > 0 && (
        <DrawerItem name="Conditions">
          <ul style={{ margin: 0, paddingLeft: "1.5em" }}>
            {object.getConditions().map((condition) => (
              <li key={condition.type}>
                {condition.type}: {condition.status}
                {condition.reason ? ` (${condition.reason})` : ""}
              </li>
            ))}
          </ul>
        </DrawerItem>
      )}
    </>
  );
});
