import type { RegistryItem } from "@dalexto/lexsys-registry"
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { setCwd } from "../../src/utils/context.js"
import { defaultConfig } from "../../src/config/config.js"
import { runConfig } from "../../src/commands/config.js"
import { runDoctor } from "../../src/commands/doctor.js"
import { runList } from "../../src/commands/list.js"
import { runStatus } from "../../src/commands/status.js"

const mocks = vi.hoisted(() => {
  return {
    getRegistryItems: vi.fn(),
    getRegistryProviderResult: vi.fn(),
  }
})

vi.mock("../../src/registry/provider.js", () => {
  return {
    getRegistryItems: mocks.getRegistryItems,
    getRegistryProviderResult: mocks.getRegistryProviderResult,
  }
})

const item: RegistryItem = {
  name: "button",
  canonicalName: "Button",
  type: "component",
  category: "actions",
  aliases: ["btn"],
  files: ["primitives/Button/Button.tsx"],
  dependencies: [],
  registryDependencies: [],
  utilities: [],
  styles: [],
  target: "src/components/ui/Button",
}

const consoleOutput = (): string => {
  return vi.mocked(console.log).mock.calls.flat().join("\n")
}

const writeJson = async (path: string, value: unknown): Promise<void> => {
  await writeFile(path, JSON.stringify(value, null, 2) + "\n", "utf-8")
}

describe("CLI diagnostic commands", () => {
  let tempDir: string

  beforeEach(async () => {
    vi.resetAllMocks()
    vi.spyOn(console, "log").mockImplementation(() => undefined)

    const testRoot = join(process.cwd(), ".tmp")
    await mkdir(testRoot, { recursive: true })
    tempDir = await mkdtemp(join(testRoot, "lexsys-cli-diagnostics-"))
    setCwd(tempDir)
  })

  afterEach(async () => {
    vi.restoreAllMocks()
    if (tempDir) {
      await rm(tempDir, { force: true, recursive: true })
    }
  })

  test("runDoctor reports project paths and registry summary", async () => {
    await writeJson(join(tempDir, "package.json"), { name: "demo" })
    await mkdir(join(tempDir, defaultConfig.paths.components), {
      recursive: true,
    })
    await mkdir(join(tempDir, defaultConfig.paths.utilities), {
      recursive: true,
    })
    await mkdir(join(tempDir, defaultConfig.paths.styles), { recursive: true })
    await writeFile(join(tempDir, defaultConfig.tailwind.css), ":root {}\n")

    mocks.getRegistryProviderResult.mockResolvedValue({
      items: [item],
      source: "local",
      fallbackUsed: false,
      manifestVersion: "0.0.1",
    })

    await runDoctor()

    expect(consoleOutput()).toContain("Lexsys doctor")
    expect(consoleOutput()).toContain("✓ package.json")
    expect(consoleOutput()).toContain("✓ source: local")
    expect(consoleOutput()).toContain("✓ items: 1")
  })

  test("runStatus reports no tracked components when config is empty", async () => {
    await runStatus()

    expect(consoleOutput()).toContain(
      "No Lexsys components are currently tracked.",
    )
  })

  test("runStatus reports installed component drift status", async () => {
    await writeJson(join(tempDir, "lexsys.config.json"), {
      ...defaultConfig,
      installed: ["button"],
    })
    await mkdir(join(tempDir, "src/components/ui/Button"), {
      recursive: true,
    })

    mocks.getRegistryProviderResult.mockResolvedValue({
      items: [item],
      source: "local",
      fallbackUsed: false,
      manifestVersion: "0.0.1",
    })
    mocks.getRegistryItems.mockResolvedValue([item])

    await runStatus()

    expect(consoleOutput()).toContain("Installed Lexsys components:")
    expect(consoleOutput()).toContain("- Button (out of sync with registry)")
  })

  test("runList prints registry items", async () => {
    mocks.getRegistryItems.mockResolvedValue([item])

    await runList()

    expect(consoleOutput()).toContain("Available Lexsys registry items:")
    expect(consoleOutput()).toContain("Primitives:")
    expect(consoleOutput()).toContain("- Button (actions)")
  })

  test("runList supports json output", async () => {
    mocks.getRegistryItems.mockResolvedValue([item])

    await runList({ json: true })

    expect(consoleOutput()).toContain('"canonicalName": "Button"')
  })

  test("runConfig prints config path", async () => {
    await runConfig({ path: true })

    expect(consoleOutput()).toContain("lexsys.config.json")
  })

  test("runConfig reports missing config file", async () => {
    await runConfig({ exists: true })

    expect(consoleOutput()).toContain("Config does not exist.")
  })

  test("runConfig sets and clears registry URL", async () => {
    await writeJson(join(tempDir, "lexsys.config.json"), defaultConfig)

    await runConfig({ setRegistryUrl: "https://example.test/registry.json" })
    expect(consoleOutput()).toContain(
      "Registry URL set to: https://example.test/registry.json",
    )

    await runConfig({ clearRegistryUrl: true })
    expect(consoleOutput()).toContain("Registry URL cleared.")
  })
})
