/**
 * contrast.math.ts
 *
 * @layer validator
 * @description WCAG relative luminance and contrast ratio helpers.
 */

import type { ContrastReadyColor } from "../../resolver/values/values.normalize"

export interface LinearRgb {
  r: number
  g: number
  b: number
  alpha: number
}

const clamp01 = (value: number): number => {
  return Math.min(1, Math.max(0, value))
}

const linearizeChannel = (channel: number): number => {
  if (channel <= 0.04045) {
    return channel / 12.92
  }

  return ((channel + 0.055) / 1.055) ** 2.4
}

const encodeSrgbChannel = (channel: number): number => {
  if (channel <= 0.0031308) {
    return channel * 12.92
  }

  return 1.055 * channel ** (1 / 2.4) - 0.055
}

const oklabToLinearRgb = (
  lightness: number,
  a: number,
  b: number,
): [number, number, number] => {
  const l = lightness + 0.3963377774 * a + 0.2158037573 * b
  const m = lightness - 0.1055613458 * a - 0.0638541728 * b
  const s = lightness - 0.0894841775 * a - 1.291485548 * b
  const lCubed = l ** 3
  const mCubed = m ** 3
  const sCubed = s ** 3

  return [
    +4.0767416621 * lCubed - 3.3077115913 * mCubed + 0.2309699292 * sCubed,
    -1.2684380046 * lCubed + 2.6097574011 * mCubed - 0.3413193965 * sCubed,
    -0.0041960863 * lCubed - 0.7034186147 * mCubed + 1.707614701 * sCubed,
  ]
}

const oklchToLinearRgb = (
  lightness: number,
  chroma: number,
  hue: number,
): [number, number, number] => {
  const hueRadians = (hue * Math.PI) / 180
  const a = chroma * Math.cos(hueRadians)
  const b = chroma * Math.sin(hueRadians)

  return oklabToLinearRgb(lightness, a, b)
}

const parseHexColor = (value: string): LinearRgb | null => {
  const normalized = value.trim()
  const match = normalized.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)

  if (!match) {
    return null
  }

  const hex = match[1]

  if (hex === undefined) {
    return null
  }

  const expanded =
    hex.length === 3
      ? hex
          .split("")
          .map((character) => `${character}${character}`)
          .join("")
      : hex

  const red = Number.parseInt(expanded.slice(0, 2), 16) / 255
  const green = Number.parseInt(expanded.slice(2, 4), 16) / 255
  const blue = Number.parseInt(expanded.slice(4, 6), 16) / 255

  return {
    r: linearizeChannel(red),
    g: linearizeChannel(green),
    b: linearizeChannel(blue),
    alpha: 1,
  }
}

const parseOklchString = (value: string): LinearRgb | null => {
  const normalized = value.trim()
  const match = normalized.match(
    /^oklch\(\s*([+-]?\d*\.?\d+(?:e[-+]?\d+)?)\s+([+-]?\d*\.?\d+(?:e[-+]?\d+)?)\s+([+-]?\d*\.?\d+(?:e[-+]?\d+)?)(?:\s*\/\s*([+-]?\d*\.?\d+(?:e[-+]?\d+)?))?\s*\)$/i,
  )

  if (!match) {
    return null
  }

  const lightness = Number(match[1])
  const chroma = Number(match[2])
  const hue = Number(match[3])
  const alpha = match[4] === undefined ? 1 : Number(match[4])
  const [red, green, blue] = oklchToLinearRgb(lightness, chroma, hue)

  return {
    r: clamp01(red),
    g: clamp01(green),
    b: clamp01(blue),
    alpha: clamp01(alpha),
  }
}

export const contrastReadyColorToLinearRgb = (
  color: ContrastReadyColor,
): LinearRgb | null => {
  if (color.hex !== undefined) {
    const parsedHex = parseHexColor(color.hex)

    if (parsedHex !== null) {
      return {
        ...parsedHex,
        alpha: color.alpha,
      }
    }
  }

  if (color.colorSpace === "oklch") {
    const [lightness, chroma, hue] = color.components
    const [red, green, blue] = oklchToLinearRgb(lightness, chroma, hue)

    return {
      r: clamp01(red),
      g: clamp01(green),
      b: clamp01(blue),
      alpha: color.alpha,
    }
  }

  if (color.colorSpace === "srgb") {
    const [red, green, blue] = color.components

    return {
      r: linearizeChannel(red),
      g: linearizeChannel(green),
      b: linearizeChannel(blue),
      alpha: color.alpha,
    }
  }

  return null
}

export const parseColorStringToLinearRgb = (
  value: string,
): LinearRgb | null => {
  if (value.startsWith("#")) {
    return parseHexColor(value)
  }

  if (value.startsWith("oklch(")) {
    return parseOklchString(value)
  }

  return null
}

export const compositeLinearRgb = (
  foreground: LinearRgb,
  background: LinearRgb,
): LinearRgb => {
  const alpha = foreground.alpha + background.alpha * (1 - foreground.alpha)

  if (alpha === 0) {
    return { r: 0, g: 0, b: 0, alpha: 0 }
  }

  return {
    r:
      (foreground.r * foreground.alpha +
        background.r * background.alpha * (1 - foreground.alpha)) /
      alpha,
    g:
      (foreground.g * foreground.alpha +
        background.g * background.alpha * (1 - foreground.alpha)) /
      alpha,
    b:
      (foreground.b * foreground.alpha +
        background.b * background.alpha * (1 - foreground.alpha)) /
      alpha,
    alpha,
  }
}

export const relativeLuminance = (color: LinearRgb): number => {
  return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b
}

export const contrastRatio = (
  foreground: LinearRgb,
  background: LinearRgb,
): number => {
  const compositeForeground =
    foreground.alpha < 1
      ? compositeLinearRgb(foreground, background)
      : foreground
  const lighter = Math.max(
    relativeLuminance(compositeForeground),
    relativeLuminance(background),
  )
  const darker = Math.min(
    relativeLuminance(compositeForeground),
    relativeLuminance(background),
  )

  return (lighter + 0.05) / (darker + 0.05)
}

export const linearRgbToHex = (color: LinearRgb): string => {
  const red = Math.round(encodeSrgbChannel(color.r) * 255)
  const green = Math.round(encodeSrgbChannel(color.g) * 255)
  const blue = Math.round(encodeSrgbChannel(color.b) * 255)

  return `#${[red, green, blue]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`
}
