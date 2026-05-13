import type { StyleOutputs } from "../types"
import {
  createStyleTokenInput,
  validateStyleTokenInput,
  type ThemeTokenInput,
} from "./input"
import {
  createCssBlock,
  createCssVariableEntries,
  type CssVarsGeneratorOptions,
  generateJsonTokens,
} from "./outputs"
import { DEFAULT_GENERATOR_METADATA_KEYS } from "./shared/index.js"
import { defaultStyleOutputConfig } from "./style-output.config.js"

const styleOutputConfig = defaultStyleOutputConfig
const cssPrefix = styleOutputConfig.cssVarPrefix
const twPrefix = styleOutputConfig.tailwindPrefix

const cssVarsGeneratorOptions: Required<CssVarsGeneratorOptions> = {
  cssVarPrefix: cssPrefix,
  groupNameOverrides: styleOutputConfig.groupNameOverrides,
  metadataKeys: DEFAULT_GENERATOR_METADATA_KEYS,
}

const styleTokenInput = createStyleTokenInput()

const toCssVarReference = (tokenName: string): string => {
  return `var(--${cssPrefix}-${tokenName})`
}

const createTokensCss = (): string => {
  const entries = [
    ...createCssVariableEntries(
      styleTokenInput.foundationTokens,
      cssVarsGeneratorOptions,
    ),
    ...createCssVariableEntries(
      styleTokenInput.componentTokens,
      cssVarsGeneratorOptions,
    ),
  ]

  return `${styleOutputConfig.styleHeader}\n\n${createCssBlock(
    ":root",
    entries,
    cssVarsGeneratorOptions,
  )}\n`
}

const createTokensJson = (): string => {
  return generateJsonTokens(styleTokenInput.tokenTree).content
}

const createThemeBlock = (theme: ThemeTokenInput): string => {
  const entries = createCssVariableEntries(
    theme.tokens,
    cssVarsGeneratorOptions,
  )

  return createCssBlock(theme.selector, entries, cssVarsGeneratorOptions, [
    `color-scheme: ${theme.colorScheme};`,
  ])
}

const createTailwindThemeBlock = (): string => {
  const firstTheme = styleTokenInput.themeTokens[0]
  const semanticEntries =
    firstTheme === undefined
      ? []
      : createCssVariableEntries(firstTheme.tokens, cssVarsGeneratorOptions)

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
  const themeBlocks = styleTokenInput.themeTokens.map((theme) => {
    return createThemeBlock(theme)
  })

  return `${styleOutputConfig.styleHeader}\n\n${[
    ...themeBlocks,
    createTailwindThemeBlock(),
  ].join("\n\n")}\n`
}

export const createStyleOutputs = (): StyleOutputs => {
  validateStyleTokenInput(styleTokenInput)

  return {
    tokensCss: createTokensCss(),
    themeCss: createThemeCss(),
    tokensJson: createTokensJson(),
  }
}
