/// <reference types="node" />
import { readdirSync, type Dirent } from "node:fs"
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

// Mock podaci za testiranje
const item: RegistryItem = {
  name: "button",
  canonicalName: "Button",
  version: "0.0.1",
  type: "component",
  category: "actions",
  aliases: ["btn"],
  files: ["components/Button/Button.tsx", "components/Button/Button.types.ts"],
  remoteFiles: [
    {
      path: "components/Button/Button.tsx",
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
        templateFiles: collectTemplateFiles(join(process.cwd(), "templates")),
      }),
    ).not.toThrow()
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
          files: ["components/Input/Input.tsx"],
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
