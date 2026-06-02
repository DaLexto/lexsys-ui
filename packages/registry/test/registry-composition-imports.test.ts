import { describe, expect, test } from "vitest"

import {
  extractRegistryCompositionImports,
  getRegistryDependenciesFromTemplateContents,
  toRegistryItemName,
} from "../src/registry-composition-imports.js"

describe("registry-composition-imports", () => {
  test("toRegistryItemName converts PascalCase folders", () => {
    expect(toRegistryItemName("DashboardShell")).toBe("dashboard-shell")
    expect(toRegistryItemName("FormField")).toBe("form-field")
  })

  test("extracts monorepo-relative primitive and block imports", () => {
    const source = `
      import { Button } from "../../primitives/Button/Button"
      import { Sidebar } from "../../blocks/Sidebar/Sidebar"
    `

    expect(extractRegistryCompositionImports(source)).toEqual([
      "button",
      "sidebar",
    ])
  })

  test("extracts consumer-style @/components imports", () => {
    const source = `
      import { Drawer } from "@/components/primitives/Drawer"
      import { Sidebar } from "@/components/blocks/Sidebar"
    `

    expect(extractRegistryCompositionImports(source)).toEqual([
      "drawer",
      "sidebar",
    ])
  })

  test("dedupes and sorts registry dependency names from template contents", () => {
    const contents = [
      'import { Button } from "../../primitives/Button/Button"',
      'import { Card } from "../../primitives/Card/Card"',
      'import { Button } from "../../primitives/Button/Button"',
    ]

    expect(getRegistryDependenciesFromTemplateContents(contents)).toEqual([
      "button",
      "card",
    ])
  })
})
