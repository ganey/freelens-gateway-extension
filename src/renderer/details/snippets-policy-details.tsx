import { Renderer } from "@freelensapp/extensions";
import { observer } from "mobx-react";
import type { SnippetsPolicy } from "../k8s/snippets-policy/snippets-policy";

export const SnippetsPolicyDetails = observer((props: any) => {
  const { Component } = Renderer;

  if (!Component) {
    return <div>Renderer.Component is not available</div>;
  }

  const { DrawerItem } = Component;
  const object: SnippetsPolicy = props.object;

  if (!object) return null;

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

      <DrawerItem name="Snippets">
        {object.getSnippets().length === 0 ? (
          "None"
        ) : (
          <ul style={{ margin: 0, paddingLeft: "1.5em" }}>
            {object.getSnippets().map((snippet, i) => (
              <li key={i}>
                <strong>{snippet.context}</strong>
                <pre style={{ margin: "4px 0", fontSize: "0.9em", whiteSpace: "pre-wrap" }}>{snippet.value}</pre>
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
