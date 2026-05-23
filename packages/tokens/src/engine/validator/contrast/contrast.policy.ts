/**
 * contrast.policy.ts
 *
 * @layer validator
 * @description Central contrast thresholds and CI/build enforcement tiers.
 */

import { WCAG_AA_NORMAL_TEXT_RATIO } from "./contrast.pairs"
import type {
  ContrastIssue,
  ContrastIssueCode,
  ContrastValidationReport,
  SemanticContrastPair,
} from "./contrast.types"

export type ContrastPolicyTier = "report" | "ci" | "build"

export const WCAG_AA_LARGE_TEXT_RATIO = 3

export interface ContrastPolicy {
  tier: ContrastPolicyTier
  defaultMinimumRatio: number
  largeTextMinimumRatio: number
  allowedIssueCodes: ContrastIssueCode[]
}

export const DEFAULT_CONTRAST_POLICY: ContrastPolicy = {
  tier: "ci",
  defaultMinimumRatio: WCAG_AA_NORMAL_TEXT_RATIO,
  largeTextMinimumRatio: WCAG_AA_LARGE_TEXT_RATIO,
  allowedIssueCodes: [
    "RESOLVE_FAILED",
    "UNPARSEABLE_COLOR",
    "INSUFFICIENT_CONTRAST",
  ],
}

const CONTRAST_POLICY_ENV = "NEUREX_CONTRAST_POLICY"

export const resolveContrastPolicyTier = (): ContrastPolicyTier => {
  const raw = process.env[CONTRAST_POLICY_ENV]?.trim().toLowerCase()

  if (raw === "report" || raw === "ci" || raw === "build") {
    return raw
  }

  return DEFAULT_CONTRAST_POLICY.tier
}

export const resolveContrastPolicy = (
  overrides?: Partial<ContrastPolicy>,
): ContrastPolicy => {
  return {
    ...DEFAULT_CONTRAST_POLICY,
    tier: resolveContrastPolicyTier(),
    ...overrides,
  }
}

export const resolvePairMinimumRatio = (
  pair: SemanticContrastPair,
  policy: ContrastPolicy = DEFAULT_CONTRAST_POLICY,
): number => {
  if (pair.minimumRatio !== undefined) {
    return pair.minimumRatio
  }

  if (pair.textSize === "large") {
    return policy.largeTextMinimumRatio
  }

  return policy.defaultMinimumRatio
}

export const evaluateContrastPolicy = (
  report: ContrastValidationReport,
  policy: ContrastPolicy = DEFAULT_CONTRAST_POLICY,
): { passes: boolean; failures: ContrastIssue[] } => {
  const failures = report.issues.filter((issue) => {
    return policy.allowedIssueCodes.includes(issue.code)
  })

  return {
    passes: failures.length === 0,
    failures,
  }
}

export const shouldFailOnContrastPolicy = (policy: ContrastPolicy): boolean => {
  return policy.tier === "ci" || policy.tier === "build"
}

export const shouldEnforceContrastInStyleValidation = (): boolean => {
  return resolveContrastPolicyTier() !== "report"
}

export const resolveBuildContrastPolicy = (): ContrastPolicy => {
  return resolveContrastPolicy({ tier: "build" })
}

export const formatContrastPolicyFailures = (
  failures: ContrastIssue[],
): string => {
  if (failures.length === 0) {
    return ""
  }

  const lines = failures.map((issue) => {
    return `- [${issue.code}] ${issue.theme}/${issue.pairId}: ${issue.message}`
  })

  return `Contrast policy validation failed:\n${lines.join("\n")}`
}
