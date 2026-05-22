/**
 * authoring.ts
 *
 * @layer types
 * @description Factory helpers for source token group authoring.
 */

import type {
  BrandTokenGroup,
  ComponentTokenGroup,
  PrimitiveTokenGroup,
  SemanticTokenGroup,
} from "./group.types"
import type { ThemeConfig, ThemeDefinition } from "./theme.types"
import type { TokenTree } from "./token.types"

export const primitiveTokens = (
  name: string,
  tokens: TokenTree,
): PrimitiveTokenGroup => {
  return {
    meta: { name },
    tokens,
  }
}

export const brandTokens = (
  name: string,
  tokens: TokenTree,
): BrandTokenGroup => {
  return {
    meta: { name },
    tokens,
  }
}

export const semanticTokens = (
  name: string,
  tokens: TokenTree,
): SemanticTokenGroup => {
  return {
    meta: { name },
    tokens,
  }
}

export const componentTokens = (
  component: string,
  tokens: TokenTree,
): ComponentTokenGroup => {
  return {
    meta: { component },
    tokens,
  }
}

export const themeTokens = (
  config: ThemeConfig,
  tokens: TokenTree,
): ThemeDefinition => {
  return {
    ...config,
    tokens,
  }
}
