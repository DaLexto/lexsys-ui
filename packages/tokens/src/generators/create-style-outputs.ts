import type { StyleOutputs } from "../types"
import {
  createStyleTokenInput,
  validateStyleTokenInput,
  type StyleTokenInput,
  type StyleTokenInputOptions,
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

const toCssVarReference = (tokenName: string): string => {
  return `var(--${cssPrefix}-${tokenName})`
}

const createTokensCss = (input: StyleTokenInput): string => {
  const entries = [
    ...createCssVariableEntries(
      input.foundationTokens,
      cssVarsGeneratorOptions,
    ),
    ...createCssVariableEntries(input.componentTokens, cssVarsGeneratorOptions),
  ]

  return `${styleOutputConfig.styleHeader}\n\n${createCssBlock(
    ":root",
    entries,
    cssVarsGeneratorOptions,
  )}\n`
}

const createTokensJson = (input: StyleTokenInput): string => {
  return generateJsonTokens(input.tokenTree).content
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

const createTailwindThemeBlock = (input: StyleTokenInput): string => {
  const firstTheme = input.themeTokens[0]
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

const createThemeCss = (input: StyleTokenInput): string => {
  const themeBlocks = input.themeTokens.map((theme) => {
    return createThemeBlock(theme)
  })

  return `${styleOutputConfig.styleHeader}\n\n${[
    ...themeBlocks,
    createTailwindThemeBlock(input),
  ].join("\n\n")}\n`
}

export const createStyleOutputs = (
  options: StyleTokenInputOptions = {},
): StyleOutputs => {
  const input = createStyleTokenInput(options)

  validateStyleTokenInput(input)

  return {
    tokensCss: createTokensCss(input),
    themeCss: createThemeCss(input),
    tokensJson: createTokensJson(input),
  }
}
