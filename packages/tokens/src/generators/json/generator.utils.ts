/**
 * generator.utils.ts
 *
 * @layer generators
 * @description Utility helpers for DTCG-compatible JSON token output.
 *
 * @responsibility
 * - Create default JSON generator options
 * - Resolve DTCG token types from token paths
 * - Convert flattened token entries into DTCG token leaves
 * - Build nested DTCG token trees
 *
 * @notes
 * - This file is JSON-output-specific.
 * - It must not resolve token references to final primitive values.
 * - It preserves token references like {color.blue.600}.
 */

import {
  DEFAULT_GENERATOR_METADATA_KEYS,
  toTokenName,
} from "../shared/index.js"

import type {
  DtcgTokenLeaf,
  DtcgTokenTree,
  DtcgTokenType,
  FlattenedTokenEntry,
  JsonGeneratorOptions,
} from "./generator.types.js"

/**
 * Default DTCG type mapping by normalized token group/name.
 *
 * The keys are matched against normalized token names.
 * Longer keys win, so motion-duration is checked before motion.
 */
const DEFAULT_TOKEN_TYPE_BY_GROUP: Readonly<Record<string, DtcgTokenType>> = {
  color: "color",
  spacing: "dimension",
  radius: "dimension",
  size: "dimension",

  "font-family": "fontFamily",
  "font-size": "dimension",
  "font-weight": "fontWeight",
  "letter-spacing": "dimension",
  "line-height": "dimension",

  "motion-duration": "duration",
  "motion-easing": "cubicBezier",
}

/**
 * Creates required JSON generator options with default values applied.
 */
export const createDefaultJsonGeneratorOptions = (
  options: JsonGeneratorOptions = {},
): Required<JsonGeneratorOptions> => {
  return {
    tokenTypeByGroup: options.tokenTypeByGroup ?? DEFAULT_TOKEN_TYPE_BY_GROUP,
    groupNameOverrides: options.groupNameOverrides ?? {},
    metadataKeys: options.metadataKeys ?? DEFAULT_GENERATOR_METADATA_KEYS,
    tokenTypeResolver: options.tokenTypeResolver ?? resolveDtcgTokenType,
  }
}

/**
 * Resolves the DTCG token type for a flattened token entry.
 */
export const resolveDtcgTokenType = (
  entry: FlattenedTokenEntry,
  options: Required<JsonGeneratorOptions>,
): DtcgTokenType => {
  const tokenName = toTokenName(entry.path, {})

  const sortedTypeEntries = Object.entries(options.tokenTypeByGroup).sort(
    ([left], [right]) => right.length - left.length,
  )

  for (const [groupName, tokenType] of sortedTypeEntries) {
    if (tokenName === groupName || tokenName.startsWith(`${groupName}-`)) {
      return tokenType
    }
  }

  if (typeof entry.value === "number") {
    return "number"
  }

  if (typeof entry.value === "boolean") {
    return "boolean"
  }

  return "string"
}

/**
 * Converts a flattened token entry into a DTCG-compatible token leaf.
 */
export const toDtcgTokenLeaf = (
  entry: FlattenedTokenEntry,
  options: Required<JsonGeneratorOptions>,
): DtcgTokenLeaf => {
  const leaf: DtcgTokenLeaf = {
    $value: entry.value,
    $type: options.tokenTypeResolver(entry, options),
  }

  if (entry.description !== undefined) {
    leaf.$description = entry.description
  }

  return leaf
}

/**
 * Writes a DTCG token leaf into a nested JSON token tree.
 */
export const setDtcgTokenTreeValue = (
  tree: DtcgTokenTree,
  path: string[],
  leaf: DtcgTokenLeaf,
): void => {
  let currentTree = tree

  path.forEach((segment, index) => {
    const isLeafSegment = index === path.length - 1

    if (isLeafSegment) {
      currentTree[segment] = leaf
      return
    }

    const existingValue = currentTree[segment]

    if (
      typeof existingValue !== "object" ||
      existingValue === null ||
      "$value" in existingValue
    ) {
      currentTree[segment] = {}
    }

    currentTree = currentTree[segment] as DtcgTokenTree
  })
}