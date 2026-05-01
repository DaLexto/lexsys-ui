export interface TokenEntry {
  name: string
  value: string
}

export interface TokenLeaf {
  value: string
}

export type TokenGroupProperty = string | TokenLeaf | TokenTree

export interface TokenTree {
  [key: string]: TokenLeaf | TokenTree
}

export interface PrimitiveTokenGroup {
  name: string
  [key: string]: TokenGroupProperty
}

export interface ComponentTokenGroup {
  component: string
  [key: string]: TokenGroupProperty
}

export interface SemanticTokenGroup {
  name: string
  [key: string]: TokenGroupProperty
}

export type StylePresetId = "default"

export type ThemeModeId = "light" | "dark"

export interface StylePresetDefinition {
  id: StylePresetId
  name: string
  description: string
  themeModes: ThemeModeId[]
}

export interface ThemeDefinition {
  name: ThemeModeId
  selector: ":root" | ".dark"
  colorScheme: ThemeModeId
  [key: string]: ThemeModeId | ":root" | ".dark" | TokenTree
}

export type ThemeTokenMap = TokenTree

export interface StyleOutputs {
  tokensCss: string
  themeCss: string
}
