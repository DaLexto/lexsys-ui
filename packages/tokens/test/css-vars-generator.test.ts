import { describe, expect, it } from "vitest"

import {
  createCssBlock,
  createCssVariableEntries,
  generateCssVariables,
} from "../src/generators/outputs"

import type { TokenTree } from "../src/types"

const generatorOptions = {
  cssVarPrefix: "nx",
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
      value: "var(--nx-radius-md)",
    })

    expect(entries).toContainEqual({
      name: "button-radius",
      value: "var(--nx-radius-control)",
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
      value: "var(--nx-duration-fast)",
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
          value: "var(--nx-radius-md)",
        },
      ],
      {
        cssVarPrefix: "nx",
        groupNameOverrides: {},
        metadataKeys: new Set(),
      },
    )

    expect(css).toBe(
      [
        ":root {",
        "  --nx-color-white: oklch(1 0 0);",
        "  --nx-radius-control: var(--nx-radius-md);",
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
      [":root {", "  --nx-color-white: oklch(1 0 0);", "}"].join("\n"),
    )
  })
})
