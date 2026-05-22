/**
 * values.types.ts
 *
 * @layer resolver
 * @description Type contracts for the resolved leaf value pipeline (Phase 9).
 */

import type { TokenType, TokenValue } from "../../../types"
import type {
  ResolverError,
  ResolverOptions,
  ResolverWarning,
} from "../reference/reference.types"

export interface ResolveValuesOptions extends ResolverOptions {
  /**
   * When true, emit warnings when a resolved terminal value disagrees with the
   * leaf `$type`. Off by default until pair/type inventory exists.
   */
  validateTypeCompatibility?: boolean
}

/**
 * Terminal resolved value for one token leaf, including alias hop context.
 */
export interface ResolvedLeafValue {
  path: string
  value: TokenValue
  /** Dotted paths visited while following alias chains, in resolution order. */
  referenceChain: string[]
  $type?: TokenType
  $description?: string
}

export interface ResolveLeafResult {
  resolved: ResolvedLeafValue | null
  errors: ResolverError[]
  warnings: ResolverWarning[]
}

export interface ResolveLeafValuesResult {
  values: ResolvedLeafValue[]
  errors: ResolverError[]
  warnings: ResolverWarning[]
}
