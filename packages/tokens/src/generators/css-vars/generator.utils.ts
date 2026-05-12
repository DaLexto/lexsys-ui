/**
 * css-vars-generator.utils.ts
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

import type { TokenPrimitive, TokenTree } from "../../types/index.js"

import {
  DEFAULT_GENERATOR_METADATA_KEYS,
  flattenTokenTree as flattenSharedTokenTree,
  toTokenName,
} from "../shared/index.js"

import type {
  CssVarsGeneratorOptions,
  CssVariableEntry,
  FlattenedTokenEntry,
} from "./generator.types.js"

const STRICT_REFERENCE_PATTERN = /^\{([a-zA-Z0-9_.-]+)\}$/

export const createDefaultCssVarsGeneratorOptions = (
  options: CssVarsGeneratorOptions,
): Required<CssVarsGeneratorOptions> => {
  return {
    cssVarPrefix: options.cssVarPrefix,
    groupNameOverrides: options.groupNameOverrides ?? {},
    metadataKeys: options.metadataKeys ?? DEFAULT_GENERATOR_METADATA_KEYS,
  }
}

/**
 * Flattens a token tree using CSS generator options.
 */
export const flattenTokenTree = (
  tree: TokenTree,
  options: Required<CssVarsGeneratorOptions>,
): FlattenedTokenEntry[] => {
  return flattenSharedTokenTree(tree, options.metadataKeys)
}

export const toCssVarName = (
  tokenName: string,
  options: Required<CssVarsGeneratorOptions>,
): string => {
  return `--${options.cssVarPrefix}-${tokenName}`
}

export const toCssTokenValue = (
  value: TokenPrimitive,
  options: Required<CssVarsGeneratorOptions>,
): string | null => {
  if (value === null) {
    return null
  }

  const stringValue = String(value)
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
): CssVariableEntry | null => {
  const tokenName = toTokenName(entry.path, options.groupNameOverrides)
  const cssValue = toCssTokenValue(entry.value, options)

  if (cssValue === null) {
    return null
  }

  return {
    name: tokenName,
    value: cssValue,
  }
}