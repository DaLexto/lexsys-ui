/**
 * group.types.ts
 *
 * @layer types
 * @description Token group contracts for primitive, brand, semantic, and component tokens.
 */

import type { TokenTree } from "./token.types"

/**
 * Factory-authored token group with explicit metadata and token payload.
 */
export interface TokenGroupBase<TMeta extends Record<string, string>> {
  meta: TMeta
  tokens: TokenTree
}

export type NamedTokenGroupMeta = {
  name: string
}

export type ComponentTokenGroupMeta = {
  component: string
}

/**
 * Primitive token group.
 */
export type PrimitiveTokenGroup = TokenGroupBase<NamedTokenGroupMeta>

/**
 * Semantic token group.
 */
export type SemanticTokenGroup = TokenGroupBase<NamedTokenGroupMeta>

/**
 * Brand token group.
 */
export type BrandTokenGroup = TokenGroupBase<NamedTokenGroupMeta>

/**
 * Component token group.
 */
export type ComponentTokenGroup = TokenGroupBase<ComponentTokenGroupMeta>
