import type { RegistryItem } from "@lexsys/registry"
import { beforeEach, describe, expect, test, vi } from "vitest"

const mocks = vi.hoisted(() => {
  return {
    fetchRemoteRegistry: vi.fn(),
    getRegistryProviderResult: vi.fn(),
    getRegistrySource: vi.fn(),
  }
})

vi.mock("../../src/registry/provider.js", () => {
  return {
    getRegistryProviderResult: mocks.getRegistryProviderResult,
  }
})

vi.mock("../../src/registry/source.js", () => {
  return {
    getRegistrySource: mocks.getRegistrySource,
  }
})

vi.mock("../../src/registry/remote.js", () => {
  return {
    fetchRemoteRegistry: mocks.fetchRemoteRegistry,
  }
})

const item: RegistryItem = {
  name: "button",
  canonicalName: "Button",
  version: "0.0.1",
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

describe("runRegistry", () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.spyOn(console, "log").mockImplementation(() => undefined)
  })

  test("bypasses provider and remote resolution for local source output", async () => {
    const { runRegistry } = await import("../../src/commands/registry.js")

    await runRegistry({ local: true, source: true })

    expect(console.log).toHaveBeenCalledWith("local")
    expect(mocks.getRegistryProviderResult).not.toHaveBeenCalled()
    expect(mocks.getRegistrySource).not.toHaveBeenCalled()
    expect(mocks.fetchRemoteRegistry).not.toHaveBeenCalled()
  })

  test("reports missing remote config without provider fallback", async () => {
    mocks.getRegistrySource.mockResolvedValue("local")
    const { runRegistry } = await import("../../src/commands/registry.js")

    await runRegistry({ remote: true })

    expect(console.log).toHaveBeenCalledWith(
      "No remote registry URL configured.",
    )
    expect(mocks.getRegistryProviderResult).not.toHaveBeenCalled()
    expect(mocks.fetchRemoteRegistry).not.toHaveBeenCalled()
  })

  test("fetches remote registry without provider fallback", async () => {
    mocks.getRegistrySource.mockResolvedValue(
      "https://example.test/registry.json",
    )
    mocks.fetchRemoteRegistry.mockResolvedValue({
      version: "2.0.0",
      items: [item],
    })
    const { runRegistry } = await import("../../src/commands/registry.js")

    await runRegistry({ remote: true, summary: true })

    expect(mocks.fetchRemoteRegistry).toHaveBeenCalledWith(
      "https://example.test/registry.json",
    )
    expect(mocks.getRegistryProviderResult).not.toHaveBeenCalled()
    expect(console.log).toHaveBeenCalledWith(
      "Registry source: https://example.test/registry.json",
    )
    expect(console.log).toHaveBeenCalledWith("Fallback used: no")
  })

  test("includes source and fallback metadata in default json output", async () => {
    mocks.getRegistryProviderResult.mockResolvedValue({
      items: [item],
      source: "https://example.test/registry.json",
      fallbackUsed: true,
      manifestVersion: "0.0.1",
    })
    const { runRegistry } = await import("../../src/commands/registry.js")

    await runRegistry()

    expect(console.log).toHaveBeenCalledWith(
      JSON.stringify(
        {
          version: "0.0.1",
          source: "https://example.test/registry.json",
          fallbackUsed: true,
          items: [item],
        },
        null,
        2,
      ),
    )
  })
})
