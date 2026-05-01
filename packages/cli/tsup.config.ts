import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],

  format: ["esm"],
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  minify: false,

  treeshake: true,
  shims: true,
  external: ["react", "react-dom"],
  outDir: "dist",
  target: "node20",
  injectStyle: false,
})
