import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/generators/write-style-outputs.ts"],

  format: ["esm"],
  dts: true,
  splitting: true,
  sourcemap: false,
  clean: true,
  minify: false,

  treeshake: true,
  shims: true,
  external: ["react", "react-dom"],
  outDir: "dist",
  injectStyle: false,
})
