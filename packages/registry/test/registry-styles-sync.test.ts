import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { afterEach, describe, expect, it } from "vitest"
import { findOutOfSyncStyleFiles } from "../scripts/lib/registry-styles-sync.mjs"

describe("registry style sync helpers", () => {
  let tempDir: string

  afterEach(async () => {
    if (tempDir) {
      await rm(tempDir, { force: true, recursive: true })
    }
  })

  const createTempRegistryDir = async (): Promise<string> => {
    const testRoot = join(process.cwd(), ".tmp")
    await mkdir(testRoot, { recursive: true })
    return mkdtemp(join(testRoot, "registry-styles-sync-"))
  }

  it("reports no drift when registry templates match generated outputs", async () => {
    tempDir = await createTempRegistryDir()
    const outputs = {
      tokensCss: ":root {\n  --nx-token: true;\n}\n",
      themeCss: "@theme inline {\n  --nx-theme: true;\n}\n",
    }

    await writeFile(join(tempDir, "tokens.css"), outputs.tokensCss, "utf-8")
    await writeFile(join(tempDir, "theme.css"), outputs.themeCss, "utf-8")

    const result = await findOutOfSyncStyleFiles({
      outputs,
      registryStylesRoot: tempDir,
    })

    expect(result.outOfSyncFiles).toEqual([])
    expect(result.checkedCount).toBe(2)
  })

  it("reports stale registry templates when content differs", async () => {
    tempDir = await createTempRegistryDir()
    const outputs = {
      tokensCss: ":root {\n  --nx-token: true;\n}\n",
      themeCss: "@theme inline {\n  --nx-theme: true;\n}\n",
    }

    await writeFile(join(tempDir, "tokens.css"), ":root {}\n", "utf-8")
    await writeFile(join(tempDir, "theme.css"), outputs.themeCss, "utf-8")

    const result = await findOutOfSyncStyleFiles({
      outputs,
      registryStylesRoot: tempDir,
    })

    expect(result.outOfSyncFiles).toEqual(["tokens.css"])
  })

  it("reports missing registry template files", async () => {
    tempDir = await createTempRegistryDir()

    const result = await findOutOfSyncStyleFiles({
      outputs: {
        tokensCss: ":root {}\n",
        themeCss: "@theme inline {}\n",
      },
      registryStylesRoot: tempDir,
    })

    expect(result.outOfSyncFiles).toEqual([
      "tokens.css (missing registry template file)",
      "theme.css (missing registry template file)",
    ])
  })
})
