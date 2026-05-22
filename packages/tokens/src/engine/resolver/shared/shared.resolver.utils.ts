/**
 * shared.resolver.utils.ts
 *
 * @layer resolver
 * @description Shared helpers for token reference parsing, path access, and guards.
 */

import type {
  ResolverError,
  ResolverErrorCode,
  ResolverOptions,
  ResolverWarning,
} from "../reference/reference.types"
import type {
  TokenLeaf,
  TokenNode,
  TokenScalarValue,
  TokenTree,
  TokenValue,
} from "../../../types"

export const DEFAULT_RESOLVER_OPTIONS: ResolverOptions = {
  strict: true,
  maxDepth: 50,
}

export const STRICT_REFERENCE_PATTERN = /^\{([^{}]+)\}$/

const TOKEN_METADATA_KEYS = new Set([
  "$description",
  "$deprecated",
  "$extensions",
  "$type",
])

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export const isTokenScalarValue = (
  value: unknown,
): value is TokenScalarValue => {
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

export const isTokenValue = (value: unknown): value is TokenValue => {
  return (
    isTokenScalarValue(value) ||
    isTokenUnitValue(value) ||
    isTokenColorValue(value)
  )
}

export const isTokenLeaf = (value: unknown): value is TokenLeaf => {
  if (!isRecord(value)) return false
  return "$value" in value && isTokenValue(value["$value"])
}

export const isTokenTree = (value: unknown): value is TokenTree => {
  return isRecord(value) && !isTokenLeaf(value)
}

export const isReferenceString = (value: unknown): value is string => {
  return (
    typeof value === "string" && STRICT_REFERENCE_PATTERN.test(value.trim())
  )
}

export const toPathString = (segments: string[]): string => {
  return segments.join(".")
}

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

export const isTokenMetadataKey = (key: string): boolean => {
  return TOKEN_METADATA_KEYS.has(key)
}
