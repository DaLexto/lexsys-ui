/**
 * audit.types.ts
 *
 * @layer governance
 * @description Type contracts for semantic token organization audits.
 */

import type { TokenGovernanceInput } from "../shared/shared.governance.types"

export type SemanticAuditIssueKind =
  | "unused-semantic"
  | "component-intent"
  | "theme-path-mismatch"

export type SemanticAuditIssueSeverity = "error" | "warning"

export interface SemanticAuditIssue {
  kind: SemanticAuditIssueKind
  severity: SemanticAuditIssueSeverity
  path: string
  message: string
  themeName?: string
}

export interface SemanticAuditReport {
  issues: SemanticAuditIssue[]
  semanticPathCount: number
  referencedSemanticPathCount: number
}

export type SemanticAuditInput = TokenGovernanceInput
