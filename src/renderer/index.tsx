import { Renderer } from "@freelensapp/extensions";

import { ClientSettingsPolicyDetails } from "./details/client-settings-policy-details";
import { GatewayDetails } from "./details/gateway-details";
import { HTTPRouteDetails } from "./details/httproute-details";
import { NginxGatewayDetails } from "./details/nginx-gateway-details";
import { NginxProxyDetails } from "./details/nginx-proxy-details";
import { SnippetsFilterDetails } from "./details/snippets-filter-details";
import { SnippetsPolicyDetails } from "./details/snippets-policy-details";
import { UpstreamSettingsPolicyDetails } from "./details/upstream-settings-policy-details";

import { GatewayIcon, NginxIcon } from "./icons";

import { ClientSettingsPolicy } from "./k8s/client-settings-policy/client-settings-policy";
import { Gateway } from "./k8s/gateway/gateway";
import { HTTPRoute } from "./k8s/httproute/httproute";
import { NginxGateway } from "./k8s/nginx-gateway/nginx-gateway";
import { NginxProxy } from "./k8s/nginx-proxy/nginx-proxy";
import { SnippetsFilter } from "./k8s/snippets-filter/snippets-filter";
import { SnippetsPolicy } from "./k8s/snippets-policy/snippets-policy";
import { UpstreamSettingsPolicy } from "./k8s/upstream-settings-policy/upstream-settings-policy";

import { ClientSettingsPolicyPage } from "./pages/client-settings-policy-page";
import { GatewayPage } from "./pages/gateway-page";
import { HTTPRoutePage } from "./pages/httproute-page";
import { NginxGatewayPage } from "./pages/nginx-gateway-page";
import { NginxProxyPage } from "./pages/nginx-proxy-page";
import { SnippetsFilterPage } from "./pages/snippets-filter-page";
import { SnippetsPolicyPage } from "./pages/snippets-policy-page";
import { UpstreamSettingsPolicyPage } from "./pages/upstream-settings-policy-page";

export default class GatewayExtensionRenderer extends Renderer.LensExtension {
  clusterPages = [
    {
      id: "gateway",
      components: {
        Page: () => <GatewayPage />,
      },
    },
    {
      id: "httproute",
      components: {
        Page: () => <HTTPRoutePage />,
      },
    },
    {
      id: "client-settings-policy",
      components: {
        Page: () => <ClientSettingsPolicyPage />,
      },
    },
    {
      id: "nginx-gateway",
      components: {
        Page: () => <NginxGatewayPage />,
      },
    },
    {
      id: "nginx-proxy",
      components: {
        Page: () => <NginxProxyPage />,
      },
    },
    {
      id: "snippets-filter",
      components: {
        Page: () => <SnippetsFilterPage />,
      },
    },
    {
      id: "snippets-policy",
      components: {
        Page: () => <SnippetsPolicyPage />,
      },
    },
    {
      id: "upstream-settings-policy",
      components: {
        Page: () => <UpstreamSettingsPolicyPage />,
      },
    },
  ];

  clusterPageMenus = [
    // Gateway API parent menu
    {
      id: "gateway-api-menu",
      title: "Gateway API",
      components: {
        Icon: () => <GatewayIcon />,
      },
    },
    {
      id: "gateway-menu",
      parentId: "gateway-api-menu",
      title: "Gateways",
      target: { pageId: "gateway" },
      components: {
        Icon: () => <GatewayIcon />,
      },
    },
    {
      id: "httproute-menu",
      parentId: "gateway-api-menu",
      title: "HTTP Routes",
      target: { pageId: "httproute" },
      components: {
        Icon: () => <GatewayIcon />,
      },
    },

    // NGINX Gateway parent menu
    {
      id: "nginx-gateway-menu",
      title: "NGINX Gateway",
      components: {
        Icon: () => <NginxIcon />,
      },
    },
    {
      id: "client-settings-policy-menu",
      parentId: "nginx-gateway-menu",
      title: "Client Settings Policies",
      target: { pageId: "client-settings-policy" },
      components: {
        Icon: () => <NginxIcon />,
      },
    },
    {
      id: "nginx-gateways-menu",
      parentId: "nginx-gateway-menu",
      title: "NGINX Gateways",
      target: { pageId: "nginx-gateway" },
      components: {
        Icon: () => <NginxIcon />,
      },
    },
    {
      id: "nginx-proxies-menu",
      parentId: "nginx-gateway-menu",
      title: "NGINX Proxies",
      target: { pageId: "nginx-proxy" },
      components: {
        Icon: () => <NginxIcon />,
      },
    },
    {
      id: "snippets-filters-menu",
      parentId: "nginx-gateway-menu",
      title: "Snippets Filters",
      target: { pageId: "snippets-filter" },
      components: {
        Icon: () => <NginxIcon />,
      },
    },
    {
      id: "snippets-policies-menu",
      parentId: "nginx-gateway-menu",
      title: "Snippets Policies",
      target: { pageId: "snippets-policy" },
      components: {
        Icon: () => <NginxIcon />,
      },
    },
    {
      id: "upstream-settings-policies-menu",
      parentId: "nginx-gateway-menu",
      title: "Upstream Settings Policies",
      target: { pageId: "upstream-settings-policy" },
      components: {
        Icon: () => <NginxIcon />,
      },
    },
  ];

  kubeObjectDetailItems = [
    {
      kind: Gateway.kind,
      apiVersions: Gateway.crd.apiVersions,
      components: {
        Details: (props: any) => <GatewayDetails {...props} />,
      },
    },
    {
      kind: HTTPRoute.kind,
      apiVersions: HTTPRoute.crd.apiVersions,
      components: {
        Details: (props: any) => <HTTPRouteDetails {...props} />,
      },
    },
    {
      kind: ClientSettingsPolicy.kind,
      apiVersions: ClientSettingsPolicy.crd.apiVersions,
      components: {
        Details: (props: any) => <ClientSettingsPolicyDetails {...props} />,
      },
    },
    {
      kind: NginxGateway.kind,
      apiVersions: NginxGateway.crd.apiVersions,
      components: {
        Details: (props: any) => <NginxGatewayDetails {...props} />,
      },
    },
    {
      kind: NginxProxy.kind,
      apiVersions: NginxProxy.crd.apiVersions,
      components: {
        Details: (props: any) => <NginxProxyDetails {...props} />,
      },
    },
    {
      kind: SnippetsFilter.kind,
      apiVersions: SnippetsFilter.crd.apiVersions,
      components: {
        Details: (props: any) => <SnippetsFilterDetails {...props} />,
      },
    },
    {
      kind: SnippetsPolicy.kind,
      apiVersions: SnippetsPolicy.crd.apiVersions,
      components: {
        Details: (props: any) => <SnippetsPolicyDetails {...props} />,
      },
    },
    {
      kind: UpstreamSettingsPolicy.kind,
      apiVersions: UpstreamSettingsPolicy.crd.apiVersions,
      components: {
        Details: (props: any) => <UpstreamSettingsPolicyDetails {...props} />,
      },
    },
  ];
}
