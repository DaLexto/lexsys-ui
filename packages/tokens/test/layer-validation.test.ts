import { describe, expect, it } from "vitest"

import {
  createStyleTokenInput,
  type StyleTokenInput,
} from "../src/generators/inputs/input.source"
import {
  validateTokenLayerContracts,
  validateTokenLayerContractsStrict,
} from "../src/engine/validator"
import type { TokenTree } from "../src/types"

const createFixtureInput = (
  overrides: Partial<{
    primitiveTokens: TokenTree
    brandTokens: TokenTree
    semanticTokens: TokenTree
    componentTokens: TokenTree
    themeTokens: StyleTokenInput["themeTokens"]
  }> = {},
): StyleTokenInput => {
  const base = createStyleTokenInput()

  return {
    ...base,
    foundationTokens: base.foundationTokens,
    tokenTree: base.tokenTree,
    ...overrides,
  }
}

describe("validateTokenLayerContracts", () => {
  it("passes for the current Neurex token source graph", () => {
    const input = createStyleTokenInput()

    expect(validateTokenLayerContracts(input).violations).toEqual([])
    expect(() => validateTokenLayerContractsStrict(input)).not.toThrow()
  })

  it("flags component-to-primitive references for size and spacing scale tokens", () => {
    const input = createFixtureInput({
      primitiveTokens: {
        size: {
          "128": { $value: "32rem" },
        },
        spacing: {
          "4": { $value: "1rem" },
        },
      },
      componentTokens: {
        dialog: {
          popup: {
            maxWidth: { $value: "{size.128}" },
            padding: { $value: "{spacing.4}" },
          },
        },
      },
    })

    const { violations } = validateTokenLayerContracts(input)

    expect(violations).toEqual([
      expect.objectContaining({
        code: "COMPONENT_TO_PRIMITIVE",
        sourcePath: "dialog.popup.maxWidth",
        targetPath: "size.128",
      }),
      expect.objectContaining({
        code: "COMPONENT_TO_PRIMITIVE",
        sourcePath: "dialog.popup.padding",
        targetPath: "spacing.4",
      }),
    ])
  })

  it("flags component-to-primitive violations", () => {
    const input = createFixtureInput({
      componentTokens: {
        button: {
          background: { $value: "{color.neutral.900}" },
        },
      },
    })

    const { violations } = validateTokenLayerContracts(input)

    expect(violations).toEqual([
      expect.objectContaining({
        code: "COMPONENT_TO_PRIMITIVE",
        sourcePath: "button.background",
        targetPath: "color.neutral.900",
      }),
    ])
  })

  it("flags component-to-brand violations", () => {
    const input = createFixtureInput({
      componentTokens: {
        button: {
          background: { $value: "{brand.color.primary.base}" },
        },
      },
    })

    const { violations } = validateTokenLayerContracts(input)

    expect(violations).toEqual([
      expect.objectContaining({
        code: "COMPONENT_TO_BRAND",
        sourcePath: "button.background",
        targetPath: "brand.color.primary.base",
      }),
    ])
  })

  it("flags component-to-theme violations for theme-only paths", () => {
    const input = createFixtureInput({
      componentTokens: {
        button: {
          background: { $value: "{color.background.experimental}" },
        },
      },
      themeTokens: [
        {
          name: "light",
          brand: "neurex",
          selector: ":root",
          colorScheme: "light",
          tokens: {
            color: {
              background: {
                experimental: { $value: "{color.neutral.100}" },
              },
            },
          },
        },
      ],
    })

    const { violations } = validateTokenLayerContracts(input)

    expect(violations).toEqual([
      expect.objectContaining({
        code: "COMPONENT_TO_THEME",
        sourcePath: "button.background",
        targetPath: "color.background.experimental",
      }),
    ])
  })

  it("flags semantic-to-component violations", () => {
    const input = createFixtureInput({
      primitiveTokens: {},
      brandTokens: {},
      semanticTokens: {
        color: {
          text: {
            primary: { $value: "{button.primary.background}" },
          },
        },
      },
      componentTokens: {
        button: {
          primary: {
            background: { $value: "{action.primary.base}" },
          },
        },
      },
      themeTokens: [],
    })

    const { violations } = validateTokenLayerContracts(input)

    expect(violations).toEqual([
      expect.objectContaining({
        code: "SEMANTIC_TO_COMPONENT",
        sourcePath: "color.text.primary",
        targetPath: "button.primary.background",
      }),
    ])
  })

  it("flags theme-to-component violations", () => {
    const input = createFixtureInput({
      primitiveTokens: {},
      brandTokens: {},
      semanticTokens: {},
      componentTokens: {
        button: {
          primary: {
            background: { $value: "{action.primary.base}" },
          },
        },
      },
      themeTokens: [
        {
          name: "light",
          brand: "neurex",
          selector: ":root",
          colorScheme: "light",
          tokens: {
            color: {
              background: {
                base: { $value: "{button.primary.background}" },
              },
            },
          },
        },
      ],
    })

    const { violations } = validateTokenLayerContracts(input)

    expect(violations).toEqual([
      expect.objectContaining({
        code: "THEME_TO_COMPONENT",
        sourcePath: "color.background.base",
        targetPath: "button.primary.background",
      }),
    ])
  })

  it("flags brand component-specific intent", () => {
    const input = createFixtureInput({
      primitiveTokens: {},
      brandTokens: {
        brand: {
          button: {
            primary: {
              base: { $value: "{color.orange.500}" },
            },
          },
        },
      },
      semanticTokens: {},
      componentTokens: {
        button: {
          radius: { $value: "{radius.control}" },
        },
      },
      themeTokens: [],
    })

    const { violations } = validateTokenLayerContracts(input)

    expect(violations).toEqual([
      expect.objectContaining({
        code: "BRAND_COMPONENT_INTENT",
        sourcePath: "brand.button",
      }),
    ])
  })

  it("throws a formatted error from strict validation", () => {
    const input = createFixtureInput({
      componentTokens: {
        button: {
          background: { $value: "{color.neutral.900}" },
        },
      },
    })

    expect(() => validateTokenLayerContractsStrict(input)).toThrow(
      /Token layer validation failed:[\s\S]*\[COMPONENT_TO_PRIMITIVE\]/,
    )
  })
})
