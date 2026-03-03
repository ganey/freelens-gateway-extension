import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import type { NginxGateway } from "../k8s/nginx-gateway/nginx-gateway";

export const NginxGatewayDetails = observer((props: any) => {
  const { Component } = Renderer;

  if (!Component) {
    return <div>Renderer.Component is not available</div>;
  }

  const { DrawerItem } = Component;
  const object: NginxGateway = props.object;

  if (!object) return null;

  return (
    <>
      <DrawerItem name="Log Level">{object.getLogLevel()}</DrawerItem>

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
