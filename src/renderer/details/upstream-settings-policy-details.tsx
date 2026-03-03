import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import type { UpstreamSettingsPolicy } from "../k8s/upstream-settings-policy/upstream-settings-policy";

export const UpstreamSettingsPolicyDetails = observer((props: any) => {
  const { Component } = Renderer;

  if (!Component) {
    return <div>Renderer.Component is not available</div>;
  }

  const { DrawerItem } = Component;
  const object: UpstreamSettingsPolicy = props.object;

  if (!object) return null;

  const keepAlive = object.getKeepAlive();

  return (
    <>
      <DrawerItem name="Target Refs">
        {object.getTargetRefs().length === 0 ? (
          "None"
        ) : (
          <ul style={{ margin: 0, paddingLeft: "1.5em" }}>
            {object.getTargetRefs().map((ref, i) => (
              <li key={i}>
                {ref.kind}/{ref.name}
                {ref.namespace ? ` (${ref.namespace})` : ""}
              </li>
            ))}
          </ul>
        )}
      </DrawerItem>

      {object.getZoneSize() && <DrawerItem name="Zone Size">{object.getZoneSize()}</DrawerItem>}

      {keepAlive && (
        <>
          {keepAlive.connections !== undefined && (
            <DrawerItem name="Keep-Alive Connections">{keepAlive.connections}</DrawerItem>
          )}
          {keepAlive.requests !== undefined && <DrawerItem name="Keep-Alive Requests">{keepAlive.requests}</DrawerItem>}
          {keepAlive.time && <DrawerItem name="Keep-Alive Time">{keepAlive.time}</DrawerItem>}
          {keepAlive.timeout && <DrawerItem name="Keep-Alive Timeout">{keepAlive.timeout}</DrawerItem>}
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
