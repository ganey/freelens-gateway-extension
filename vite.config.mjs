/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { builtinModules, isBuiltin } from "node:module";
import react from "@vitejs/plugin-react";
import { defaultServerConditions, defaultServerMainFields, defineConfig } from "vite";
import { hostModules } from "./build/vite-plugin-host-modules.mjs";
import { standardDecorators } from "./build/vite-plugin-standard-decorators.mjs";

const entryPoints = {
  renderer: {
    entry: "src/renderer/index.tsx",
    emptyOutDir: true,
    external: [],
  },
  main: {
    entry: "src/main/index.ts",
    emptyOutDir: false,
    external: ["electron", /^electron\//, /^node:/, ...builtinModules],
  },
};

/**
 * @type {import("vite").Plugin}
 */
const noNodeInRenderer = {
  name: "no-node-in-renderer",
  enforce: "pre",
  resolveId(source, importer) {
    if (isBuiltin(source) || source === "electron" || source.startsWith("electron/")) {
      this.error(`"${source}" is imported by ${importer}, but renderer code gets no Node or Electron`);
    }
    return null;
  },
};

export default defineConfig(({ mode }) => {
  const name = mode === "main" ? "main" : "renderer";
  const entryPoint = entryPoints[name];

  return {
    plugins: [standardDecorators(), hostModules(name), react(), ...(name === "renderer" ? [noNodeInRenderer] : [])],
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
      },
    },
    ...(name === "renderer"
      ? {
          define: { "process.env.NODE_ENV": JSON.stringify("production") },
        }
      : {
          resolve: { conditions: [...defaultServerConditions], mainFields: [...defaultServerMainFields] },
          define: { __dirname: "import.meta.dirname", __filename: "import.meta.filename" },
        }),
    build: {
      target: "esnext",
      minify: false,
      sourcemap: true,
      emptyOutDir: entryPoint.emptyOutDir,
      lib: {
        entry: entryPoint.entry,
        formats: ["es"],
        fileName: () => `${name}.js`,
        cssFileName: name,
      },
      rollupOptions: {
        external: entryPoint.external,
        output: {
          entryFileNames: `${name}.js`,
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
        },
      },
    },
  };
});
