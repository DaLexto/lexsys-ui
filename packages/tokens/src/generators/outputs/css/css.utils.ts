/**
 * css-vars.utils.ts
 *
 * @layer generators
 * @description Utility helpers for CSS variable output generation.
 *
 * @responsibility
 * - Convert token paths into CSS custom property names
 * - Convert token references into CSS variable references
 * - Keep CSS-specific output behavior separate from shared token traversal
 *
 * @notes
 * - This file is CSS-output-specific.
 * - It must not resolve references to final primitive values.
 * - It maps token references like {color.blue.600} to var(--nx-color-blue-600).
 */

import type {
  TokenColorValue,
  TokenUnitValue,
  TokenValue,
} from "../../../types"

import {
  DEFAULT_GENERATOR_METADATA_KEYS,
  toTokenName,
  type FlattenedTokenEntry,
} from "../../shared"

import type { CssVarsGeneratorOptions, CssVariableEntry } from "./css.types"

const STRICT_REFERENCE_PATTERN = /^\{([a-zA-Z0-9_.-]+)\}$/

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

const isTokenUnitValue = (value: TokenValue): value is TokenUnitValue => {
  return (
    isRecord(value) &&
    typeof value.value === "number" &&
    typeof value.unit === "string"
  )
}

const isTokenColorValue = (value: TokenValue): value is TokenColorValue => {
  return (
    isRecord(value) &&
    typeof value.colorSpace === "string" &&
    Array.isArray(value.components) &&
    value.components.every((component) => typeof component === "number")
  )
}

const toCssColorValue = (value: TokenColorValue): string => {
  const alpha = value.alpha ?? 1
  const alphaSuffix = alpha === 1 ? "" : ` / ${alpha}`
  const components = value.components.join(" ")

  if (value.colorSpace === "oklch") {
    return `oklch(${components}${alphaSuffix})`
  }

  if (value.colorSpace === "srgb") {
    return `color(srgb ${components}${alphaSuffix})`
  }

  return `color(${value.colorSpace} ${components}${alphaSuffix})`
}

const toCssRawTokenValue = (value: TokenValue): string => {
  if (typeof value === "string" || typeof value === "number") {
    return String(value)
  }

  if (isTokenUnitValue(value)) {
    return `${value.value}${value.unit}`
  }

  if (isTokenColorValue(value)) {
    return toCssColorValue(value)
  }

  throw new Error("Unsupported token value for CSS output.")
}

export const createDefaultCssVarsGeneratorOptions = (
  options: CssVarsGeneratorOptions,
): Required<CssVarsGeneratorOptions> => {
  return {
    cssVarPrefix: options.cssVarPrefix,
    groupNameOverrides: options.groupNameOverrides ?? {},
    metadataKeys: options.metadataKeys ?? DEFAULT_GENERATOR_METADATA_KEYS,
  }
}

export const toCssVarName = (
  tokenName: string,
  options: Required<CssVarsGeneratorOptions>,
): string => {
  return `--${options.cssVarPrefix}-${tokenName}`
}

export const toCssTokenValue = (
  value: TokenValue,
  options: Required<CssVarsGeneratorOptions>,
): string => {
  const stringValue = toCssRawTokenValue(value)
  const reference = stringValue.match(STRICT_REFERENCE_PATTERN)

  if (!reference) {
    return stringValue
  }

  const referencePath = reference[1]

  if (referencePath === undefined) {
    return stringValue
  }

  const tokenName = toTokenName(
    referencePath.split("."),
    options.groupNameOverrides,
  )

  return `var(${toCssVarName(tokenName, options)})`
}

export const toCssVariableEntry = (
  entry: FlattenedTokenEntry,
  options: Required<CssVarsGeneratorOptions>,
): CssVariableEntry => {
  const tokenName = toTokenName(entry.path, options.groupNameOverrides)
  const cssValue = toCssTokenValue(entry.value, options)

  return {
    name: tokenName,
    value: cssValue,
  }
}
