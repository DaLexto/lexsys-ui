/**
 * index.ts
 *
 * @layer engine
 * @description Token engine boundary: resolver, validator, and governance domains.
 */

export {
  resolveReference,
  resolveTokenTree,
  resolveTokenTreeStrict,
  resolveTokenTreeSafe,
  collectLeafPaths,
  collectTokenGraphMetadata,
  collectTokenGraphReferences,
  collectUpperLayerReferences,
  collectUsedPrimitivePaths,
  expandReferencedPaths,
  findTransitiveDependents,
  referenceDependsOnTarget,
  stripDeadPrimitivesFromTree,
} from "./resolver"

export type {
  ResolveReferenceResult,
  ResolveTreeResult,
  ResolverError,
  ResolverErrorCode,
  ResolverOptions,
  ResolverWarning,
  TokenGraphDependent,
  TokenGraphLayer,
  TokenGraphMetadata,
  TokenGraphReachabilityInput,
  TokenGraphReference,
  TokenGraphThemeInput,
} from "./resolver"

export {
  collectCompositeAtomicPaths,
  getCompositeBranchInfo,
  isCompositeBranch,
  isImplementedCompositeType,
  normalizeCompositeBranches,
  resolveCompositeSlotType,
  COMPOSITE_TYPE_REGISTRY,
  TYPOGRAPHY_COMPOSITE_DEFINITION,
  TYPOGRAPHY_COMPOSITE_SLOTS,
} from "./composite"

export type {
  CompositeAtomicPath,
  CompositeBranchInfo,
  CompositeSlotSchema,
  CompositeTypeDefinition,
} from "./composite"

export {
  validateTokenLayerContracts,
  validateTokenLayerContractsStrict,
} from "./validator"

export type {
  LayerValidationInput,
  LayerValidationResult,
  LayerValidationThemeInput,
  LayerViolation,
  LayerViolationCode,
} from "./validator"

export {
  createTokenGovernanceReport,
  formatTokenGovernanceReport,
  createSemanticAuditReport,
  formatSemanticAuditReport,
} from "./governance"

export type {
  DeadTokenEntry,
  DeprecationDependency,
  DeprecationReportEntry,
  TokenGovernanceInput,
  TokenGovernanceLayer,
  TokenGovernanceReport,
  TokenGovernanceThemeInput,
  TokenMetadataEntry,
  SemanticAuditIssue,
  SemanticAuditIssueKind,
  SemanticAuditReport,
} from "./governance"
