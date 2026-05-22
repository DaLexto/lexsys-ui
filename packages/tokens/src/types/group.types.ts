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
 * Legacy flat-mixed group: metadata keys live beside token branches.
 * Supported during migration; new authoring should use factories instead.
 */
export type LegacyNamedTokenGroup = TokenTree & NamedTokenGroupMeta

/**
 * Primitive token group.
 */
export type PrimitiveTokenGroup =
  | TokenGroupBase<NamedTokenGroupMeta>
  | LegacyNamedTokenGroup

/**
 * Semantic token group.
 */
export type SemanticTokenGroup =
  | TokenGroupBase<NamedTokenGroupMeta>
  | LegacyNamedTokenGroup

/**
 * Brand token group.
 */
export type BrandTokenGroup =
  | TokenGroupBase<NamedTokenGroupMeta>
  | LegacyNamedTokenGroup

/**
 * Legacy flat-mixed component group.
 */
export type LegacyComponentTokenGroup = TokenTree & ComponentTokenGroupMeta

/**
 * Component token group.
 */
export type ComponentTokenGroup =
  | TokenGroupBase<ComponentTokenGroupMeta>
  | LegacyComponentTokenGroup
