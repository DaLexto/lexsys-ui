/**
 * index.ts
 *
 * @layer resolver
 * @description Public entry point for the token resolver subsystem.
 *
 * @responsibility
 * - Expose resolver public API
 * - Expose resolver public types
 *
 * @notes
 * - Internal utilities are intentionally not exported.
 * - This file defines the resolver package boundary.
 */

export {
  resolveReference,
  resolveTokenTree,
  resolveTokenTreeStrict,
  resolveTokenTreeSafe,
} from "./resolver"

export type {
  ResolveReferenceResult,
  ResolveTreeResult,
  ResolverError,
  ResolverErrorCode,
  ResolverOptions,
  ResolverWarning,
} from "./resolver.types"
