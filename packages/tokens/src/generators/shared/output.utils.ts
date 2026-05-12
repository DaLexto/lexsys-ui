/**
 * output.utils.ts
 *
 * @layer generators
 * @description Shared utility helpers for generated token outputs.
 *
 * @responsibility
 * - Flatten Neurex { value } token trees
 * - Normalize token path segments for generated output names
 * - Provide token tree guards shared by output generators
 * - Ignore token group metadata during traversal
 *
 * @notes
 * - This file must stay output-format-neutral.
 * - Do not add CSS variable, Tailwind, DTCG, or Figma-specific logic here.
 */

import type { TokenLeaf, TokenPrimitive, TokenTree } from "../../types/index.js"

import type { FlattenedTokenEntry } from "./output.types.js"

/**
 * Default metadata keys ignored when traversing token groups.
 */
export const DEFAULT_GENERATOR_METADATA_KEYS = new Set([
  "name",
  "component",
  "brand",
  "selector",
  "colorScheme",
])

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
 * Returns true when the value can be stored as a token primitive.
 */
export const isTokenPrimitive = (value: unknown): value is TokenPrimitive => {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null
  )
}

/**
 * Returns true when the value is a Neurex token leaf.
 */
export const isTokenLeaf = (value: unknown): value is TokenLeaf => {
  return isRecord(value) && "value" in value && isTokenPrimitive(value.value)
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
): FlattenedTokenEntry[] => {
  return Object.entries(tree).flatMap(([key, value]) => {
    if (metadataKeys.has(key)) {
      return []
    }

    const nextPath = key === "DEFAULT" ? path : [...path, key]

    if (isTokenLeaf(value)) {
      return [
        {
          path: nextPath,
          value: value.value,
          description: value.description,
        },
      ]
    }

    if (isTokenBranch(value)) {
      return flattenTokenTree(value, metadataKeys, nextPath)
    }

    return []
  })
}
