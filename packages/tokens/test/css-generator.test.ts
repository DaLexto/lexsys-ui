import { describe, expect, it } from "vitest"

import {
  createCssBlock,
  createCssVariableEntries,
  generateCssVariables,
} from "../src/generators/outputs"

import type { TokenTree } from "../src/types"

const generatorOptions = {
  cssVarPrefix: "lsys",
  groupNameOverrides: {
    spacing: "space",
    "motion-duration": "duration",
    "motion-easing": "easing",
  },
}

describe("css vars generator", () => {
  it("creates CSS variable entries from token leaves", () => {
    const tokens: TokenTree = {
      color: {
        white: { $value: "oklch(1 0 0)" },
        blue: {
          600: { $value: "oklch(0.546 0.245 262.881)" },
        },
      },
    }

    const entries = createCssVariableEntries(tokens, generatorOptions)

    expect(entries).toEqual([
      {
        name: "color-white",
        value: "oklch(1 0 0)",
      },
      {
        name: "color-blue-600",
        value: "oklch(0.546 0.245 262.881)",
      },
    ])
  })

  it("maps token references to CSS variable references", () => {
    const tokens: TokenTree = {
      radius: {
        md: { $value: "0.375rem" },
        control: { $value: "{radius.md}" },
      },
      button: {
        radius: { $value: "{radius.control}" },
      },
    }

    const entries = createCssVariableEntries(tokens, generatorOptions)

    expect(entries).toContainEqual({
      name: "radius-control",
      value: "var(--lsys-radius-md)",
    })

    expect(entries).toContainEqual({
      name: "button-radius",
      value: "var(--lsys-radius-control)",
    })
  })

  it("serializes platform-neutral DTCG value objects for CSS output", () => {
    const tokens: TokenTree = {
      spacing: {
        $type: "dimension",
        4: { $value: { value: 16, unit: "px" } },
      },
      motion: {
        duration: {
          $type: "duration",
          fast: { $value: { value: 150, unit: "ms" } },
        },
      },
      color: {
        accent: {
          $type: "color",
          $value: {
            colorSpace: "oklch",
            components: [0.558, 0.288, 302.321],
            alpha: 1,
            hex: "#7c3aed",
          },
        },
      },
    }

    const entries = createCssVariableEntries(tokens, generatorOptions)

    expect(entries).toContainEqual({
      name: "space-4",
      value: "16px",
    })

    expect(entries).toContainEqual({
      name: "duration-fast",
      value: "150ms",
    })

    expect(entries).toContainEqual({
      name: "color-accent",
      value: "oklch(0.558 0.288 302.321)",
    })
  })

  it("applies group name overrides", () => {
    const tokens: TokenTree = {
      spacing: {
        1: { $value: "0.25rem" },
      },
      motion: {
        duration: {
          fast: { $value: "150ms" },
          control: { $value: "{motion.duration.fast}" },
        },
        easing: {
          standard: { $value: "cubic-bezier(0.2, 0, 0, 1)" },
        },
      },
    }

    const entries = createCssVariableEntries(tokens, generatorOptions)

    expect(entries).toContainEqual({
      name: "space-1",
      value: "0.25rem",
    })

    expect(entries).toContainEqual({
      name: "duration-fast",
      value: "150ms",
    })

    expect(entries).toContainEqual({
      name: "duration-control",
      value: "var(--lsys-duration-fast)",
    })

    expect(entries).toContainEqual({
      name: "easing-standard",
      value: "cubic-bezier(0.2, 0, 0, 1)",
    })
  })

  it("skips metadata keys while flattening token groups", () => {
    const tokens = {
      name: "color",
      selector: ":root",
      colorScheme: "light",
      white: { $value: "oklch(1 0 0)" },
    } as unknown as TokenTree

    const entries = createCssVariableEntries(tokens, generatorOptions, [
      "color",
    ])

    expect(entries).toEqual([
      {
        name: "color-white",
        value: "oklch(1 0 0)",
      },
    ])
  })

  it("composes shadow boxShadow from composite slot CSS variables", () => {
    const tokens: TokenTree = {
      elevation: {
        shadow: {
          $type: "shadow",
          floating: {
            color: {
              $value: {
                colorSpace: "oklch",
                components: [0, 0, 0],
                alpha: 0.12,
              },
            },
            offsetX: { $value: "0" },
            offsetY: { $value: "8px" },
            blur: { $value: "16px" },
            spread: { $value: "0" },
            inset: { $value: "" },
            boxShadow: { $value: "0 8px 16px 0 oklch(0 0 0 / 0.12)" },
          },
        },
      },
    }

    const entries = createCssVariableEntries(tokens, generatorOptions)

    expect(entries).toContainEqual({
      name: "elevation-shadow-floating-color",
      value: "oklch(0 0 0 / 0.12)",
    })

    expect(entries).toContainEqual({
      name: "elevation-shadow-floating-box-shadow",
      value:
        "var(--lsys-elevation-shadow-floating-inset) var(--lsys-elevation-shadow-floating-offset-x) var(--lsys-elevation-shadow-floating-offset-y) var(--lsys-elevation-shadow-floating-blur) var(--lsys-elevation-shadow-floating-spread) var(--lsys-elevation-shadow-floating-color)",
    })
  })

  it("composes primitive shadow boxShadow from composite slot CSS variables", () => {
    const tokens: TokenTree = {
      shadow: {
        $type: "shadow",
        4: {
          color: {
            $value: {
              colorSpace: "oklch",
              components: [0, 0, 0],
              alpha: 0.12,
            },
          },
          offsetX: { $value: "0" },
          offsetY: { $value: "8px" },
          blur: { $value: "16px" },
          spread: { $value: "0" },
          inset: { $value: "" },
          boxShadow: { $value: "0 8px 16px rgb(0 0 0 / 0.12)" },
        },
      },
    }

    const entries = createCssVariableEntries(tokens, generatorOptions)

    expect(entries).toContainEqual({
      name: "shadow-4-box-shadow",
      value:
        "var(--lsys-shadow-4-inset) var(--lsys-shadow-4-offset-x) var(--lsys-shadow-4-offset-y) var(--lsys-shadow-4-blur) var(--lsys-shadow-4-spread) var(--lsys-shadow-4-color)",
    })
  })

  it("composes inset primitive shadow boxShadow from composite slot CSS variables", () => {
    const tokens: TokenTree = {
      shadow: {
        $type: "shadow",
        inner: {
          color: {
            $value: {
              colorSpace: "oklch",
              components: [0, 0, 0],
              alpha: 0.08,
            },
          },
          inset: { $value: "inset" },
          offsetX: { $value: "0" },
          offsetY: { $value: "1px" },
          blur: { $value: "2px" },
          spread: { $value: "0" },
          boxShadow: { $value: "inset 0 1px 2px rgb(0 0 0 / 0.08)" },
        },
      },
    }

    const entries = createCssVariableEntries(tokens, generatorOptions)

    expect(entries).toContainEqual({
      name: "shadow-inner-box-shadow",
      value:
        "var(--lsys-shadow-inner-inset) var(--lsys-shadow-inner-offset-x) var(--lsys-shadow-inner-offset-y) var(--lsys-shadow-inner-blur) var(--lsys-shadow-inner-spread) var(--lsys-shadow-inner-color)",
    })
  })

  it("collapses DEFAULT path segments", () => {
    const tokens: TokenTree = {
      radius: {
        DEFAULT: { $value: "0.375rem" },
        sm: { $value: "0.25rem" },
      },
    }

    const entries = createCssVariableEntries(tokens, generatorOptions)

    expect(entries).toContainEqual({
      name: "radius",
      value: "0.375rem",
    })

    expect(entries).toContainEqual({
      name: "radius-sm",
      value: "0.25rem",
    })
  })

  it("collapses DTCG $root path segments", () => {
    const tokens: TokenTree = {
      spacing: {
        $type: "dimension",
        $root: { $value: { value: 16, unit: "px" } },
        sm: { $value: { value: 8, unit: "px" } },
      },
    }

    const entries = createCssVariableEntries(tokens, generatorOptions)

    expect(entries).toContainEqual({
      name: "space",
      value: "16px",
    })

    expect(entries).toContainEqual({
      name: "space-sm",
      value: "8px",
    })
  })

  it("serializes entries into a CSS selector block", () => {
    const css = createCssBlock(
      ":root",
      [
        {
          name: "color-white",
          value: "oklch(1 0 0)",
        },
        {
          name: "radius-control",
          value: "var(--lsys-radius-md)",
        },
      ],
      {
        cssVarPrefix: "lsys",
        groupNameOverrides: {},
        metadataKeys: new Set(),
      },
    )

    expect(css).toBe(
      [
        ":root {",
        "  --lsys-color-white: oklch(1 0 0);",
        "  --lsys-radius-control: var(--lsys-radius-md);",
        "}",
      ].join("\n"),
    )
  })

  it("generates entries and CSS together", () => {
    const tokens: TokenTree = {
      color: {
        white: { $value: "oklch(1 0 0)" },
      },
    }

    const result = generateCssVariables(tokens, generatorOptions)

    expect(result.entries).toEqual([
      {
        name: "color-white",
        value: "oklch(1 0 0)",
      },
    ])

    expect(result.css).toBe(
      [":root {", "  --lsys-color-white: oklch(1 0 0);", "}"].join("\n"),
    )
  })

  it("flattens typography composite slot leaves into atomic CSS variables", () => {
    const tokens: TokenTree = {
      typography: {
        family: {
          sans: { $value: "{font-family.sans}" },
        },
        control: {
          $type: "typography",
          md: {
            fontFamily: { $value: "{typography.family.sans}" },
            fontSize: { $value: "{font-size.sm}" },
            fontWeight: { $value: "{font-weight.medium}" },
            lineHeight: { $value: "{line-height.tight}" },
            letterSpacing: { $value: "{letter-spacing.normal}" },
          },
        },
      },
      "font-family": {
        sans: { $value: "Inter, sans-serif" },
      },
      "font-size": {
        sm: { $value: "0.875rem" },
      },
      "font-weight": {
        medium: { $value: 500 },
      },
      "line-height": {
        tight: { $value: 1.25 },
      },
      "letter-spacing": {
        normal: { $value: "0em" },
      },
    }

    const entries = createCssVariableEntries(tokens, generatorOptions)

    expect(entries).toContainEqual({
      name: "typography-control-md-font-family",
      value: "var(--lsys-typography-family-sans)",
    })
    expect(entries).toContainEqual({
      name: "typography-control-md-font-size",
      value: "var(--lsys-font-size-sm)",
    })
    expect(entries).toContainEqual({
      name: "typography-control-md-font-weight",
      value: "var(--lsys-font-weight-medium)",
    })
    expect(entries).toContainEqual({
      name: "typography-control-md-line-height",
      value: "var(--lsys-line-height-tight)",
    })
    expect(entries).toContainEqual({
      name: "typography-control-md-letter-spacing",
      value: "var(--lsys-letter-spacing-normal)",
    })
  })
})
