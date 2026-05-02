/**
 * resolver.utils.ts
 *
 * @layer utilities
 * @description Shared helpers for token reference parsing, path access, guards,
 * and diagnostic object creation.
 *
 * @responsibility
 * - Provide type guards for token leaves and token trees
 * - Parse and validate strict token reference strings
 * - Read token nodes from dot-paths
 * - Create structured resolver errors and warnings
 *
 * @usage
 * - Used internally by the main token resolver engine
 *
 * @notes
 * - This file must remain generic and free of token-category-specific logic.
 * - Only strict full-string references such as "{color.gray.900}" are supported.
 * - Token leaves use the Neurex { value } authoring shape.
 */

import type {
  ResolverError,
  ResolverErrorCode,
  ResolverOptions,
  ResolverWarning,
} from "./resolver.types"

import type { TokenLeaf, TokenNode, TokenPrimitive, TokenTree } from "../types"

export const DEFAULT_RESOLVER_OPTIONS: ResolverOptions = {
  strict: true,
  maxDepth: 50,
}

export const STRICT_REFERENCE_PATTERN = /^\{([^{}]+)\}$/

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
 *
 * A token leaf must use:
 * {
 *   value: string | number | boolean | null
 * }
 */
export const isTokenLeaf = (value: unknown): value is TokenLeaf => {
  if (!isRecord(value)) {
    return false
  }

  return "value" in value && isTokenPrimitive(value.value)
}

/**
 * Returns true when the value is a token branch/tree.
 *
 * Important:
 * - Token leaves are objects too, so they must be excluded.
 * - Metadata-bearing groups may still be passed in, but metadata keys are handled
 *   by the caller or ignored during traversal where needed.
 */
export const isTokenTree = (value: unknown): value is TokenTree => {
  return isRecord(value) && !isTokenLeaf(value)
}

/**
 * Returns true only for strict reference strings like "{color.gray.900}".
 */
export const isReferenceString = (value: unknown): value is string => {
  return (
    typeof value === "string" && STRICT_REFERENCE_PATTERN.test(value.trim())
  )
}

/**
 * Joins a path array into a stable dot path.
 */
export const toPathString = (segments: string[]): string => {
  return segments.join(".")
}

/**
 * Extracts a target token path from a strict reference string.
 *
 * Example:
 * "{color.gray.900}" -> "color.gray.900"
 */
export const parseReference = (reference: string): string => {
  const normalizedReference = reference.trim()
  const match = normalizedReference.match(STRICT_REFERENCE_PATTERN)

  if (!match) {
    throw new Error(`Invalid token reference format: "${reference}"`)
  }

  const parsedPath = match[1]

  if (parsedPath === undefined) {
    throw new Error(`Invalid token reference capture group: "${reference}"`)
  }

  return parsedPath.trim()
}

/**
 * Safely reads a token node from a dot path.
 *
 * This returns:
 * - TokenLeaf when the path points to a token leaf
 * - TokenTree when the path points to a branch
 * - undefined when the path does not exist
 */
export const getNodeByPath = (
  root: TokenTree,
  path: string,
): TokenNode | undefined => {
  const segments = path.split(".").filter(Boolean)

  let current: unknown = root

  for (const segment of segments) {
    if (!isTokenTree(current)) {
      return undefined
    }

    const nextNode = current[segment]

    if (nextNode === undefined) {
      return undefined
    }

    current = nextNode
  }

  if (isTokenLeaf(current) || isTokenTree(current)) {
    return current
  }

  return undefined
}

/**
 * Creates a structured resolver error payload.
 */
export const createResolverError = (
  code: ResolverErrorCode,
  message: string,
  sourcePath: string,
  reference: string,
  chain: string[],
  targetPath?: string,
): ResolverError => {
  return {
    code,
    message,
    sourcePath,
    reference,
    targetPath,
    chain: [...chain],
  }
}

/**
 * Creates a structured resolver warning payload.
 */
export const createResolverWarning = (
  sourcePath: string,
  reference: string,
): ResolverWarning => {
  return {
    code: "UNRESOLVED_REFERENCE_LEFT_AS_IS",
    message: `Reference "${reference}" was left unresolved at "${sourcePath}"`,
    sourcePath,
    reference,
  }
}
