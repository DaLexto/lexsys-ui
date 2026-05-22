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
  formatContrastValidationReport,
  SEMANTIC_CONTRAST_PAIRS,
  WCAG_AA_NORMAL_TEXT_RATIO,
} from "./contrast"

export type {
  ContrastIssue,
  ContrastIssueCode,
  ContrastPairResult,
  ContrastValidationInput,
  ContrastValidationReport,
  ContrastValidationThemeInput,
  SemanticContrastPair,
} from "./contrast"
