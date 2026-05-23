import type { RegistryItem } from "@neurex/registry"
import { describe, expect, test, vi } from "vitest"

import {
  parseRemoteRegistry,
  type RemoteRegistryManifest,
} from "../../src/core/remote-registry.js"

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

describe("parseRemoteRegistry", () => {
  test("accepts a manifest object with version and items", () => {
    const manifest: RemoteRegistryManifest = {
      version: "1.0.0",
      items: [item],
    }

    expect(parseRemoteRegistry(manifest)).toEqual(manifest)
  })

  test("accepts a legacy bare items array", () => {
    expect(parseRemoteRegistry([item])).toEqual({
      version: "unknown",
      items: [item],
    })
  })

  test("accepts optional styles array on manifest objects", () => {
    expect(
      parseRemoteRegistry({
        version: "1.0.0",
        items: [item],
        styles: [
          {
            name: "theme",
            version: "0.0.1",
            files: [{ path: "styles/theme.css", target: "styles/theme.css" }],
          },
        ],
      }),
    ).toEqual({
      version: "1.0.0",
      items: [item],
      styles: [
        {
          name: "theme",
          version: "0.0.1",
          files: [{ path: "styles/theme.css", target: "styles/theme.css" }],
        },
      ],
    })
  })

  test("rejects invalid manifest shapes with explicit errors", () => {
    expect(() => {
      return parseRemoteRegistry(null)
    }).toThrow("Remote registry must be a JSON array or manifest object.")

    expect(() => {
      return parseRemoteRegistry({ version: "1.0.0" })
    }).toThrow("Remote registry manifest must contain version and items.")

    expect(() => {
      return parseRemoteRegistry({
        version: "1.0.0",
        items: [{ ...item, canonicalName: 123 }],
      })
    }).toThrow("Remote registry contains invalid registry item at index 0.")
  })
})

describe("fetchRemoteRegistry", () => {
  test("throws when the remote registry responds with a non-OK status", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        json: async () => {
          return {}
        },
      }),
    )

    const { fetchRemoteRegistry } =
      await import("../../src/core/remote-registry.js")

    await expect(
      fetchRemoteRegistry("https://example.test/registry.json"),
    ).rejects.toThrow("Remote registry responded with HTTP 503")

    vi.unstubAllGlobals()
  })
})
