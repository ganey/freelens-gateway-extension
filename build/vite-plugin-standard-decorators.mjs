/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { transform } from "esbuild";

const typeScriptModule = /\.[cm]?tsx?$/;
const decoratorAtLineStart = /^\s*@[A-Za-z_$]/m;

/** @returns {import("vite").Plugin} */
export function standardDecorators() {
  return {
    name: "freelens:standard-decorators",
    enforce: "pre",
    async transform(code, id) {
      const path = id.split("?", 1)[0];

      if (!typeScriptModule.test(path) || path.includes("/node_modules/") || !decoratorAtLineStart.test(code)) {
        return null;
      }

      const result = await transform(code, {
        loader: path.endsWith("x") ? "tsx" : "ts",
        jsx: "preserve",
        target: "esnext",
        supported: { decorators: false },
        sourcefile: path,
        sourcemap: "external",
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: false,
            useDefineForClassFields: true,
            verbatimModuleSyntax: false,
          },
        },
      });

      return { code: result.code, map: result.map };
    },
  };
}

