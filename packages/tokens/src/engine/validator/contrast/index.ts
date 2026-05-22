/**
 * index.ts
 *
 * @layer validator
 * @description Public entry point for contrast validation (Phase 10).
 */

export {
  createContrastValidationReport,
  formatContrastValidationReport,
} from "./contrast.validator"

export {
  SEMANTIC_CONTRAST_PAIRS,
  WCAG_AA_NORMAL_TEXT_RATIO,
} from "./contrast.pairs"

export {
  DEFAULT_CONTRAST_POLICY,
  evaluateContrastPolicy,
  resolveContrastPolicy,
  resolveContrastPolicyTier,
  resolvePairMinimumRatio,
  shouldFailOnContrastPolicy,
  WCAG_AA_LARGE_TEXT_RATIO,
} from "./contrast.policy"

export type { ContrastPolicy, ContrastPolicyTier } from "./contrast.policy"

export type {
  ContrastIssue,
  ContrastIssueCode,
  ContrastPairResult,
  ContrastValidationInput,
  ContrastValidationReport,
  ContrastValidationThemeInput,
  SemanticContrastPair,
} from "./contrast.types"
