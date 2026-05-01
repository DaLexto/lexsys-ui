import { componentTokens } from "../components"
import { primitiveTokens } from "../primitives"
import { semanticTokens } from "../semantics"
import { themes } from "../themes"
import type {
  ComponentTokenGroup,
  PrimitiveTokenGroup,
  SemanticTokenGroup,
  StyleOutputs,
  ThemeDefinition,
  TokenTree,
} from "../types"
import {
  createCssBlock,
  createCssVariableEntries,
  type CssVariableEntry,
  type CssVarsGeneratorOptions,
} from "./css-vars"
import { defaultStyleOutputConfig } from "./output-config.js"

const styleOutputConfig = defaultStyleOutputConfig
const cssPrefix = styleOutputConfig.cssVarPrefix
const twPrefix = styleOutputConfig.tailwindPrefix

const tokenGroupMetadataKeys = new Set([
  "name",
  "component",
  "selector",
  "colorScheme",
])

const cssVarsGeneratorOptions: Required<CssVarsGeneratorOptions> = {
  cssVarPrefix: cssPrefix,
  groupNameOverrides: styleOutputConfig.groupNameOverrides,
  metadataKeys: tokenGroupMetadataKeys,
}

const getTokenTree = (
  group:
    | PrimitiveTokenGroup
    | SemanticTokenGroup
    | ComponentTokenGroup
    | ThemeDefinition,
): TokenTree => {
  return Object.fromEntries(
    Object.entries(group).filter(([key]) => !tokenGroupMetadataKeys.has(key)),
  ) as TokenTree
}

const toCssVarReference = (tokenName: string): string => {
  return `var(--${cssPrefix}-${tokenName})`
}

const createEntriesFromPrimitiveGroups = (): CssVariableEntry[] => {
  return primitiveTokens.flatMap((group) => {
    return createCssVariableEntries(
      getTokenTree(group),
      cssVarsGeneratorOptions,
      [group.name],
    )
  })
}

const createEntriesFromSemanticGroups = (): CssVariableEntry[] => {
  return semanticTokens.flatMap((group) => {
    return createCssVariableEntries(
      getTokenTree(group),
      cssVarsGeneratorOptions,
      [group.name],
    )
  })
}

const createEntriesFromComponentGroups = (): CssVariableEntry[] => {
  return componentTokens.flatMap((group) => {
    return createCssVariableEntries(
      getTokenTree(group),
      cssVarsGeneratorOptions,
      [group.component],
    )
  })
}

const createTokensCss = (): string => {
  const entries = [
    ...createEntriesFromPrimitiveGroups(),
    ...createEntriesFromSemanticGroups(),
    ...createEntriesFromComponentGroups(),
  ]

  return `${styleOutputConfig.styleHeader}\n\n${createCssBlock(
    ":root",
    entries,
    cssVarsGeneratorOptions,
  )}\n`
}

const createThemeBlock = (theme: ThemeDefinition): string => {
  const entries = createCssVariableEntries(
    getTokenTree(theme),
    cssVarsGeneratorOptions,
  )

  return createCssBlock(theme.selector, entries, cssVarsGeneratorOptions, [
    `color-scheme: ${theme.colorScheme};`,
  ])
}

const createTailwindThemeBlock = (): string => {
  const firstTheme = themes[0]
  const semanticEntries =
    firstTheme === undefined
      ? []
      : createCssVariableEntries(getTokenTree(firstTheme), cssVarsGeneratorOptions)

  const colorLines = semanticEntries.map((entry) => {
    const tailwindName = entry.name.replace(/^color-/, `color-${twPrefix}-`)

    return `  --${tailwindName}: ${toCssVarReference(entry.name)};`
  })

  const radiusLines = ["sm", "md", "lg", "xl", "full"].map((name) => {
    return `  --radius-${twPrefix}-${name}: ${toCssVarReference(`radius-${name}`)};`
  })

  return ["@theme inline {", ...colorLines, ...radiusLines, "}"].join("\n")
}

const createThemeCss = (): string => {
  const themeBlocks = themes.map((theme) => {
    return createThemeBlock(theme)
  })

  return `${styleOutputConfig.styleHeader}\n\n${[
    ...themeBlocks,
    createTailwindThemeBlock(),
  ].join("\n\n")}\n`
}

export const createStyleOutputs = (): StyleOutputs => {
  return {
    tokensCss: createTokensCss(),
    themeCss: createThemeCss(),
  }
}