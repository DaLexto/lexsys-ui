/**
 * output.utils.ts
 *
 * @layer generators
 * @description Shared utility helpers for generated token outputs.
 *
 * @responsibility
 * - Flatten DTCG-style { $value } token trees
 * - Normalize token path segments for generated output names
 * - Provide token tree guards shared by output generators
 * - Ignore token group metadata during traversal
 *
 * @notes
 * - This file must stay output-format-neutral.
 * - Do not add CSS variable, Tailwind, DTCG, or Figma-specific logic here.
 */

import type {
  TokenLeaf,
  TokenScalarValue,
  TokenTree,
  TokenValue,
  TokenType,
} from "../../types"

import type { FlattenedTokenEntry } from "./shared.types"

/**
 * Default metadata keys ignored when traversing token groups.
 */
export const DEFAULT_GENERATOR_METADATA_KEYS = new Set([
  "name",
  "component",
  "selector",
  "colorScheme",
])

const ROOT_TOKEN_KEYS = new Set(["DEFAULT", "$root"])

/**
 * Converts a token path segment into kebab-case.
 */
export const toKebabSegment = (segment: string): string => {
  return segment
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
}

/**
 * Applies output name overrides to a normalized token name.
 *
 * Example:
 * "motion-duration-fast" with override "motion-duration" -> "duration"
 * becomes "duration-fast".
 */
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

/**
 * Converts a token path into a normalized output token name.
 */
export const toTokenName = (
  path: string[],
  groupNameOverrides: Readonly<Record<string, string>>,
): string => {
  return normalizeTokenName(
    path.map(toKebabSegment).join("-"),
    groupNameOverrides,
  )
}

/**
 * Returns true when the value is a non-array object.
 */
const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

/**
 * Returns true when the value can be stored as a token scalar.
 */
export const isTokenScalarValue = (value: unknown): value is TokenScalarValue => {
  return typeof value === "string" || typeof value === "number"
}

const isTokenUnitValue = (value: unknown): boolean => {
  return (
    isRecord(value) &&
    typeof value.value === "number" &&
    typeof value.unit === "string"
  )
}

const isTokenColorValue = (value: unknown): boolean => {
  return (
    isRecord(value) &&
    typeof value.colorSpace === "string" &&
    Array.isArray(value.components) &&
    value.components.every((component) => typeof component === "number") &&
    (value.alpha === undefined || typeof value.alpha === "number") &&
    (value.hex === undefined || typeof value.hex === "string")
  )
}

/**
 * Returns true when the value can be stored as a DTCG token value.
 */
export const isTokenValue = (value: unknown): value is TokenValue => {
  return (
    isTokenScalarValue(value) ||
    isTokenUnitValue(value) ||
    isTokenColorValue(value)
  )
}

/**
 * Returns true when the value is a DTCG-style token leaf.
 */
export const isTokenLeaf = (value: unknown): value is TokenLeaf => {
  return isRecord(value) && "$value" in value && isTokenValue(value.$value)
}

/**
 * Returns true when the value is a token branch.
 */
export const isTokenBranch = (value: unknown): value is TokenTree => {
  return isRecord(value) && !isTokenLeaf(value)
}

/**
 * Flattens a Neurex token tree into output-generator entries.
 *
 * DEFAULT is treated as the current path so component/default token branches
 * do not create unnecessary output names.
 */
export const flattenTokenTree = (
  tree: TokenTree,
  metadataKeys: ReadonlySet<string>,
  path: string[] = [],
  inheritedType?: TokenType,
): FlattenedTokenEntry[] => {
  return Object.entries(tree).flatMap(([key, value]) => {
    if (metadataKeys.has(key)) {
      return []
    }

    const nextPath = ROOT_TOKEN_KEYS.has(key) ? path : [...path, key]

    if (isTokenLeaf(value)) {
      return [
        {
          path: nextPath,
          value: value.$value,
          description: value.$description,
          type: value.$type ?? inheritedType,
        },
      ]
    }

    if (isTokenBranch(value)) {
      return flattenTokenTree(
        value,
        metadataKeys,
        nextPath,
        value.$type ?? inheritedType,
      )
    }

    return []
  })
}
