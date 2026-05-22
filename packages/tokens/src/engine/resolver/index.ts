/**
 * index.ts
 *
 * @layer resolver
 * @description Public entry point for the token resolver subsystem.
 */

export {
  resolveReference,
  resolveTokenTree,
  resolveTokenTreeStrict,
  resolveTokenTreeSafe,
} from "./reference/reference.resolver"

export { resolveReferenceChain } from "./reference/reference-chain"

export type {
  ResolveReferenceResult,
  ResolveReferenceChainResult,
  ResolveTreeResult,
  ResolverError,
  ResolverErrorCode,
  ResolverOptions,
  ResolverWarning,
} from "./reference/reference.types"

export {
  collectLeafPaths,
  collectTokenGraphMetadata,
  collectTokenGraphReferences,
  collectUpperLayerReferences,
  collectUsedPrimitivePaths,
  expandReferencedPaths,
  findTransitiveDependents,
  referenceDependsOnTarget,
  stripDeadPrimitivesFromTree,
} from "./graph/graph.resolver"

export type {
  TokenGraphDependent,
  TokenGraphLayer,
  TokenGraphMetadata,
  TokenGraphReachabilityInput,
  TokenGraphReference,
  TokenGraphThemeInput,
} from "./graph/graph.types"

// Values pipeline (Phase 9)
export {
  resolveLeafValue,
  resolveLeafValues,
  resolveLeafValueForTheme,
  isResolvedColorValue,
  toContrastReadyColor,
} from "./values"

export type {
  ResolvedLeafValue,
  ResolveLeafResult,
  ResolveLeafValuesResult,
  ResolveValuesOptions,
  ContrastReadyColor,
} from "./values"
