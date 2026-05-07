/// <reference types="node" />
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, test } from "vitest"

const componentRoot = join(process.cwd(), "src/components")
const publicEntry = readFileSync(join(process.cwd(), "src/index.ts"), "utf-8")

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
})
