import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import type { NginxProxy } from "../k8s/nginx-proxy/nginx-proxy";

export const NginxProxyDetails = observer((props: any) => {
  const { Component } = Renderer;

  if (!Component) {
    return <div>Renderer.Component is not available</div>;
  }

  const { DrawerItem } = Component;
  const object: NginxProxy = props.object;

  if (!object) return null;

  return (
    <>
      <DrawerItem name="IP Family">{object.getIPFamily()}</DrawerItem>

      <DrawerItem name="HTTP/2">{object.isHTTP2Disabled() ? "Disabled" : "Enabled"}</DrawerItem>

      {object.spec?.rewriteClientIP && (
        <>
          {object.spec.rewriteClientIP.mode && (
            <DrawerItem name="Rewrite Client IP Mode">{object.spec.rewriteClientIP.mode}</DrawerItem>
          )}
          {object.spec.rewriteClientIP.setIPRecursively !== undefined && (
            <DrawerItem name="Set IP Recursively">
              {object.spec.rewriteClientIP.setIPRecursively ? "Yes" : "No"}
            </DrawerItem>
          )}
        </>
      )}

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
