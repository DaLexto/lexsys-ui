/// <reference types="node" />
import { readFileSync, readdirSync, type Dirent } from "node:fs"
import { join, relative } from "node:path"
import { describe, expect, test } from "vitest"
import {
  registryItems,
  registryStyles,
  registryUtilities,
} from "../src/index.js"
import type {
  RegistryItem,
  RegistryStyle,
  RegistryUtility,
} from "../src/registry.types.js"
import { validateRegistry } from "../src/validate-registry.js"

/**
 * Pomoćna funkcija koja skenira templates folder.
 * Eksplicitno tipiziramo 'entry' kao 'Dirent' da izbegnemo TS grešku.
 */
const collectTemplateFiles = (root: string, current = root): string[] => {
  return readdirSync(current, { withFileTypes: true }).flatMap(
    (entry: Dirent) => {
      const path = join(current, entry.name)

      if (entry.isDirectory()) {
        return collectTemplateFiles(root, path)
      }

      return relative(root, path).replaceAll("\\", "/")
    },
  )
}

const templateRoot = join(process.cwd(), "templates")
const uiSourceRoot = join(process.cwd(), "../ui/src/components")
const componentSourceImport = 'import { cn } from "../../../utils/cn"'
const componentTemplateImport = 'import { cn } from "@/lib/utils"'
const mergeClassNameSourceImport =
  'import { mergeClassName } from "../../../utils/merge-class-name"'
const mergeClassNameTemplateImport =
  'import { mergeClassName } from "@/lib/utils"'

const readTemplateFile = (templatePath: string): string => {
  return readFileSync(join(templateRoot, templatePath), "utf-8")
}

const toRegistryTemplate = (source: string): string => {
  return source
    .replaceAll(componentSourceImport, componentTemplateImport)
    .replaceAll(mergeClassNameSourceImport, mergeClassNameTemplateImport)
    .replaceAll('from "../../../utils/cn"', 'from "@/lib/utils"')
    .replaceAll('from "../../../utils/variant-states"', 'from "@/lib/utils"')
}

// Mock podaci za testiranje
const item: RegistryItem = {
  name: "button",
  canonicalName: "Button",
  type: "component",
  category: "actions",
  aliases: ["btn"],
  files: ["primitives/Button/Button.tsx", "primitives/Button/Button.types.ts"],
  remoteFiles: [
    {
      path: "primitives/Button/Button.tsx",
    },
  ],
  dependencies: ["@base-ui/react"],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Button",
}

const style: RegistryStyle = {
  name: "theme",
  version: "0.0.1",
  files: [
    {
      path: "styles/tokens.css",
      target: "tokens.css",
    },
  ],
}

const utility: RegistryUtility = {
  name: "cn",
  path: "shared/utils/cn.ts",
  target: "utils.ts",
}

describe("validateRegistry", () => {
  test("accepts registry items that reference known styles and utilities", () => {
    expect(() =>
      validateRegistry([item], {
        styles: [style],
        utilities: [utility],
      }),
    ).not.toThrow()
  })

  test("accepts the bundled registry when every referenced template exists", () => {
    expect(() =>
      validateRegistry(registryItems, {
        styles: registryStyles,
        utilities: registryUtilities,
        templateFiles: collectTemplateFiles(templateRoot),
        readTemplateFile: readTemplateFile,
      }),
    ).not.toThrow()
  })

  test("declares complete install metadata for every bundled component", () => {
    const componentItems = registryItems.filter((registryItem) => {
      return registryItem.type === "component"
    })

    for (const item of componentItems) {
      const templateContent = item.files.map(readTemplateFile).join("\n")

      expect(item).toEqual(
        expect.objectContaining({
          dependencies: expect.arrayContaining([
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
          ]),
          styles: ["theme"],
          target: expect.stringMatching(/^src\/components\/ui\//),
          type: "component",
          utilities: ["cn"],
        }),
      )
      expect(item?.files).toHaveLength(3)
      expect(item?.remoteFiles).toHaveLength(3)
      expect(item?.target).toBe(`src/components/ui/${item.canonicalName}`)
      expect(item?.remoteFiles?.map((file) => file.path).sort()).toEqual(
        item.files.toSorted(),
      )

      if (templateContent.includes('"@base-ui/react"')) {
        expect(item.dependencies).toContain("@base-ui/react")
      }

      if (templateContent.includes('"lucide-react"')) {
        expect(item.dependencies).toContain("lucide-react")
      }
    }
  })

  test("keeps component templates in sync with ui source files", () => {
    const componentItems = registryItems.filter((registryItem) => {
      return registryItem.type === "component"
    })

    for (const item of componentItems) {
      for (const file of item.files) {
        const source = readFileSync(join(uiSourceRoot, file), "utf-8")

        expect(readTemplateFile(file)).toBe(toRegistryTemplate(source))
      }
    }
  })

  test("rejects duplicate lookup keys across names and aliases", () => {
    expect(() =>
      validateRegistry([
        item,
        {
          ...item,
          name: "input",
          canonicalName: "Input",
          aliases: ["button"],
          files: ["primitives/Input/Input.tsx"],
          target: "src/components/ui/Input",
        },
      ]),
    ).toThrow(/is used by both "button" and "input"/)
  })

  test("rejects missing style references", () => {
    expect(() =>
      validateRegistry([item], {
        styles: [],
      }),
    ).toThrow(/references missing style: theme/)
  })

  test("rejects missing utility references", () => {
    expect(() =>
      validateRegistry([item], {
        utilities: [],
      }),
    ).toThrow(/references missing utility: cn/)
  })

  test("rejects unsafe npm dependency names", () => {
    expect(() =>
      validateRegistry([
        {
          ...item,
          dependencies: ["clsx && bad-script"],
        },
      ]),
    ).toThrow(/has invalid npm dependency: clsx && bad-script/)
  })

  test("rejects aliases that duplicate the item name", () => {
    expect(() =>
      validateRegistry([
        {
          ...item,
          aliases: ["button"],
        },
      ]),
    ).toThrow(/has alias that duplicates its name/)
  })

  test("rejects remote files that are not declared in item files", () => {
    expect(() =>
      validateRegistry([
        {
          ...item,
          remoteFiles: [
            {
              path: "components/Button/NonExistent.tsx",
            },
          ],
        },
      ]),
    ).toThrow(/is not declared in the "files" array/)
  })

  test("rejects remote file URLs that are not HTTPS", () => {
    expect(() =>
      validateRegistry([
        {
          ...item,
          remoteFiles: [
            {
              path: "components/Button/Button.tsx",
              remoteUrl: "http://example.test/Button.tsx",
            },
          ],
        },
      ]),
    ).toThrow(/remote URL must use HTTPS/)
  })

  test("rejects style targets that are not safe paths", () => {
    expect(() =>
      validateRegistry([item], {
        styles: [
          {
            ...style,
            files: [
              {
                path: "styles/theme.css",
                target: "",
              },
            ],
          },
        ],
      }),
    ).toThrow(/has invalid target:/)
  })

  test("rejects style files that do not exist in the templateFiles list", () => {
    expect(() =>
      validateRegistry([item], {
        styles: [style],
        templateFiles: [...item.files],
      }),
    ).toThrow(/references missing template file: styles\/tokens.css/)
  })

  test("rejects utilities that do not exist in the templateFiles list", () => {
    expect(() =>
      validateRegistry([item], {
        utilities: [utility],
        templateFiles: [...item.files],
      }),
    ).toThrow(/references missing template file: shared\/utils\/cn.ts/)
  })

  test("accepts valid block metadata with compositional registryDependencies", () => {
    const field: RegistryItem = {
      ...item,
      name: "field",
      canonicalName: "Field",
      aliases: [],
      files: ["primitives/Field/Field.tsx"],
      remoteFiles: [{ path: "primitives/Field/Field.tsx" }],
      target: "src/components/ui/Field",
    }

    const input: RegistryItem = {
      ...item,
      name: "input",
      canonicalName: "Input",
      aliases: [],
      files: ["primitives/Input/Input.tsx"],
      remoteFiles: [{ path: "primitives/Input/Input.tsx" }],
      target: "src/components/ui/Input",
    }

    const drawer: RegistryItem = {
      ...item,
      name: "drawer",
      canonicalName: "Drawer",
      aliases: [],
      files: ["primitives/Drawer/Drawer.tsx"],
      remoteFiles: [{ path: "primitives/Drawer/Drawer.tsx" }],
      target: "src/components/ui/Drawer",
    }

    const menu: RegistryItem = {
      ...item,
      name: "menu",
      canonicalName: "Menu",
      aliases: [],
      files: ["primitives/Menu/Menu.tsx"],
      remoteFiles: [{ path: "primitives/Menu/Menu.tsx" }],
      target: "src/components/ui/Menu",
    }

    const formField: RegistryItem = {
      name: "form-field",
      canonicalName: "FormField",
      type: "block",
      category: "blocks",
      aliases: [],
      files: ["blocks/FormField/FormField.tsx"],
      dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
      registryDependencies: ["field", "input"],
      utilities: ["cn"],
      styles: ["theme"],
      target: "src/components/ui/FormField",
    }

    const sidebar: RegistryItem = {
      name: "sidebar",
      canonicalName: "Sidebar",
      type: "block",
      category: "blocks",
      aliases: [],
      files: ["blocks/Sidebar/Sidebar.tsx"],
      dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
      registryDependencies: ["button", "drawer", "menu"],
      utilities: ["cn"],
      styles: ["theme"],
      target: "src/components/ui/Sidebar",
    }

    expect(() =>
      validateRegistry([item, field, input, drawer, menu, formField, sidebar], {
        styles: [style],
        utilities: [utility],
      }),
    ).not.toThrow()
  })

  test("rejects primitives with registryDependencies", () => {
    expect(() =>
      validateRegistry([
        {
          ...item,
          registryDependencies: ["input"],
        },
      ]),
    ).toThrow(/MUST NOT declare registryDependencies/)
  })

  test("rejects block layer violations in registryDependencies", () => {
    const dashboardShell: RegistryItem = {
      name: "dashboard-shell",
      canonicalName: "DashboardShell",
      type: "block",
      category: "layout",
      aliases: [],
      files: ["templates/DashboardShell/DashboardShell.tsx"],
      dependencies: [],
      registryDependencies: ["sidebar"],
      utilities: ["cn"],
      styles: ["theme"],
      target: "src/components/ui/DashboardShell",
    }

    const sidebarBlock: RegistryItem = {
      name: "sidebar",
      canonicalName: "Sidebar",
      type: "block",
      category: "blocks",
      aliases: [],
      files: ["blocks/Sidebar/Sidebar.tsx"],
      dependencies: [],
      registryDependencies: ["dashboard-shell"],
      utilities: ["cn"],
      styles: ["theme"],
      target: "src/components/ui/Sidebar",
    }

    expect(() => validateRegistry([dashboardShell, sidebarBlock])).toThrow(
      /MUST NOT depend on template/,
    )
  })

  test("rejects blocks that depend on templates", () => {
    const sidebarBlock: RegistryItem = {
      name: "sidebar",
      canonicalName: "Sidebar",
      type: "block",
      category: "blocks",
      aliases: [],
      files: ["blocks/Sidebar/Sidebar.tsx"],
      dependencies: [],
      registryDependencies: ["dashboard-shell"],
      utilities: ["cn"],
      styles: ["theme"],
      target: "src/components/ui/Sidebar",
    }

    const dashboardShell: RegistryItem = {
      name: "dashboard-shell",
      canonicalName: "DashboardShell",
      type: "block",
      category: "layout",
      aliases: [],
      files: ["templates/DashboardShell/DashboardShell.tsx"],
      dependencies: [],
      registryDependencies: [],
      utilities: ["cn"],
      styles: ["theme"],
      target: "src/components/ui/DashboardShell",
    }

    expect(() =>
      validateRegistry([item, sidebarBlock, dashboardShell]),
    ).toThrow(/MUST NOT depend on template/)
  })

  test("rejects circular registryDependencies", () => {
    const blockA: RegistryItem = {
      name: "block-a",
      canonicalName: "BlockA",
      type: "block",
      category: "blocks",
      aliases: [],
      files: ["blocks/BlockA/BlockA.tsx"],
      dependencies: [],
      registryDependencies: ["block-b"],
      utilities: ["cn"],
      styles: ["theme"],
      target: "src/components/ui/BlockA",
    }

    const blockB: RegistryItem = {
      name: "block-b",
      canonicalName: "BlockB",
      type: "block",
      category: "blocks",
      aliases: [],
      files: ["blocks/BlockB/BlockB.tsx"],
      dependencies: [],
      registryDependencies: ["block-a"],
      utilities: ["cn"],
      styles: ["theme"],
      target: "src/components/ui/BlockB",
    }

    expect(() => validateRegistry([blockA, blockB])).toThrow(/dependency cycle/)
  })

  test("rejects block templates that import undeclared registry items", () => {
    const field: RegistryItem = {
      ...item,
      name: "field",
      canonicalName: "Field",
      aliases: [],
      files: ["primitives/Field/Field.tsx"],
      remoteFiles: [{ path: "primitives/Field/Field.tsx" }],
      target: "src/components/ui/Field",
    }

    const formField: RegistryItem = {
      ...item,
      name: "form-field",
      canonicalName: "FormField",
      type: "block",
      category: "blocks",
      aliases: [],
      files: ["blocks/FormField/FormField.tsx"],
      remoteFiles: [{ path: "blocks/FormField/FormField.tsx" }],
      registryDependencies: [],
      target: "src/components/ui/FormField",
    }

    expect(() =>
      validateRegistry([field, formField], {
        readTemplateFile: readTemplateFile,
      }),
    ).toThrow(/registryDependencies omits it/)
  })

  test("collects and displays multiple errors at once", () => {
    const invalidItem = {
      ...item,
      name: "",
      dependencies: ["invalid && package"],
    }

    try {
      validateRegistry([invalidItem])
      // Forsiramo pad testa ako validator ne baci error
      expect.fail("Validator should have thrown errors but did not")
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e)
      expect(message).toContain('Registry item "" failed basic validation')
      expect(message).toContain("invalid npm dependency")
    }
  })
})
