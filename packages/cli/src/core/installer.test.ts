import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { afterEach, beforeEach, describe, expect, test } from "vitest"
import { buttonRegistryItem, themeRegistryStyle } from "@neurex/registry"
import type { NeurexConfig } from "./config.js"
import { setCwd } from "./context.js"
import {
  getRegistryTemplatePath,
  installItemFiles,
  installStyles,
} from "./installer.js"

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

describe("installItemFiles", () => {
  let tempDir: string

  beforeEach(async () => {
    const testRoot = join(process.cwd(), ".tmp")
    await mkdir(testRoot, { recursive: true })
    tempDir = await mkdtemp(join(testRoot, "neurex-cli-installer-"))
    setCwd(tempDir)
  })

  afterEach(async () => {
    if (tempDir) {
      await rm(tempDir, { force: true, recursive: true })
    }
  })

  test("reports conflicts without overwriting user-modified files", async () => {
    const targetDir = join(tempDir, "components/ui/Button")
    const targetPath = join(targetDir, "Button.tsx")

    await mkdir(targetDir, { recursive: true })
    await writeFile(targetPath, "user modified", "utf-8")

    const result = await installItemFiles(buttonRegistryItem, config)

    await expect(readFile(targetPath, "utf-8")).resolves.toBe("user modified")
    expect(result.conflicted).toContain(targetPath)
    expect(result.created).toHaveLength(2)
  })

  test("resolves registry templates through package exports", async () => {
    const templatePath = getRegistryTemplatePath("components/Button/Button.tsx")

    await expect(readFile(templatePath, "utf-8")).resolves.toContain(
      "export const Button",
    )
  })

  test("installs registry styles without overwriting conflicts", async () => {
    const targetDir = join(tempDir, "styles/neurex")
    const targetPath = join(targetDir, "theme.css")

    await mkdir(targetDir, { recursive: true })
    await writeFile(targetPath, "user theme", "utf-8")

    const result = await installStyles([themeRegistryStyle], config)

    await expect(readFile(targetPath, "utf-8")).resolves.toBe("user theme")
    expect(result.created).toHaveLength(1)
    expect(result.created[0]).toContain("tokens.css")
    expect(result.conflicted).toEqual([targetPath])
  })

  test("wires installed styles into the configured Tailwind CSS entrypoint", async () => {
    const cssPath = join(tempDir, "src/style.css")

    await mkdir(join(tempDir, "src"), { recursive: true })
    await writeFile(cssPath, ":root {\n  color: black;\n}\n", "utf-8")

    await installStyles([themeRegistryStyle], config)
    await installStyles([themeRegistryStyle], config)

    await expect(readFile(cssPath, "utf-8")).resolves.toBe(
      '@import "../styles/neurex/tokens.css";\n' +
        '@import "../styles/neurex/theme.css";\n' +
        ":root {\n" +
        "  color: black;\n" +
        "}\n",
    )
  })
})
