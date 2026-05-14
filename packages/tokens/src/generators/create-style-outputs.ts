import type { StyleOutputs } from "../types"
import type { TokenTree } from "../types/index.js"
import {
  createDtcgThemeTokenInputFromJson,
  createDtcgTokenInputFromJson,
  createStyleTokenInput,
  mergeTokenTrees,
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

const tailwindNamespaceBySourcePrefix: Readonly<Record<string, string>> = {
  color: "color",
  duration: "duration",
  easing: "ease",
  radius: "radius",
  size: "spacing",
  space: "spacing",
  typography: "text",
}

const createTailwindThemeVariableName = (tokenName: string): string => {
  const [sourcePrefix, ...tailwindNameParts] = tokenName.split("-")

  if (sourcePrefix === undefined || tailwindNameParts.length === 0) {
    return `--${twPrefix}-${tokenName}`
  }

  const tailwindNamespace = tailwindNamespaceBySourcePrefix[sourcePrefix]

  if (tailwindNamespace === undefined) {
    return `--${twPrefix}-${tokenName}`
  }

  return `--${tailwindNamespace}-${twPrefix}-${tailwindNameParts.join("-")}`
}

const getTailwindBaseTheme = (input: StyleTokenInput): ThemeTokenInput => {
  const lightTheme = input.themeTokens.find((theme) => {
    return theme.name === "light"
  })

  if (lightTheme === undefined) {
    throw new Error("Tailwind @theme generation requires a light theme.")
  }

  return lightTheme
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

const createTokensCssFromTokenTree = (
  tokenTree: StyleTokenInput["tokenTree"],
) => {
  const entries = createCssVariableEntries(tokenTree, cssVarsGeneratorOptions)

  return `${styleOutputConfig.styleHeader}\n\n${createCssBlock(
    ":root",
    entries,
    cssVarsGeneratorOptions,
  )}\n`
}

const createTokenDocument = (
  tokenTree: TokenTree,
  input: StyleTokenInput,
  tokenSetOrder: string[],
): string => {
  return generateJsonTokens(tokenTree, {
    metadataKeys: new Set(),
    metadata: {
      generatedBy: "@neurex/tokens",
      presetId: input.preset.id,
      presetName: input.preset.name,
      tokenSetOrder,
    },
  }).content
}

const createPresetDocumentTree = (input: StyleTokenInput): TokenTree => {
  return {
    [input.preset.id]: {
      id: { $value: input.preset.id, $type: "string" },
      name: { $value: input.preset.name, $type: "string" },
      ...(input.preset.brand === undefined
        ? {}
        : { brand: { $value: input.preset.brand, $type: "string" } }),
      themeModes: Object.fromEntries(
        input.preset.themeModes.map((themeMode) => {
          return [themeMode, { $value: themeMode, $type: "string" }]
        }),
      ),
    },
  }
}

const createMergedTokenDocumentTree = (input: StyleTokenInput): TokenTree => {
  return {
    primitives: input.primitiveTokens,
    brand: input.brandTokens,
    semantics: input.semanticTokens,
    components: input.componentTokens,
    themes: {
      [input.preset.brand ?? input.preset.id]: Object.fromEntries(
        input.themeTokens.map((theme) => {
          return [theme.name, theme.tokens]
        }),
      ),
    },
    presets: createPresetDocumentTree(input),
  }
}

const createTokensJson = (input: StyleTokenInput): string => {
  return createTokenDocument(createMergedTokenDocumentTree(input), input, [
    "primitives",
    "brand",
    "semantics",
    "components",
    "themes",
    "presets",
  ])
}

const createThemeTokenDocument = (
  input: StyleTokenInput,
  theme: ThemeTokenInput,
): string => {
  return generateJsonTokens(theme.tokens, {
    metadataKeys: new Set(),
    metadata: {
      generatedBy: "@neurex/tokens",
      presetId: input.preset.id,
      presetName: input.preset.name,
      tokenSetOrder: ["themes"],
      themes: [
        {
          name: theme.name,
          ...(theme.brand === undefined ? {} : { brand: theme.brand }),
          selector: theme.selector,
          colorScheme: theme.colorScheme,
        },
      ],
    },
  }).content
}

const createTokenJsonFiles = (
  input: StyleTokenInput,
): Record<string, string> => {
  const files: Record<string, string> = {
    "tokens/primitives.tokens.json": createTokenDocument(
      input.primitiveTokens,
      input,
      ["primitives"],
    ),
    "tokens/brand.tokens.json": createTokenDocument(input.brandTokens, input, [
      "brand",
    ]),
    "tokens/semantics.tokens.json": createTokenDocument(
      input.semanticTokens,
      input,
      ["semantics"],
    ),
    "tokens/components.tokens.json": createTokenDocument(
      input.componentTokens,
      input,
      ["components"],
    ),
    "tokens/presets.tokens.json": createTokenDocument(
      createPresetDocumentTree(input),
      input,
      ["presets"],
    ),
  }

  input.themeTokens.forEach((theme) => {
    const brand = theme.brand ?? input.preset.brand ?? input.preset.id

    files[`tokens/themes/${brand}.${theme.name}.tokens.json`] =
      createThemeTokenDocument(input, theme)
  })

  return files
}

const createThemeDocumentTree = (input: StyleTokenInput): TokenTree => {
  return Object.fromEntries(
    input.themeTokens.map((theme) => {
      return [theme.name, theme.tokens]
    }),
  )
}

const createThemesJson = (input: StyleTokenInput): string => {
  return generateJsonTokens(createThemeDocumentTree(input), {
    metadataKeys: new Set(),
    metadata: {
      generatedBy: "@neurex/tokens",
      presetId: input.preset.id,
      presetName: input.preset.name,
      tokenSetOrder: ["themes"],
      themes: input.themeTokens.map((theme) => {
        return {
          name: theme.name,
          ...(theme.brand === undefined ? {} : { brand: theme.brand }),
          selector: theme.selector,
          colorScheme: theme.colorScheme,
        }
      }),
    },
  }).content
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
  const lightTheme = getTailwindBaseTheme(input)
  const tailwindThemeTokenTree = mergeTokenTrees(
    input.semanticTokens,
    lightTheme.tokens,
  )
  const semanticEntries = createCssVariableEntries(
    tailwindThemeTokenTree,
    cssVarsGeneratorOptions,
  )

  const themeLines = semanticEntries.map((entry) => {
    return `  ${createTailwindThemeVariableName(entry.name)}: ${toCssVarReference(entry.name)};`
  })

  return ["@theme inline {", ...themeLines, "}"].join("\n")
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
    tokenJsonFiles: createTokenJsonFiles(input),
    themesJson: createThemesJson(input),
  }
}

export const createTokensCssFromDtcgJson = (content: string): string => {
  const input = createDtcgTokenInputFromJson(content)

  return createTokensCssFromTokenTree(input.tokenTree)
}

export const createThemeCssFromDtcgJson = (
  tokensContent: string,
  themesContent: string,
): string => {
  const tokenInput = createDtcgTokenInputFromJson(tokensContent)
  const themeInput = createDtcgThemeTokenInputFromJson(themesContent)
  const themeBlocks = themeInput.themes.map((theme) => {
    return createThemeBlock(theme)
  })
  const lightTheme = themeInput.themes.find((theme) => {
    return theme.name === "light"
  })

  if (lightTheme === undefined) {
    throw new Error("Tailwind @theme generation requires a light theme.")
  }

  const semanticTokenTree = tokenInput.semanticTokenTree

  if (semanticTokenTree === undefined) {
    throw new Error('DTCG token document is missing a "semantics" layer.')
  }

  const tailwindThemeTokenTree = mergeTokenTrees(
    semanticTokenTree,
    lightTheme.tokens,
  )
  const semanticEntries = createCssVariableEntries(
    tailwindThemeTokenTree,
    cssVarsGeneratorOptions,
  )
  const themeLines = semanticEntries.map((entry) => {
    return `  ${createTailwindThemeVariableName(entry.name)}: ${toCssVarReference(entry.name)};`
  })

  return `${styleOutputConfig.styleHeader}\n\n${[
    ...themeBlocks,
    ["@theme inline {", ...themeLines, "}"].join("\n"),
  ].join("\n\n")}\n`
}
