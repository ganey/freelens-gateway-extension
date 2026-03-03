import { Main } from "@freelensapp/extensions";

export default class GatewayExtensionMain extends Main.LensExtension {
  async onActivate() {
    console.log("Gateway extension activated");
  }

  async onDeactivate() {
    console.log("Gateway extension deactivated");
  }
}
