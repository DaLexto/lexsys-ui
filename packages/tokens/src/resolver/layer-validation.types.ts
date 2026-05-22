/**
 * layer-validation.types.ts
 *
 * @layer resolver
 * @description Type contracts for token layer validation.
 */

import type { TokenTree } from "../types"

export type LayerViolationCode =
  | "COMPONENT_TO_PRIMITIVE"
  | "COMPONENT_TO_BRAND"
  | "COMPONENT_TO_THEME"
  | "SEMANTIC_TO_COMPONENT"
  | "THEME_TO_COMPONENT"
  | "BRAND_COMPONENT_INTENT"

export interface LayerViolation {
  code: LayerViolationCode
  message: string
  sourcePath: string
  reference: string
  targetPath: string
}

export interface LayerValidationResult {
  violations: LayerViolation[]
}

export interface LayerValidationThemeInput {
  name: string
  tokens: TokenTree
}

export interface LayerValidationInput {
  primitiveTokens: TokenTree
  brandTokens: TokenTree
  semanticTokens: TokenTree
  componentTokens: TokenTree
  themeTokens: LayerValidationThemeInput[]
}
