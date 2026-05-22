/**
 * values.normalize.ts
 *
 * @layer resolver
 * @description Color normalization stubs for Phase 10 contrast checks.
 *
 * Accepts resolved terminal values only. No WCAG math or string parsing yet.
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
 * Normalizes structured OKLCH objects for Phase 10 contrast math.
 *
 * String fallbacks are recognized by {@link isResolvedColorValue} but are not
 * parsed here yet — Phase 10 will add CSS color string parsing.
 */
export const toContrastReadyColor = (
  value: TokenValue,
): ContrastReadyColor | null => {
  if (!isTokenColorValue(value)) {
    return null
  }

  return {
    colorSpace: value.colorSpace,
    components: value.components,
    alpha: value.alpha ?? 1,
    ...(value.hex !== undefined ? { hex: value.hex } : {}),
  }
}
