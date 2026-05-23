/**
 * graph.types.ts
 *
 * @layer resolver
 * @description Type contracts for token graph traversal.
 */

import type { TokenTree } from "../../../types"

export type TokenGraphLayer =
  | "primitive"
  | "brand"
  | "semantic"
  | "component"
  | "theme"

export interface TokenGraphThemeInput {
  name: string
  tokens: TokenTree
}

export interface TokenGraphReachabilityInput {
  primitiveTokens: TokenTree
  brandTokens: TokenTree
  semanticTokens: TokenTree
  componentTokens: TokenTree
  foundationTokens: TokenTree
  themeTokens: TokenGraphThemeInput[]
}

export interface TokenGraphReference {
  layer: TokenGraphLayer
  sourcePath: string
  reference: string
  targetPath: string
  themeName?: string
}

export interface TokenGraphMetadata {
  layer: TokenGraphLayer
  path: string
  description?: string
  deprecated?: boolean | string
  themeName?: string
}

export interface TokenGraphDependent {
  layer: TokenGraphLayer
  sourcePath: string
  themeName?: string
}
