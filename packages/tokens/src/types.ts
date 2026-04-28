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

export type ThemeTokenMap = Record<string, string>

export interface ThemeDefinition {
  name: "light" | "dark"
  selector: ":root" | ".dark"
  colorScheme: "light" | "dark"
  tokens: ThemeTokenMap
}

export interface StyleOutputs {
  tokensCss: string
  themeCss: string
}
