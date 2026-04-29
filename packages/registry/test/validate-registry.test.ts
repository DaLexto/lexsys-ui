import { describe, expect, test } from "vitest"
import type { RegistryItem, RegistryStyle } from "../src/registry.types.js"
import { validateRegistry } from "../src/validate-registry.js"

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

describe("validateRegistry", () => {
  test("accepts registry items that reference known styles and utilities", () => {
    expect(() =>
      validateRegistry([item], {
        styles: [style],
        utilities: ["cn"],
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
        },
      ]),
    ).toThrow(
      'Registry lookup key "button" is used by both "button" and "input"',
    )
  })

  test("rejects missing style references", () => {
    expect(() =>
      validateRegistry([item], {
        styles: [],
      }),
    ).toThrow('Registry item "button" references missing style: theme')
  })

  test("rejects missing utility references", () => {
    expect(() =>
      validateRegistry([item], {
        utilities: [],
      }),
    ).toThrow('Registry item "button" references missing utility: cn')
  })

  test("rejects remote files that are not declared in item files", () => {
    expect(() =>
      validateRegistry([
        {
          ...item,
          remoteFiles: [
            {
              path: "components/Button/Missing.tsx",
            },
          ],
        },
      ]),
    ).toThrow(
      'Registry item "button" remote file is not declared in files: components/Button/Missing.tsx',
    )
  })

  test("rejects invalid style file metadata", () => {
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
    ).toThrow('Registry style "theme" has invalid target')
  })
})
