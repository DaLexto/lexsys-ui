/**
 * source-group.utils.ts
 *
 * @layer types
 * @description Helpers for reading token payloads from factory-authored source groups.
 */

import type {
  ComponentTokenGroup,
  BrandTokenGroup,
  PrimitiveTokenGroup,
  SemanticTokenGroup,
} from "./group.types"
import type { ThemeDefinition } from "./theme.types"
import type { TokenTree } from "./token.types"

export type TokenSourceGroup =
  | PrimitiveTokenGroup
  | BrandTokenGroup
  | SemanticTokenGroup
  | ComponentTokenGroup
  | ThemeDefinition

export const getTokenTreeFromSourceGroup = (
  group: TokenSourceGroup,
): TokenTree => {
  return group.tokens
}

export const getNamedGroupNamespace = (
  group: PrimitiveTokenGroup | BrandTokenGroup | SemanticTokenGroup,
): string => {
  return group.meta.name
}

export const getComponentGroupNamespace = (
  group: ComponentTokenGroup,
): string => {
  return group.meta.component
}
