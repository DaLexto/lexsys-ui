import { describe, expect, test } from "vitest"
import {
  buttonRegistryItem,
  sidebarRegistryItem,
} from "@dalexto/lexsys-registry"
import type { LexsysConfig } from "../../src/config/config.js"
import {
  prepareInstalledFileContent,
  rewriteCrossLayerImports,
} from "../../src/install/import-rewriter.js"
import { resolveItemInstallTarget } from "../../src/install/target.js"

const config: LexsysConfig = {
  style: "default",
  paths: {
    components: "src/components/ui",
    utilities: "src/lib",
    styles: "styles",
  },
  aliases: {
    components: "@/components/ui",
    ui: "@/components/ui",
    utils: "@/lib/utils",
    lib: "@/lib",
    hooks: "@/hooks",
  },
  tailwind: {
    version: "v4",
    css: "src/style.css",
  },
  installed: [] as string[],
  registryUrl: null,
}

describe("resolveItemInstallTarget", () => {
  test("installs primitives and blocks under paths.components", () => {
    expect(resolveItemInstallTarget(config, buttonRegistryItem)).toBe(
      "src/components/ui/Button",
    )
    expect(resolveItemInstallTarget(config, sidebarRegistryItem)).toBe(
      "src/components/ui/Sidebar",
    )
  })
})

describe("rewriteCrossLayerImports", () => {
  test("rewrites layered registry imports to sibling ui imports", () => {
    const content = [
      'import { Button } from "../../primitives/Button/Button"',
      'import { Sidebar } from "../../blocks/Sidebar/Sidebar"',
      'import { DashboardShell } from "../../templates/DashboardShell/DashboardShell"',
    ].join("\n")

    expect(rewriteCrossLayerImports(content)).toBe(
      [
        'import { Button } from "../Button/Button"',
        'import { Sidebar } from "../Sidebar/Sidebar"',
        'import { DashboardShell } from "../DashboardShell/DashboardShell"',
      ].join("\n"),
    )
  })

  test("rewrites @/components registry template imports to sibling ui imports", () => {
    const content = [
      'import { Button } from "@/components/primitives/Button"',
      'import { Card } from "@/components/primitives/Card/Card"',
      'import { Sidebar } from "@/components/blocks/Sidebar"',
    ].join("\n")

    expect(rewriteCrossLayerImports(content)).toBe(
      [
        'import { Button } from "../Button/Button"',
        'import { Card } from "../Card/Card"',
        'import { Sidebar } from "../Sidebar/Sidebar"',
      ].join("\n"),
    )
  })

  test("preserves primitive type module paths from registry templates", () => {
    const content = [
      'import type { BadgeProps } from "@/components/primitives/Badge/Badge.types"',
      'import type { CollapsibleProps } from "@/components/primitives/Collapsible/Collapsible.types"',
    ].join("\n")

    expect(rewriteCrossLayerImports(content)).toBe(
      [
        'import type { BadgeProps } from "../Badge/Badge.types"',
        'import type { CollapsibleProps } from "../Collapsible/Collapsible.types"',
      ].join("\n"),
    )
  })
})

describe("prepareInstalledFileContent", () => {
  test("leaves primitive files unchanged", () => {
    const content = `export const Button = () => null`

    expect(prepareInstalledFileContent(content, buttonRegistryItem)).toBe(
      content,
    )
  })

  test("rewrites block files on install", () => {
    const content = `import { Button } from "../../primitives/Button/Button"`

    expect(prepareInstalledFileContent(content, sidebarRegistryItem)).toBe(
      `import { Button } from "../Button/Button"`,
    )
  })

  test("rewrites block files that use @/components registry template imports", () => {
    const content = `import { Button } from "@/components/primitives/Button"`

    expect(prepareInstalledFileContent(content, sidebarRegistryItem)).toBe(
      `import { Button } from "../Button/Button"`,
    )
  })
})
