import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "scripts/write-style-outputs": "scripts/write-style-outputs.ts",
    "scripts/governance-report": "scripts/governance-report.ts",
  },

  format: ["esm"],
  dts: false,
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
