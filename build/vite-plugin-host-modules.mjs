/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { createRequire } from "node:module";
import { join } from "node:path";

const hostGlobal = "globalThis.FreelensExtensionApi";

/** The module ids each process publishes (C3). Main has no window, so it publishes mobx only. */
const publishedModuleIds = {
  renderer: ["react", "react-dom", "react/jsx-runtime", "mobx", "mobx-react", "monaco-editor"],
  main: ["mobx"],
};

const allModuleIds = new Set(Object.values(publishedModuleIds).flat());
const hostPackages = new Set([...allModuleIds].map(packageName));

/**
 * The global name of a module id (C3): strip the scope, split on `-`, `/` and `.`, upper-case each segment.
 *
 * @param {string} moduleId
 */
function globalName(moduleId) {
  return moduleId
    .replace(/^@[^/]+\//, "")
    .split(/[-/.]/)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");
}

/** @param {string} moduleId */
function packageName(moduleId) {
  const segments = moduleId.split("/");
  return moduleId.startsWith("@") ? segments.slice(0, 2).join("/") : segments[0];
}

const identifier = /^[A-Za-z_$][\w$]*$/;

/** CommonJS interop members, not exports of the library. */
const skippedNames = new Set(["__esModule", "default"]);

/**
 * The names to export: the members of the installed copy that are identifiers.
 *
 * @param {NodeJS.Require} require
 * @param {string} moduleId
 */
function exportNames(require, moduleId) {
  let library;
  try {
    library = require(moduleId);
  } catch (error) {
    throw new Error(
      `cannot load the installed "${moduleId}" to read its exports; the host provides it, so it must be a devDependency at the version the host runs`,
      { cause: error },
    );
  }
  return Object.keys(library).filter((name) => identifier.test(name) && !skippedNames.has(name));
}

/**
 * @param {"renderer" | "main"} processName the process the bundle is for
 * @returns {import("vite").Plugin}
 */
export function hostModules(processName) {
  const published = new Set(publishedModuleIds[processName]);
  const virtualPrefix = "\0freelens-host:";
  /** @type {NodeJS.Require} */
  let require;

  return {
    name: "freelens:host-modules",
    enforce: "pre",

    configResolved(config) {
      require = createRequire(join(config.root, "package.json"));
    },

    resolveId(source) {
      if (published.has(source)) {
        return { id: `${virtualPrefix}${source}`, moduleSideEffects: false };
      }
      if (allModuleIds.has(source)) {
        this.error(
          `"${source}" is imported in the ${processName} bundle, but the host publishes it in the renderer only`,
        );
      }
      if (hostPackages.has(packageName(source))) {
        this.error(
          `"${source}" is not published by the host, and bundling it would bring in a second copy of "${packageName(source)}"`,
        );
      }
      return null;
    },

    load(id) {
      if (!id.startsWith(virtualPrefix)) {
        return null;
      }
      const moduleId = id.slice(virtualPrefix.length);
      const names = exportNames(require, moduleId);
      return [
        `const hostModule = ${hostGlobal}.${globalName(moduleId)};`,
        "export default hostModule;",
        ...names.map((name) => `export const ${name} = /* @__PURE__ */ Reflect.get(hostModule, "${name}");`),
        "",
      ].join("\n");
    },
  };
}

