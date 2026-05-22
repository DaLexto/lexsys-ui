import { describe, expect, it } from "vitest"

import {
  parseHslColorString,
  parseRgbColorString,
} from "../src/engine/shared/color-string.parse"
import {
  contrastRatio,
  parseColorStringToLinearRgb,
} from "../src/engine/validator/contrast/contrast.math"
import {
  isResolvedColorValue,
  toContrastReadyColor,
} from "../src/engine/resolver/values/values.normalize"

describe("color-string.parse", () => {
  it("parses modern and legacy rgb() strings", () => {
    expect(parseRgbColorString("rgb(255 255 255)")).toEqual({
      components: [1, 1, 1],
      alpha: 1,
    })
    expect(parseRgbColorString("rgb(255, 0, 0)")).toEqual({
      components: [1, 0, 0],
      alpha: 1,
    })
    expect(parseRgbColorString("rgba(0, 0, 0, 0.5)")).toEqual({
      components: [0, 0, 0],
      alpha: 0.5,
    })
    expect(parseRgbColorString("rgb(100% 0% 0% / 80%)")).toEqual({
      components: [1, 0, 0],
      alpha: 0.8,
    })
  })

  it("parses modern and legacy hsl() strings", () => {
    expect(parseHslColorString("hsl(0 0% 100%)")).toEqual({
      components: [1, 1, 1],
      alpha: 1,
    })
    expect(parseHslColorString("hsl(0, 0%, 0%)")).toEqual({
      components: [0, 0, 0],
      alpha: 1,
    })
    expect(parseHslColorString("hsla(120, 100%, 25%, 0.75)")).toEqual({
      components: [0, 0.5, 0],
      alpha: 0.75,
    })
  })

  it("returns null for unsupported color strings", () => {
    expect(parseRgbColorString("oklch(1 0 0)")).toBeNull()
    expect(parseHslColorString("#ffffff")).toBeNull()
  })
})

describe("contrast rgb/hsl integration", () => {
  it("matches oklch contrast ratios for equivalent rgb and hsl strings", () => {
    const oklchWhite = parseColorStringToLinearRgb("oklch(1 0 0)")
    const rgbWhite = parseColorStringToLinearRgb("rgb(255 255 255)")
    const hslWhite = parseColorStringToLinearRgb("hsl(0 0% 100%)")
    const oklchBlack = parseColorStringToLinearRgb("oklch(0 0 0)")

    expect(rgbWhite).not.toBeNull()
    expect(hslWhite).not.toBeNull()
    expect(
      contrastRatio(
        oklchBlack as NonNullable<typeof oklchBlack>,
        rgbWhite as NonNullable<typeof rgbWhite>,
      ),
    ).toBeCloseTo(21, 0)
    expect(
      contrastRatio(
        oklchBlack as NonNullable<typeof oklchBlack>,
        hslWhite as NonNullable<typeof hslWhite>,
      ),
    ).toBeCloseTo(21, 0)
    expect(
      contrastRatio(
        oklchBlack as NonNullable<typeof oklchBlack>,
        oklchWhite as NonNullable<typeof oklchWhite>,
      ),
    ).toBeCloseTo(21, 0)
  })

  it("normalizes rgb and hsl strings for contrast tooling", () => {
    expect(isResolvedColorValue("rgb(0 0 0)")).toBe(true)
    expect(isResolvedColorValue("hsl(0 0% 0%)")).toBe(true)
    expect(toContrastReadyColor("rgb(255 255 255)")).toEqual({
      colorSpace: "srgb",
      components: [1, 1, 1],
      alpha: 1,
    })
    expect(toContrastReadyColor("hsl(0 0% 0%)")).toEqual({
      colorSpace: "srgb",
      components: [0, 0, 0],
      alpha: 1,
    })
  })
})
