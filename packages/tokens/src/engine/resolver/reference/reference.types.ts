/**
 * reference.types.ts
 *
 * @layer resolver
 * @description Type contracts for the token reference resolver.
 */

import type { TokenTree, TokenValue } from "../../../types"

export interface ResolverOptions {
  strict?: boolean
  maxDepth?: number
}

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
