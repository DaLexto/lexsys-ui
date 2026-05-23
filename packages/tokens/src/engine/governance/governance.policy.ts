/**
 * governance.policy.ts
 *
 * @layer governance
 * @description Central governance report enforcement tiers for semantic audit failures.
 */

import type {
  SemanticAuditIssue,
  SemanticAuditReport,
} from "./audit/audit.types"

export type GovernancePolicyTier = "report" | "ci"

export interface GovernancePolicy {
  tier: GovernancePolicyTier
}

export const DEFAULT_GOVERNANCE_POLICY: GovernancePolicy = {
  tier: "ci",
}

const GOVERNANCE_POLICY_ENV = "NEUREX_GOVERNANCE_POLICY"

export const resolveGovernancePolicyTier = (): GovernancePolicyTier => {
  const raw = process.env[GOVERNANCE_POLICY_ENV]?.trim().toLowerCase()

  if (raw === "report" || raw === "ci") {
    return raw
  }

  return DEFAULT_GOVERNANCE_POLICY.tier
}

export const resolveGovernancePolicy = (
  overrides?: Partial<GovernancePolicy>,
): GovernancePolicy => {
  return {
    ...DEFAULT_GOVERNANCE_POLICY,
    tier: resolveGovernancePolicyTier(),
    ...overrides,
  }
}

export const evaluateSemanticAuditPolicy = (
  report: SemanticAuditReport,
): { passes: boolean; failures: SemanticAuditIssue[] } => {
  const failures = report.issues.filter((issue) => {
    return issue.severity === "error"
  })

  return {
    passes: failures.length === 0,
    failures,
  }
}

export const shouldFailOnGovernancePolicy = (
  policy: GovernancePolicy,
): boolean => {
  return policy.tier === "ci"
}

export const formatSemanticAuditPolicyFailures = (
  failures: SemanticAuditIssue[],
): string => {
  if (failures.length === 0) {
    return ""
  }

  const lines = failures.map((issue) => {
    const themeSuffix =
      issue.themeName === undefined ? "" : ` [theme: ${issue.themeName}]`
    return `- [${issue.kind}] ${issue.path}${themeSuffix}: ${issue.message}`
  })

  return `Semantic audit policy validation failed:\n${lines.join("\n")}`
}
