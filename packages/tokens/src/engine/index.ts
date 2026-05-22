/**
 * index.ts
 *
 * @layer engine
 * @description Token engine boundary: resolver, validator, and governance domains.
 */

// Resolver + graph
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
  resolveLeafValue,
  resolveLeafValues,
  resolveLeafValueForTheme,
  isResolvedColorValue,
  toContrastReadyColor,
} from "./resolver"

export type {
  ResolveReferenceResult,
  ResolveReferenceChainResult,
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

// Shared tree utilities
export {
  collectReferenceUsages,
  createThemedTokenTree,
  mergeTokenTrees,
  walkTokenTree,
} from "./shared"

export type {
  ThemedTokenTreeOverlay,
  ThemedTokenTreeSource,
  TokenReferenceUsage,
  WalkTokenTreeOptions,
} from "./shared"

// Composite
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

export type {
  ResolvedLeafValue,
  ResolveLeafResult,
  ResolveLeafValuesResult,
  ResolveValuesOptions,
  ContrastReadyColor,
} from "./resolver/values"

// Validator
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
  ContrastIssue,
  ContrastIssueCode,
  ContrastPairResult,
  ContrastValidationInput,
  ContrastValidationReport,
  ContrastValidationThemeInput,
  SemanticContrastPair,
} from "./validator"

export {
  createContrastValidationReport,
  formatContrastValidationReport,
  SEMANTIC_CONTRAST_PAIRS,
  WCAG_AA_NORMAL_TEXT_RATIO,
} from "./validator"

// Governance
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
