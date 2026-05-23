/**
 * shared.governance.types.ts
 *
 * @layer governance
 * @description Type contracts for token governance reports.
 */

import type { TokenTree } from "../../../types"

export type TokenGovernanceLayer =
  | "primitive"
  | "brand"
  | "semantic"
  | "component"
  | "theme"

export interface TokenGovernanceThemeInput {
  name: string
  tokens: TokenTree
}

export interface TokenGovernanceInput {
  primitiveTokens: TokenTree
  brandTokens: TokenTree
  semanticTokens: TokenTree
  componentTokens: TokenTree
  foundationTokens: TokenTree
  themeTokens: TokenGovernanceThemeInput[]
}

export interface TokenMetadataEntry {
  path: string
  layer: TokenGovernanceLayer
  themeName?: string
  description?: string
  deprecated?: boolean | string
  dependents?: DeprecationDependency[]
}

export interface DeprecationDependency {
  layer: TokenGovernanceLayer
  sourcePath: string
  themeName?: string
}

export interface DeprecationReportEntry {
  path: string
  layer: TokenGovernanceLayer
  themeName?: string
  deprecated: boolean | string
  dependents: DeprecationDependency[]
}

export interface DeadTokenEntry {
  path: string
}

export interface TokenGovernanceReport {
  metadata: TokenMetadataEntry[]
  deprecations: DeprecationReportEntry[]
  deadTokens: DeadTokenEntry[]
}
