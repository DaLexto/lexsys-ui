/**
 * contrast.types.ts
 *
 * @layer validator
 * @description Type contracts for WCAG contrast validation (Phase 10).
 */

import type { TokenTree } from "../../../types"

export interface SemanticContrastPair {
  id: string
  label?: string
  foregroundPath: string
  backgroundPath: string
  minimumRatio?: number
}

export interface ContrastValidationThemeInput {
  name: string
  tokens: TokenTree
}

export interface ContrastValidationInput {
  foundationTokens: TokenTree
  componentTokens: TokenTree
  themeTokens: ContrastValidationThemeInput[]
  pairs?: SemanticContrastPair[]
}

export type ContrastIssueCode =
  | "RESOLVE_FAILED"
  | "UNPARSEABLE_COLOR"
  | "INSUFFICIENT_CONTRAST"

export interface ContrastIssue {
  code: ContrastIssueCode
  message: string
  pairId: string
  theme: string
  foregroundPath: string
  backgroundPath: string
  ratio?: number
  minimumRatio: number
}

export interface ContrastPairResult {
  pairId: string
  theme: string
  foregroundPath: string
  backgroundPath: string
  ratio: number | null
  minimumRatio: number
  passes: boolean
  issues: ContrastIssue[]
}

export interface ContrastValidationReport {
  pairs: ContrastPairResult[]
  issues: ContrastIssue[]
}
