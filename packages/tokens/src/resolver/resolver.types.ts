/**
 * resolver.types.ts
 *
 * @layer resolver
 * @description Type contracts for the token reference resolver.
 *
 * @responsibility
 * - Define resolver options
 * - Define resolver result objects
 * - Define structured diagnostics for errors and warnings
 *
 * @notes
 * - The resolver is output-agnostic.
 * - It must not know about CSS variables, Tailwind, or generated file formats.
 * - Token leaves use the DTCG-style { $value } authoring shape.
 */

import type { TokenTree, TokenValue } from "../types"

/* -------------------------------------------------------------------------------------------------
 * Options
 * ------------------------------------------------------------------------------------------------- */

export interface ResolverOptions {
  /**
   * When true, unresolved or invalid references are returned as errors.
   * When false, unresolved references may be left as-is with warnings.
   */
  strict?: boolean

  /**
   * Maximum allowed reference depth before the resolver reports a depth error.
   */
  maxDepth?: number
}

/* -------------------------------------------------------------------------------------------------
 * Diagnostics
 * ------------------------------------------------------------------------------------------------- */

export type ResolverErrorCode =
  | "INVALID_REFERENCE_FORMAT"
  | "MISSING_REFERENCE"
  | "REFERENCE_POINTS_TO_BRANCH"
  | "CIRCULAR_REFERENCE"
  | "MAX_DEPTH_EXCEEDED"
  | "INVALID_TOKEN_LEAF"

export interface ResolverError {
  code: ResolverErrorCode
  message: string
  sourcePath: string
  reference: string
  targetPath?: string
  chain: string[]
}

export interface ResolverWarning {
  code: "UNRESOLVED_REFERENCE_LEFT_AS_IS"
  message: string
  sourcePath: string
  reference: string
}

/* -------------------------------------------------------------------------------------------------
 * Results
 * ------------------------------------------------------------------------------------------------- */

export interface ResolveReferenceResult {
  value: TokenValue
  errors: ResolverError[]
  warnings: ResolverWarning[]
}

export interface ResolveTreeResult {
  tree: TokenTree
  errors: ResolverError[]
  warnings: ResolverWarning[]
}
