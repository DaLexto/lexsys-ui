/**
 * theme.types.ts
 *
 * @layer types
 * @description Brand, preset, theme, and theme token map contracts.
 */

import type { TokenTree } from "./token.types"

export type PresetId = "neurex" | (string & {})
export type BrandId = "neurex" | (string & {})

export type ThemeModeId = "light" | "dark"

export interface PresetDefinition<
  TThemeModes extends readonly ThemeModeId[] = readonly ThemeModeId[],
> {
  id: PresetId
  name: string
  description: string
  themeModes: TThemeModes
  defaultTheme: TThemeModes[number]
  brand?: BrandId
}

export interface ThemeConfig {
  name: ThemeModeId
  brand?: BrandId
  selector: ":root" | `.${string}` | `[${string}]`
  colorScheme: ThemeModeId
}

/**
 * Structured theme definition with explicit token override payload.
 */
export interface ThemeDefinitionStructured extends ThemeConfig {
  tokens: TokenTree
}

/**
 * Legacy flat-mixed theme definition.
 */
export type LegacyThemeDefinition = ThemeConfig & TokenTree

/**
 * Theme definition for a single mode override set.
 */
export type ThemeDefinition = ThemeDefinitionStructured | LegacyThemeDefinition

export type ThemeTokenMap = TokenTree
