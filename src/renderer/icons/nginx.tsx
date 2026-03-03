import nginxSvg from "./nginx.svg?raw";

export function NginxIcon() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: nginxSvg }}
      style={{ width: "24px", height: "24px", display: "inline-block" }}
    />
  );
}
