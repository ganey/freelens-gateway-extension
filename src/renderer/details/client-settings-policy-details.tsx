import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import type { ClientSettingsPolicy } from "../k8s/client-settings-policy/client-settings-policy";

export const ClientSettingsPolicyDetails = observer((props: any) => {
  const { Component } = Renderer;

  if (!Component) {
    return <div>Renderer.Component is not available</div>;
  }

  const { DrawerItem } = Component;
  const object: ClientSettingsPolicy = props.object;

  if (!object) return null;

  const body = object.getBody();
  const keepAlive = object.getKeepAlive();

  return (
    <>
      <DrawerItem name="Target Ref">{object.getTargetRef()}</DrawerItem>

      {body && (
        <>
          {body.maxSize && <DrawerItem name="Body Max Size">{body.maxSize}</DrawerItem>}
          {body.timeout?.read && <DrawerItem name="Body Read Timeout">{body.timeout.read}</DrawerItem>}
          {body.timeout?.send && <DrawerItem name="Body Send Timeout">{body.timeout.send}</DrawerItem>}
        </>
      )}

      {keepAlive && (
        <>
          {keepAlive.requests !== undefined && <DrawerItem name="Keep-Alive Requests">{keepAlive.requests}</DrawerItem>}
          {keepAlive.time && <DrawerItem name="Keep-Alive Time">{keepAlive.time}</DrawerItem>}
          {keepAlive.timeout?.header && (
            <DrawerItem name="Keep-Alive Header Timeout">{keepAlive.timeout.header}</DrawerItem>
          )}
          {keepAlive.timeout?.server && (
            <DrawerItem name="Keep-Alive Server Timeout">{keepAlive.timeout.server}</DrawerItem>
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
