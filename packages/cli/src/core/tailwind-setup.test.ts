import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { afterEach, beforeEach, describe, expect, test } from "vitest"
import type { NeurexConfig } from "./config.js"
import { setCwd } from "./context.js"
import {
  ensureTailwindCssImport,
  ensureViteTailwindPlugin,
} from "./tailwind-setup.js"

const config: NeurexConfig = {
  componentsPath: "components/ui",
  installed: {},
  registryUrl: null,
  stylesPath: "styles/neurex",
  tailwind: {
    version: "v4",
    css: "src/style.css",
  },
  utilitiesPath: "lib/neurex",
}

describe("tailwind setup", () => {
  let tempDir: string

  beforeEach(async () => {
    const testRoot = join(process.cwd(), ".tmp")
    await mkdir(testRoot, { recursive: true })
    tempDir = await mkdtemp(join(testRoot, "neurex-cli-tailwind-"))
    setCwd(tempDir)
  })

  afterEach(async () => {
    if (tempDir) {
      await rm(tempDir, { force: true, recursive: true })
    }
  })

  test("adds Tailwind import to the configured CSS entrypoint once", async () => {
    const cssPath = join(tempDir, "src/style.css")

    await mkdir(join(tempDir, "src"), { recursive: true })
    await writeFile(cssPath, ":root {}\n", "utf-8")

    await ensureTailwindCssImport(config)
    await ensureTailwindCssImport(config)

    await expect(readFile(cssPath, "utf-8")).resolves.toBe(
      '@import "tailwindcss";\n:root {}\n',
    )
  })

  test("adds the Tailwind Vite plugin to an existing Vite config once", async () => {
    const viteConfigPath = join(tempDir, "vite.config.ts")

    await writeFile(
      viteConfigPath,
      'import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\n\nexport default defineConfig({\n  plugins: [react()],\n});\n',
      "utf-8",
    )

    await ensureViteTailwindPlugin()
    await ensureViteTailwindPlugin()

    await expect(readFile(viteConfigPath, "utf-8")).resolves.toBe(
      'import { defineConfig } from "vite";\n' +
        'import react from "@vitejs/plugin-react";\n' +
        'import tailwindcss from "@tailwindcss/vite";\n' +
        "\n" +
        "export default defineConfig({\n" +
        "  plugins: [tailwindcss(), react()],\n" +
        "});\n",
    )
  })
})
