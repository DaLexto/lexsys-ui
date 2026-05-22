import { describe, expect, it } from "vitest"

import { createStyleTokenInput } from "../src/generators/inputs/input.source"
import {
  contrastRatio,
  parseColorStringToLinearRgb,
  relativeLuminance,
} from "../src/engine/validator/contrast/contrast.math"
import {
  createContrastValidationReport,
  formatContrastValidationReport,
  WCAG_AA_NORMAL_TEXT_RATIO,
} from "../src/engine/validator/contrast"
import type { ContrastValidationInput } from "../src/engine/validator/contrast"

describe("contrast.math", () => {
  it("calculates a 21:1 ratio for black on white", () => {
    const white = parseColorStringToLinearRgb("oklch(1 0 0)")
    const black = parseColorStringToLinearRgb("oklch(0 0 0)")

    expect(white).not.toBeNull()
    expect(black).not.toBeNull()
    expect(contrastRatio(black as NonNullable<typeof black>, white as NonNullable<typeof white>)).toBeCloseTo(
      21,
      0,
    )
  })

  it("reports low contrast for similar mid-tone colors", () => {
    const foreground = parseColorStringToLinearRgb("oklch(0.55 0 0)")
    const background = parseColorStringToLinearRgb("oklch(0.5 0 0)")

    expect(foreground).not.toBeNull()
    expect(background).not.toBeNull()
    expect(
      contrastRatio(
        foreground as NonNullable<typeof foreground>,
        background as NonNullable<typeof background>,
      ),
    ).toBeLessThan(WCAG_AA_NORMAL_TEXT_RATIO)
    expect(relativeLuminance(background as NonNullable<typeof background>)).toBeGreaterThan(
      0,
    )
  })
})

describe("createContrastValidationReport", () => {
  it("passes a high-contrast fixture pair for light and dark themes", () => {
    const input: ContrastValidationInput = {
      foundationTokens: {
        color: {
          white: { $value: "oklch(1 0 0)" },
          black: { $value: "oklch(0 0 0)" },
        },
      },
      componentTokens: {},
      themeTokens: [
        {
          name: "light",
          tokens: {
            color: {
              text: {
                primary: { $value: "{color.black}" },
              },
              background: {
                base: { $value: "{color.white}" },
              },
            },
          },
        },
        {
          name: "dark",
          tokens: {
            color: {
              text: {
                primary: { $value: "{color.white}" },
              },
              background: {
                base: { $value: "{color.black}" },
              },
            },
          },
        },
      ],
      pairs: [
        {
          id: "text-primary-on-base",
          foregroundPath: "color.text.primary",
          backgroundPath: "color.background.base",
        },
      ],
    }

    const report = createContrastValidationReport(input)

    expect(report.issues).toHaveLength(0)
    expect(report.pairs.every((result) => result.passes)).toBe(true)
    expect(formatContrastValidationReport(report)).toContain(
      "All registered semantic contrast pairs pass WCAG AA thresholds.",
    )
  })

  it("reports insufficient contrast for a failing fixture pair", () => {
    const input: ContrastValidationInput = {
      foundationTokens: {
        color: {
          muted: { $value: "oklch(0.55 0 0)" },
          surface: { $value: "oklch(0.5 0 0)" },
        },
      },
      componentTokens: {},
      themeTokens: [
        {
          name: "light",
          tokens: {
            color: {
              text: {
                primary: { $value: "{color.muted}" },
              },
              background: {
                base: { $value: "{color.surface}" },
              },
            },
          },
        },
      ],
      pairs: [
        {
          id: "text-primary-on-base",
          foregroundPath: "color.text.primary",
          backgroundPath: "color.background.base",
        },
      ],
    }

    const report = createContrastValidationReport(input)

    expect(report.issues.some((issue) => issue.code === "INSUFFICIENT_CONTRAST")).toBe(
      true,
    )
    expect(formatContrastValidationReport(report)).toContain("INSUFFICIENT_CONTRAST")
  })

  it("passes all registered semantic contrast pairs for the Neurex token graph", () => {
    const input = createStyleTokenInput()
    const report = createContrastValidationReport({
      foundationTokens: input.foundationTokens,
      componentTokens: input.componentTokens,
      themeTokens: input.themeTokens,
    })

    expect(report.issues).toEqual([])
    expect(report.pairs.every((result) => result.passes)).toBe(true)
  })
})
