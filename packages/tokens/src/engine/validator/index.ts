/**
 * index.ts
 *
 * @layer validator
 * @description Public entry point for build-failing token validation.
 */

export {
  validateTokenLayerContracts,
  validateTokenLayerContractsStrict,
} from "./layers/layers.validator"

export type {
  LayerValidationInput,
  LayerValidationResult,
  LayerValidationThemeInput,
  LayerViolation,
  LayerViolationCode,
} from "./layers/layers.types"

export {
  createContrastValidationReport,
  DEFAULT_CONTRAST_POLICY,
  evaluateContrastPolicy,
  formatContrastValidationReport,
  resolveContrastPolicy,
  resolveContrastPolicyTier,
  resolvePairMinimumRatio,
  SEMANTIC_CONTRAST_PAIRS,
  shouldFailOnContrastPolicy,
  WCAG_AA_LARGE_TEXT_RATIO,
  WCAG_AA_NORMAL_TEXT_RATIO,
} from "./contrast"

export type {
  ContrastPolicy,
  ContrastPolicyTier,
  ContrastIssue,
  ContrastIssueCode,
  ContrastPairResult,
  ContrastValidationInput,
  ContrastValidationReport,
  ContrastValidationThemeInput,
  SemanticContrastPair,
} from "./contrast"
