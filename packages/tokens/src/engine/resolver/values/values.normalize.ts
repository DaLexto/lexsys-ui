/**
 * values.normalize.ts
 *
 * @layer resolver
 * @description Color normalization for Phase 10 contrast checks.
 */

import type { TokenColorValue, TokenValue } from "../../../types"

export interface ContrastReadyColor {
  colorSpace: TokenColorValue["colorSpace"]
  components: readonly number[]
  alpha: number
  hex?: string
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

const isTokenColorValue = (value: unknown): value is TokenColorValue => {
  return (
    isRecord(value) &&
    typeof value.colorSpace === "string" &&
    Array.isArray(value.components) &&
    value.components.every((component) => typeof component === "number") &&
    (value.alpha === undefined || typeof value.alpha === "number") &&
    (value.hex === undefined || typeof value.hex === "string")
  )
}

const isColorStringFallback = (value: string): boolean => {
  const normalized = value.trim()

  return (
    normalized.startsWith("oklch(") ||
    normalized.startsWith("#") ||
    normalized.startsWith("rgb(") ||
    normalized.startsWith("hsl(")
  )
}

const parseOklchString = (value: string): ContrastReadyColor | null => {
  const normalized = value.trim()
  const match = normalized.match(
    /^oklch\(\s*([+-]?\d*\.?\d+(?:e[-+]?\d+)?)\s+([+-]?\d*\.?\d+(?:e[-+]?\d+)?)\s+([+-]?\d*\.?\d+(?:e[-+]?\d+)?)(?:\s*\/\s*([+-]?\d*\.?\d+(?:e[-+]?\d+)?))?\s*\)$/i,
  )

  if (!match) {
    return null
  }

  return {
    colorSpace: "oklch",
    components: [Number(match[1]), Number(match[2]), Number(match[3])],
    alpha: match[4] === undefined ? 1 : Number(match[4]),
  }
}

const parseHexString = (value: string): ContrastReadyColor | null => {
  const normalized = value.trim()

  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(normalized)) {
    return null
  }

  return {
    colorSpace: "srgb",
    components: [0, 0, 0],
    alpha: 1,
    hex: normalized,
  }
}

/**
 * Returns true when a resolved leaf value can be handed to contrast tooling.
 */
export const isResolvedColorValue = (
  value: TokenValue,
): value is TokenColorValue | string => {
  if (typeof value === "string") {
    return isColorStringFallback(value)
  }

  return isTokenColorValue(value)
}

/**
 * Normalizes resolved color values for Phase 10 contrast math.
 */
export const toContrastReadyColor = (
  value: TokenValue,
): ContrastReadyColor | null => {
  if (isTokenColorValue(value)) {
    return {
      colorSpace: value.colorSpace,
      components: value.components,
      alpha: value.alpha ?? 1,
      ...(value.hex !== undefined ? { hex: value.hex } : {}),
    }
  }

  if (typeof value === "string") {
    return parseOklchString(value) ?? parseHexString(value)
  }

  return null
}
