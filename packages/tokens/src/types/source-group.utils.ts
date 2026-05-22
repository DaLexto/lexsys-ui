/**
 * source-group.utils.ts
 *
 * @layer types
 * @description Helpers for reading token payloads from structured or legacy groups.
 */

import type {
  ComponentTokenGroup,
  BrandTokenGroup,
  PrimitiveTokenGroup,
  SemanticTokenGroup,
} from "./group.types"
import type { LegacyThemeDefinition, ThemeDefinition } from "./theme.types"
import type { TokenTree } from "./token.types"

export type TokenSourceGroup =
  | PrimitiveTokenGroup
  | BrandTokenGroup
  | SemanticTokenGroup
  | ComponentTokenGroup
  | ThemeDefinition

export const hasStructuredTokenPayload = (
  group: TokenSourceGroup,
): group is TokenSourceGroup & { tokens: TokenTree } => {
  return (
    "tokens" in group &&
    group.tokens !== undefined &&
    typeof group.tokens === "object"
  )
}

const getTokenGroupMetaValue = (
  group: TokenSourceGroup,
  key: string,
): string | undefined => {
  const { meta } = group as { meta?: unknown }

  if (typeof meta !== "object" || meta === null || !(key in meta)) {
    return undefined
  }

  const value = (meta as Record<string, unknown>)[key]

  return typeof value === "string" ? value : undefined
}

export const getTokenTreeFromSourceGroup = (
  group: TokenSourceGroup,
): TokenTree => {
  if (hasStructuredTokenPayload(group)) {
    return group.tokens
  }

  if ("selector" in group && "colorScheme" in group) {
    const legacyTheme = group as LegacyThemeDefinition
    const tokens: TokenTree = { ...legacyTheme }

    delete tokens.brand
    delete tokens.colorScheme
    delete tokens.name
    delete tokens.selector

    return tokens
  }

  if ("component" in group) {
    const tokens: TokenTree = { ...group }

    delete tokens.component

    return tokens
  }

  if ("name" in group) {
    const tokens: TokenTree = { ...group }

    delete tokens.name

    return tokens
  }

  return group
}

export const getNamedGroupNamespace = (
  group: PrimitiveTokenGroup | BrandTokenGroup | SemanticTokenGroup,
): string => {
  const metaName = getTokenGroupMetaValue(group, "name")

  if (metaName !== undefined) {
    return metaName
  }

  return (group as { name: string }).name
}

export const getComponentGroupNamespace = (
  group: ComponentTokenGroup,
): string => {
  const metaComponent = getTokenGroupMetaValue(group, "component")

  if (metaComponent !== undefined) {
    return metaComponent
  }

  return (group as { component: string }).component
}
