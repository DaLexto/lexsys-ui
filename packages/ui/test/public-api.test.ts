/// <reference types="node" />
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, test } from "vitest"

const layerRoots = [
  join(process.cwd(), "src/components/primitives"),
  join(process.cwd(), "src/components/blocks"),
  join(process.cwd(), "src/components/templates"),
] as const

const publicEntry = readFileSync(join(process.cwd(), "src/index.ts"), "utf-8")

const getLayerEntries = (): Array<{ layer: string; name: string }> => {
  return layerRoots.flatMap((layerRoot) => {
    const layer = layerRoot.split(/[\\/]/u).at(-1) ?? "components"

    return readdirSync(layerRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => ({
        layer,
        name: entry.name,
      }))
  })
}

const getComponentExports = (
  layer: string,
  componentName: string,
): string[] => {
  const componentEntry = readFileSync(
    join(
      process.cwd(),
      "src/components",
      layer,
      componentName,
      `${componentName}.tsx`,
    ),
    "utf-8",
  )
  const exportBlock = componentEntry.match(/export\s*\{(?<exports>[^}]+)\}/)

  return (
    exportBlock?.groups?.exports
      .split(",")
      .map((exportName) => exportName.trim())
      .filter(Boolean) ?? []
  )
}

const isNonComponentExport = (exportName: string): boolean => {
  return exportName.startsWith("use") || exportName.startsWith("create")
}

const layerEntries = getLayerEntries()

describe("@lexsys/ui public API", () => {
  test("keeps every component in the standard three-file shape", () => {
    for (const { layer, name: componentName } of layerEntries) {
      const componentPath = join(
        process.cwd(),
        "src/components",
        layer,
        componentName,
      )

      expect(existsSync(join(componentPath, `${componentName}.tsx`))).toBe(true)
      expect(existsSync(join(componentPath, `${componentName}.types.ts`))).toBe(
        true,
      )
      expect(
        existsSync(join(componentPath, `${componentName}.variants.ts`)),
      ).toBe(true)
    }
  })

  test("exports every primitive implementation from the package root", () => {
    for (const { layer, name: componentName } of layerEntries) {
      if (layer !== "primitives") {
        continue
      }

      expect(publicEntry).toContain(
        `export * from "./components/${layer}/${componentName}/${componentName}"`,
      )
    }
  })

  test("exports every primitive prop type module from the package root", () => {
    for (const { layer, name: componentName } of layerEntries) {
      if (layer !== "primitives") {
        continue
      }

      expect(publicEntry).toContain(
        `export type * from "./components/${layer}/${componentName}/${componentName}.types"`,
      )
    }
  })

  test("keeps a named props type for every exported component", () => {
    for (const { layer, name: componentName } of layerEntries) {
      const typeEntry = readFileSync(
        join(
          process.cwd(),
          "src/components",
          layer,
          componentName,
          `${componentName}.types.ts`,
        ),
        "utf-8",
      )

      for (const exportName of getComponentExports(layer, componentName)) {
        if (isNonComponentExport(exportName)) {
          continue
        }

        expect(typeEntry).toMatch(
          new RegExp(`export (interface|type) ${exportName}Props\\b`),
        )
      }
    }
  })
})
