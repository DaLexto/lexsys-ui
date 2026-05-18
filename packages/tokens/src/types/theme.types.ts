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

export interface PresetDefinition {
  id: PresetId
  name: string
  description: string
  themeModes: ThemeModeId[]
  defaultTheme: ThemeModeId
  brand?: BrandId
}

export interface ThemeDefinition {
  name: ThemeModeId
  brand?: BrandId
  selector: ":root" | `.${string}` | `[${string}]`
  colorScheme: ThemeModeId
  [key: string]: unknown
}

export type ThemeTokenMap = TokenTree
