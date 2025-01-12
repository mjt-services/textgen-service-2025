import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    resolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    json(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          importHelpers: true,
        },
        include: ["src/**/*"],
        exclude: ["node_modules", "dist"]
      }
    })
  ]
};