/**
 * css-vars-generator.utils.ts
 *
 * @layer generators
 * @description Utility helpers for CSS variable output generation.
 *
 * @responsibility
 * - Convert token paths into CSS custom property names
 * - Flatten Neurex { value } token trees
 * - Convert token references into CSS variable references
 * - Ignore token group metadata during traversal
 *
 * @notes
 * - This file is CSS-output-specific.
 * - It must not resolve references to final primitive values.
 * - It maps token references like {color.blue.600} to var(--nx-color-blue-600).
 */

import type { TokenLeaf, TokenPrimitive, TokenTree } from "../../types/index.js"

import type {
  CssVarsGeneratorOptions,
  CssVariableEntry,
  FlattenedTokenEntry,
} from "./generator.types.js"

const STRICT_REFERENCE_PATTERN = /^\{([a-zA-Z0-9_.-]+)\}$/

const DEFAULT_METADATA_KEYS = new Set([
  "name",
  "component",
  "selector",
  "colorScheme",
])

export const createDefaultCssVarsGeneratorOptions = (
  options: CssVarsGeneratorOptions,
): Required<CssVarsGeneratorOptions> => {
  return {
    cssVarPrefix: options.cssVarPrefix,
    groupNameOverrides: options.groupNameOverrides ?? {},
    metadataKeys: options.metadataKeys ?? DEFAULT_METADATA_KEYS,
  }
}

export const toKebabSegment = (segment: string): string => {
  return segment
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
}

export const normalizeTokenName = (
  name: string,
  groupNameOverrides: Readonly<Record<string, string>>,
): string => {
  const sortedOverrides = Object.entries(groupNameOverrides).sort(
    ([left], [right]) => right.length - left.length,
  )

  for (const [sourceName, outputName] of sortedOverrides) {
    if (name === sourceName) {
      return outputName
    }

    const sourceNamePrefix = `${sourceName}-`

    if (name.startsWith(sourceNamePrefix)) {
      return `${outputName}-${name.slice(sourceNamePrefix.length)}`
    }
  }

  return name
}

export const toTokenName = (
  path: string[],
  groupNameOverrides: Readonly<Record<string, string>>,
): string => {
  return normalizeTokenName(path.map(toKebabSegment).join("-"), groupNameOverrides)
}

export const toCssVarName = (
  tokenName: string,
  options: Required<CssVarsGeneratorOptions>,
): string => {
  return `--${options.cssVarPrefix}-${tokenName}`
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export const isTokenPrimitive = (value: unknown): value is TokenPrimitive => {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null
  )
}

export const isTokenLeaf = (value: unknown): value is TokenLeaf => {
  return isRecord(value) && "value" in value && isTokenPrimitive(value.value)
}

export const isTokenBranch = (value: unknown): value is TokenTree => {
  return isRecord(value) && !isTokenLeaf(value)
}

export const flattenTokenTree = (
  tree: TokenTree,
  options: Required<CssVarsGeneratorOptions>,
  path: string[] = [],
): FlattenedTokenEntry[] => {
  return Object.entries(tree).flatMap(([key, value]) => {
    if (options.metadataKeys.has(key)) {
      return []
    }

    const nextPath = key === "DEFAULT" ? path : [...path, key]

    if (isTokenLeaf(value)) {
      return [
        {
          path: nextPath,
          value: value.value,
        },
      ]
    }

    if (isTokenBranch(value)) {
      return flattenTokenTree(value, options, nextPath)
    }

    return []
  })
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

  const tokenName = toTokenName(referencePath.split("."), options.groupNameOverrides)

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