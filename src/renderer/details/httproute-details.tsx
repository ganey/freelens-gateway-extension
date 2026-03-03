import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import type { HTTPRoute } from "../k8s/httproute/httproute";

export const HTTPRouteDetails = observer((props: any) => {
  const { Component } = Renderer;

  if (!Component) {
    return <div>Renderer.Component is not available</div>;
  }

  const { DrawerItem } = Component;
  const object: HTTPRoute = props.object;

  if (!object) return null;

  return (
    <>
      <DrawerItem name="Hostnames">{object.getHostnameString()}</DrawerItem>

      <DrawerItem name="Parent Refs">
        {object.getParentRefs().length === 0 ? (
          "None"
        ) : (
          <ul style={{ margin: 0, paddingLeft: "1.5em" }}>
            {object.getParentRefs().map((ref, i) => (
              <li key={i}>
                {ref.kind ? `${ref.kind}/` : ""}
                {ref.name}
                {ref.namespace ? ` (${ref.namespace})` : ""}
                {ref.sectionName ? ` [${ref.sectionName}]` : ""}
              </li>
            ))}
          </ul>
        )}
      </DrawerItem>

      <DrawerItem name="Rules">
        {object.getRules().length === 0 ? (
          "None"
        ) : (
          <ul style={{ margin: 0, paddingLeft: "1.5em" }}>
            {object.getRules().map((rule, i) => {
              const matches = rule.matches?.length ?? 0;
              const backends = rule.backendRefs?.length ?? 0;
              const filters = rule.filters?.length ?? 0;
              return (
                <li key={i}>
                  Rule {i + 1}: {matches} match(es), {backends} backend(s)
                  {filters > 0 ? `, ${filters} filter(s)` : ""}
                </li>
              );
            })}
          </ul>
        )}
      </DrawerItem>
    </>
  );
});
