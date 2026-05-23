import { describe, expect, it } from "vitest"

import {
  createStyleTokenInput,
  validateStyleTokenInput,
} from "../src/generators/inputs/input.source"
import {
  contrastRatio,
  compositeLinearRgb,
  parseColorStringToLinearRgb,
  relativeLuminance,
} from "../src/engine/validator/contrast/contrast.math"
import {
  createContrastValidationReport,
  DEFAULT_CONTRAST_POLICY,
  evaluateContrastPolicy,
  formatContrastValidationReport,
  resolvePairMinimumRatio,
  validateContrastPolicyStrict,
  WCAG_AA_LARGE_TEXT_RATIO,
  WCAG_AA_NORMAL_TEXT_RATIO,
} from "../src/engine/validator/contrast"
import type { ContrastValidationInput } from "../src/engine/validator/contrast"

describe("contrast.math", () => {
  it("calculates a 21:1 ratio for black on white", () => {
    const white = parseColorStringToLinearRgb("oklch(1 0 0)")
    const black = parseColorStringToLinearRgb("oklch(0 0 0)")

    expect(white).not.toBeNull()
    expect(black).not.toBeNull()
    expect(
      contrastRatio(
        black as NonNullable<typeof black>,
        white as NonNullable<typeof white>,
      ),
    ).toBeCloseTo(21, 0)
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
    expect(
      relativeLuminance(background as NonNullable<typeof background>),
    ).toBeGreaterThan(0)
  })

  it("parses rgb() and hsl() strings for contrast math", () => {
    const white = parseColorStringToLinearRgb("rgb(255, 255, 255)")
    const black = parseColorStringToLinearRgb("hsl(0, 0%, 0%)")

    expect(white).not.toBeNull()
    expect(black).not.toBeNull()
    expect(
      contrastRatio(
        black as NonNullable<typeof black>,
        white as NonNullable<typeof white>,
      ),
    ).toBeCloseTo(21, 0)
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

    expect(
      report.issues.some((issue) => issue.code === "INSUFFICIENT_CONTRAST"),
    ).toBe(true)
    expect(formatContrastValidationReport(report)).toContain(
      "INSUFFICIENT_CONTRAST",
    )
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

describe("contrast.policy", () => {
  it("uses large-text threshold when textSize is large", () => {
    expect(
      resolvePairMinimumRatio({
        id: "fixture",
        foregroundPath: "a",
        backgroundPath: "b",
        textSize: "large",
      }),
    ).toBe(WCAG_AA_LARGE_TEXT_RATIO)
  })

  it("fails policy evaluation when report has contrast issues", () => {
    const evaluation = evaluateContrastPolicy({
      pairs: [],
      issues: [
        {
          code: "INSUFFICIENT_CONTRAST",
          message: "fixture",
          pairId: "fixture",
          theme: "light",
          foregroundPath: "a",
          backgroundPath: "b",
          minimumRatio: WCAG_AA_NORMAL_TEXT_RATIO,
        },
      ],
    })

    expect(evaluation.passes).toBe(false)
    expect(evaluation.failures).toHaveLength(1)
  })

  it("passes policy evaluation for a clean report", () => {
    const evaluation = evaluateContrastPolicy({
      pairs: [],
      issues: [],
    })

    expect(evaluation.passes).toBe(true)
    expect(DEFAULT_CONTRAST_POLICY.tier).toBe("ci")
  })
})

describe("overlay background compositing", () => {
  it("composites semi-transparent overlay over base before contrast math", () => {
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
                overlay: {
                  $value: {
                    colorSpace: "oklch",
                    components: [0, 0, 0],
                    alpha: 0.15,
                  },
                },
              },
            },
          },
        },
      ],
      pairs: [
        {
          id: "text-primary-on-overlay",
          foregroundPath: "color.text.primary",
          backgroundPath: "color.background.overlay",
        },
      ],
    }

    const report = createContrastValidationReport(input)

    expect(report.issues).toHaveLength(0)
    expect(report.pairs[0]?.passes).toBe(true)
  })

  it("matches composited overlay luminance against manual alpha blend", () => {
    const overlay = parseColorStringToLinearRgb("oklch(0 0 0 / 0.15)")
    const base = parseColorStringToLinearRgb("oklch(1 0 0)")
    const foreground = parseColorStringToLinearRgb("oklch(0 0 0)")

    expect(overlay).not.toBeNull()
    expect(base).not.toBeNull()
    expect(foreground).not.toBeNull()

    const composited = compositeLinearRgb(
      overlay as NonNullable<typeof overlay>,
      base as NonNullable<typeof base>,
    )

    expect(
      contrastRatio(foreground as NonNullable<typeof foreground>, composited),
    ).toBeGreaterThan(WCAG_AA_NORMAL_TEXT_RATIO)
  })
})

describe("validateContrastPolicyStrict", () => {
  it("passes for the Neurex token graph", () => {
    const input = createStyleTokenInput()

    expect(() => {
      validateContrastPolicyStrict({
        foundationTokens: input.foundationTokens,
        componentTokens: input.componentTokens,
        themeTokens: input.themeTokens,
      })
    }).not.toThrow()
  })

  it("throws when contrast policy failures exist", () => {
    expect(() => {
      validateContrastPolicyStrict({
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
      })
    }).toThrow(/Contrast policy validation failed/)
  })
})

describe("validateStyleTokenInput", () => {
  it("enforces contrast policy during style token validation", () => {
    expect(() => {
      validateStyleTokenInput(createStyleTokenInput())
    }).not.toThrow()
  })
})
