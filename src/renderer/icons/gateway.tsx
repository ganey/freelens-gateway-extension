import gatewaySvg from "./gateway.svg?raw";

export function GatewayIcon() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: gatewaySvg }}
      style={{ width: "24px", height: "24px", display: "inline-block" }}
    />
  );
}
