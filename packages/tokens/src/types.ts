export interface TokenEntry {
  name: string
  value: string
}

export interface PrimitiveTokenGroup {
  name: string
  tokens: TokenEntry[]
}

export interface ComponentTokenGroup {
  component: string
  tokens: TokenEntry[]
}

export type StylePresetId = "default"

export type ThemeModeId = "light" | "dark"

export interface StylePresetDefinition {
  id: StylePresetId
  name: string
  description: string
  themeModes: ThemeModeId[]
}

export type ThemeTokenMap = Record<string, string>

export interface ThemeDefinition {
  name: ThemeModeId
  selector: ":root" | ".dark"
  colorScheme: ThemeModeId
  tokens: ThemeTokenMap
}

export interface StyleOutputs {
  tokensCss: string
  themeCss: string
}
