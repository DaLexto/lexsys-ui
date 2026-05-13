import { componentTokens } from "../components"
import { primitiveTokens } from "../primitives"
import { resolveTokenTree } from "../resolver"
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
import { generateJsonTokens } from "./dtcg"
import { defaultStyleOutputConfig } from "./generator.config.js"
import { DEFAULT_GENERATOR_METADATA_KEYS } from "./shared/index.js"

const styleOutputConfig = defaultStyleOutputConfig
const cssPrefix = styleOutputConfig.cssVarPrefix
const twPrefix = styleOutputConfig.tailwindPrefix

const cssVarsGeneratorOptions: Required<CssVarsGeneratorOptions> = {
  cssVarPrefix: cssPrefix,
  groupNameOverrides: styleOutputConfig.groupNameOverrides,
  metadataKeys: DEFAULT_GENERATOR_METADATA_KEYS,
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

const isTokenLeafLike = (value: unknown): boolean => {
  return isRecord(value) && "$value" in value
}

const isTokenBranchLike = (value: unknown): value is TokenTree => {
  return isRecord(value) && !isTokenLeafLike(value)
}

const getTokenTree = (
  group:
    | PrimitiveTokenGroup
    | SemanticTokenGroup
    | ComponentTokenGroup
    | ThemeDefinition,
): TokenTree => {
  return Object.fromEntries(
    Object.entries(group).filter(
      ([key]) => !DEFAULT_GENERATOR_METADATA_KEYS.has(key),
    ),
  ) as TokenTree
}

const mergeTokenTrees = (...trees: TokenTree[]): TokenTree => {
  const merged: TokenTree = {}

  for (const tree of trees) {
    for (const [key, value] of Object.entries(tree)) {
      const existingValue = merged[key]

      if (isTokenBranchLike(existingValue) && isTokenBranchLike(value)) {
        merged[key] = mergeTokenTrees(existingValue, value)
        continue
      }

      merged[key] = value
    }
  }

  return merged
}

const createNamespacedTokenTree = (
  namespace: string,
  tree: TokenTree,
): TokenTree => {
  return {
    [namespace]: tree,
  }
}

const validateTokenTreeReferences = (label: string, tree: TokenTree): void => {
  const result = resolveTokenTree(tree, {
    strict: true,
  })

  if (result.errors.length === 0) {
    return
  }

  const formattedErrors = result.errors
    .map((error) => {
      return `- [${error.code}] ${error.message}`
    })
    .join("\n")

  throw new Error(
    `Token reference validation failed for ${label}:\n${formattedErrors}`,
  )
}

const createBaseTokenTree = (): TokenTree => {
  const primitiveTrees = primitiveTokens.map((group) => {
    return createNamespacedTokenTree(group.name, getTokenTree(group))
  })

  const semanticTrees = semanticTokens.map((group) => {
    return createNamespacedTokenTree(group.name, getTokenTree(group))
  })

  return mergeTokenTrees(...primitiveTrees, ...semanticTrees)
}

const createComponentTokenTree = (): TokenTree => {
  const componentTrees = componentTokens.map((group) => {
    return createNamespacedTokenTree(group.component, getTokenTree(group))
  })

  return mergeTokenTrees(...componentTrees)
}

const validateStyleOutputReferences = (): void => {
  const baseTokenTree = createBaseTokenTree()
  const componentTokenTree = createComponentTokenTree()

  if (themes.length === 0) {
    validateTokenTreeReferences(
      "tokens.css",
      mergeTokenTrees(baseTokenTree, componentTokenTree),
    )

    return
  }

  for (const theme of themes) {
    const themeTokenTree = getTokenTree(theme)

    validateTokenTreeReferences(
      `tokens.css with theme "${theme.name}"`,
      mergeTokenTrees(baseTokenTree, themeTokenTree, componentTokenTree),
    )
  }
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

const createTokensJson = (): string => {
  const tokenTree = mergeTokenTrees(
    createBaseTokenTree(),
    createComponentTokenTree(),
  )

  return generateJsonTokens(tokenTree).content
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
      : createCssVariableEntries(
          getTokenTree(firstTheme),
          cssVarsGeneratorOptions,
        )

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
  validateStyleOutputReferences()

  return {
    tokensCss: createTokensCss(),
    themeCss: createThemeCss(),
    tokensJson: createTokensJson(),
  }
}
