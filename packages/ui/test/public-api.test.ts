/// <reference types="node" />
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, test } from "vitest"

const componentRoot = join(process.cwd(), "src/components")
const publicEntry = readFileSync(join(process.cwd(), "src/index.ts"), "utf-8")

const getComponentExports = (componentName: string): string[] => {
  const componentEntry = readFileSync(
    join(componentRoot, componentName, `${componentName}.tsx`),
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

const componentNames = readdirSync(componentRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .toSorted()

describe("@neurex/ui public API", () => {
  test("keeps every component in the standard three-file shape", () => {
    for (const componentName of componentNames) {
      const componentPath = join(componentRoot, componentName)

      expect(existsSync(join(componentPath, `${componentName}.tsx`))).toBe(true)
      expect(existsSync(join(componentPath, `${componentName}.types.ts`))).toBe(
        true,
      )
      expect(
        existsSync(join(componentPath, `${componentName}.variants.ts`)),
      ).toBe(true)
    }
  })

  test("exports every component implementation from the package root", () => {
    for (const componentName of componentNames) {
      expect(publicEntry).toContain(
        `export * from "./components/${componentName}/${componentName}"`,
      )
    }
  })

  test("exports every component prop type module from the package root", () => {
    for (const componentName of componentNames) {
      expect(publicEntry).toContain(
        `export type * from "./components/${componentName}/${componentName}.types"`,
      )
    }
  })

  test("keeps a named props type for every exported component", () => {
    for (const componentName of componentNames) {
      const typeEntry = readFileSync(
        join(componentRoot, componentName, `${componentName}.types.ts`),
        "utf-8",
      )

      for (const exportName of getComponentExports(componentName)) {
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
