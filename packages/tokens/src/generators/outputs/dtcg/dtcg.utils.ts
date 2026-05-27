/**
 * dtcg.utils.ts
 *
 * @layer generators
 * @description Utility helpers for DTCG-compatible JSON token output.
 *
 * @responsibility
 * - Create default JSON generator options
 * - Resolve DTCG token types from token paths
 * - Convert token leaves into DTCG token leaves
 * - Serialize token trees while preserving branch metadata
 *
 * @notes
 * - This file is JSON-output-specific.
 * - It must not resolve token references to final primitive values.
 * - It preserves token references like {color.blue.600}.
 * - It preserves DTCG-style branch metadata such as $description and $deprecated.
 */

import type { TokenLeaf, TokenTree } from "../../../types"

import {
  DEFAULT_GENERATOR_METADATA_KEYS,
  type FlattenedTokenEntry,
} from "../../shared"

import type {
  DtcgGeneratorOptions,
  DtcgLexsysMetadata,
  DtcgTokenLeaf,
  DtcgTokenTree,
  DtcgTokenType,
} from "./dtcg.types"
import {
  DEFAULT_TOKEN_TYPE_BY_GROUP,
  resolveDtcgFlattenedTokenType,
  resolveDtcgTokenLeafType,
} from "./dtcg.type-resolution"

export const DTCG_SCHEMA_URL =
  "https://www.designtokens.org/schemas/2025.10/format.json"

export const DTCG_LEXSYS_EXTENSION_KEY = "org.lexsys"

const DTCG_JSON_KEY_ORDER = [
  "$schema",
  "$extensions",
  "$type",
  "$description",
  "$deprecated",
  "$value",
] as const

const DTCG_METADATA_KEYS = new Set([
  "$schema",
  "$extensions",
  "$type",
  "$description",
  "$deprecated",
])

const DEFAULT_DTCG_METADATA: DtcgLexsysMetadata = {
  generatedBy: "@dalexto/lexsys-tokens",
  tokenSetOrder: ["primitives", "brand", "semantics", "components"],
}

/**
 * Checks whether an unknown value is a plain object record.
 */
const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

/**
 * Checks whether an unknown value is a DTCG-style token leaf.
 */
const isTokenLeafLike = (value: unknown): value is TokenLeaf => {
  return isRecord(value) && "$value" in value
}

/**
 * Checks whether a key is DTCG-style metadata.
 */
const isMetadataKey = (
  key: string,
  options: Required<DtcgGeneratorOptions>,
): boolean => {
  return DTCG_METADATA_KEYS.has(key) || options.metadataKeys.has(key)
}

/**
 * Checks whether a value is valid DTCG metadata value.
 */
const isDtcgMetadataValue = (
  value: unknown,
): value is string | boolean | undefined => {
  return (
    typeof value === "string" ||
    typeof value === "boolean" ||
    value === undefined
  )
}

/**
 * Creates required JSON generator options with default values applied.
 */
export const createDefaultDtcgGeneratorOptions = (
  options: DtcgGeneratorOptions = {},
): Required<DtcgGeneratorOptions> => {
  return {
    schemaUrl: options.schemaUrl ?? DTCG_SCHEMA_URL,
    metadata: options.metadata ?? DEFAULT_DTCG_METADATA,
    tokenTypeByGroup: options.tokenTypeByGroup ?? DEFAULT_TOKEN_TYPE_BY_GROUP,
    groupNameOverrides: options.groupNameOverrides ?? {},
    metadataKeys: options.metadataKeys ?? DEFAULT_GENERATOR_METADATA_KEYS,
    tokenTypeResolver: options.tokenTypeResolver ?? resolveDtcgTokenType,
  }
}

const getOrderedDtcgJsonKeys = (value: Record<string, unknown>): string[] => {
  const metadataKeyOrder: readonly string[] = DTCG_JSON_KEY_ORDER
  const orderedKeys = DTCG_JSON_KEY_ORDER.filter((key) => {
    return Object.hasOwn(value, key) && value[key] !== undefined
  })
  const remainingKeys = Object.keys(value).filter((key) => {
    return !metadataKeyOrder.includes(key) && value[key] !== undefined
  })

  return [...orderedKeys, ...remainingKeys]
}

const stringifyDtcgValue = (value: unknown, depth: number): string => {
  if (!isRecord(value)) {
    if (!Array.isArray(value)) {
      return JSON.stringify(value)
    }

    if (value.length === 0) {
      return "[]"
    }

    const currentIndent = "  ".repeat(depth)
    const nextIndent = "  ".repeat(depth + 1)
    const entries = value.map((entry) => {
      return `${nextIndent}${stringifyDtcgValue(entry, depth + 1)}`
    })

    return `[\n${entries.join(",\n")}\n${currentIndent}]`
  }

  const keys = getOrderedDtcgJsonKeys(value)

  if (keys.length === 0) {
    return "{}"
  }

  const currentIndent = "  ".repeat(depth)
  const nextIndent = "  ".repeat(depth + 1)
  const entries = keys.map((key) => {
    return `${nextIndent}${JSON.stringify(key)}: ${stringifyDtcgValue(
      value[key],
      depth + 1,
    )}`
  })

  return `{\n${entries.join(",\n")}\n${currentIndent}}`
}

export const stringifyDtcgJson = (value: unknown): string => {
  return `${stringifyDtcgValue(value, 0)}\n`
}

export const resolveDtcgTokenType = resolveDtcgFlattenedTokenType

/**
 * Converts a flattened token entry into a DTCG-compatible token leaf.
 *
 * This remains available for legacy flattened-generation helpers and tests.
 */
export const toDtcgTokenLeaf = (
  entry: FlattenedTokenEntry,
  options: Required<DtcgGeneratorOptions>,
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
 * Converts an authored token leaf into a DTCG-compatible token leaf.
 */
export const toDtcgTokenLeafFromTokenLeaf = (
  leaf: TokenLeaf,
  path: string[],
  options: Required<DtcgGeneratorOptions>,
): DtcgTokenLeaf => {
  const dtcgLeaf: DtcgTokenLeaf = {
    $value: leaf.$value,
    $type: resolveDtcgTokenLeafType(leaf, path, options),
  }

  if (leaf.$description !== undefined) {
    dtcgLeaf.$description = leaf.$description
  }

  const deprecated = leaf.$deprecated

  if (typeof deprecated === "string" || typeof deprecated === "boolean") {
    dtcgLeaf.$deprecated = deprecated
  }

  return dtcgLeaf
}

const getExplicitTokenType = (
  value: DtcgTokenLeaf | DtcgTokenTree,
): DtcgTokenType | undefined => {
  return typeof value.$type === "string" ? value.$type : undefined
}

const getSharedTokenType = (
  tokenTypes: DtcgTokenType[],
): DtcgTokenType | undefined => {
  const uniqueTokenTypes = new Set(tokenTypes)

  if (uniqueTokenTypes.size !== 1) {
    return undefined
  }

  return tokenTypes[0]
}

const getDirectLeafTokenTypes = (tree: DtcgTokenTree): DtcgTokenType[] => {
  return Object.entries(tree).flatMap(([key, value]) => {
    if (
      DTCG_METADATA_KEYS.has(key) ||
      !isRecord(value) ||
      !("$value" in value)
    ) {
      return []
    }

    const tokenType = getExplicitTokenType(value)

    return tokenType === undefined ? [] : [tokenType]
  })
}

const hasOnlyDirectLeafChildren = (tree: DtcgTokenTree): boolean => {
  const childEntries = Object.entries(tree).filter(([key]) => {
    return !DTCG_METADATA_KEYS.has(key)
  })

  if (childEntries.length === 0) {
    return false
  }

  return childEntries.every(([, value]) => {
    return isRecord(value) && "$value" in value
  })
}

const removeDirectLeafTypes = (tree: DtcgTokenTree): void => {
  for (const [key, value] of Object.entries(tree)) {
    if (
      DTCG_METADATA_KEYS.has(key) ||
      !isRecord(value) ||
      !("$value" in value)
    ) {
      continue
    }

    delete value.$type
  }
}

const orderDtcgGroupMetadata = (tree: DtcgTokenTree): DtcgTokenTree => {
  const orderedTree: DtcgTokenTree = {}

  if (tree.$type !== undefined) {
    orderedTree.$type = tree.$type
  }

  if (tree.$description !== undefined) {
    orderedTree.$description = tree.$description
  }

  if (tree.$deprecated !== undefined) {
    orderedTree.$deprecated = tree.$deprecated
  }

  for (const [key, value] of Object.entries(tree)) {
    if (DTCG_METADATA_KEYS.has(key)) {
      continue
    }

    orderedTree[key] = value
  }

  return orderedTree
}

/**
 * Applies DTCG group-level type inheritance and removes duplicated child types.
 */
export const applyTypesToGroups = (tree: DtcgTokenTree): DtcgTokenTree => {
  for (const [key, value] of Object.entries(tree)) {
    if (DTCG_METADATA_KEYS.has(key) || !isRecord(value) || "$value" in value) {
      continue
    }

    tree[key] = applyTypesToGroups(value)
  }

  if (tree.$type !== undefined) {
    removeDirectLeafTypes(tree)
    return orderDtcgGroupMetadata(tree)
  }

  const directLeafTypes = getDirectLeafTokenTypes(tree)
  const sharedTokenType = hasOnlyDirectLeafChildren(tree)
    ? getSharedTokenType(directLeafTypes)
    : undefined

  if (sharedTokenType === undefined) {
    return orderDtcgGroupMetadata(tree)
  }

  tree.$type = sharedTokenType
  removeDirectLeafTypes(tree)

  return orderDtcgGroupMetadata(tree)
}

/**
 * Serializes an authored token tree into a DTCG-compatible token tree.
 *
 * Unlike flattened generation, this preserves metadata on token branches.
 */
export const toDtcgTokenTree = (
  tree: TokenTree,
  options: Required<DtcgGeneratorOptions>,
  path: string[] = [],
): DtcgTokenTree => {
  const dtcgTree: DtcgTokenTree = {}

  for (const [key, value] of Object.entries(tree)) {
    if (isMetadataKey(key, options)) {
      if (isDtcgMetadataValue(value)) {
        dtcgTree[key] = value
      }

      continue
    }

    const childPath = [...path, key]

    if (isTokenLeafLike(value)) {
      dtcgTree[key] = toDtcgTokenLeafFromTokenLeaf(value, childPath, options)
      continue
    }

    if (isRecord(value)) {
      dtcgTree[key] = toDtcgTokenTree(value, options, childPath)
    }
  }

  return applyTypesToGroups(dtcgTree)
}

/**
 * Writes a DTCG token leaf into a nested JSON token tree.
 *
 * This remains available for legacy flattened-generation helpers and tests.
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
