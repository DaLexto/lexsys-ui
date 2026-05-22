/**
 * index.ts
 *
 * @layer governance
 * @description Public entry point for token governance reports.
 */

export {
  createTokenGovernanceReport,
  formatTokenGovernanceReport,
} from "./report/report.governance"

export {
  createSemanticAuditReport,
  formatSemanticAuditReport,
} from "./audit/audit.governance"

export type {
  DeadTokenEntry,
  DeprecationDependency,
  DeprecationReportEntry,
  TokenGovernanceInput,
  TokenGovernanceLayer,
  TokenGovernanceReport,
  TokenGovernanceThemeInput,
  TokenMetadataEntry,
} from "./shared/shared.governance.types"

export type {
  SemanticAuditIssue,
  SemanticAuditIssueKind,
  SemanticAuditReport,
} from "./audit/audit.types"
