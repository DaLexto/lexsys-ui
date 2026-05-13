import { componentTokens as componentTokenGroups } from "../../components"
import { primitiveTokens } from "../../primitives"
import { resolveTokenTree } from "../../resolver"
import { semanticTokens } from "../../semantics"
import { themes } from "../../themes"
import type {
  ComponentTokenGroup,
  PrimitiveTokenGroup,
  SemanticTokenGroup,
  ThemeDefinition,
  ThemeModeId,
  TokenTree,
} from "../../types"
import { DEFAULT_GENERATOR_METADATA_KEYS } from "../shared/index.js"

type TokenSourceGroup =
  | PrimitiveTokenGroup
  | SemanticTokenGroup
  | ComponentTokenGroup
  | ThemeDefinition

export interface ThemeTokenInput {
  name: ThemeModeId
  selector: ThemeDefinition["selector"]
  colorScheme: ThemeDefinition["colorScheme"]
  tokens: TokenTree
}

export interface StyleTokenInput {
  foundationTokens: TokenTree
  componentTokens: TokenTree
  tokenTree: TokenTree
  themeTokens: ThemeTokenInput[]
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

export const getTokenTree = (group: TokenSourceGroup): TokenTree => {
  return Object.fromEntries(
    Object.entries(group).filter(
      ([key]) => !DEFAULT_GENERATOR_METADATA_KEYS.has(key),
    ),
  ) as TokenTree
}

export const mergeTokenTrees = (...trees: TokenTree[]): TokenTree => {
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

const createTokenTreeFromNamedGroups = (
  groups: Array<PrimitiveTokenGroup | SemanticTokenGroup>,
): TokenTree => {
  const trees = groups.map((group) => {
    return createNamespacedTokenTree(group.name, getTokenTree(group))
  })

  return mergeTokenTrees(...trees)
}

const createTokenTreeFromComponentGroups = (
  groups: ComponentTokenGroup[],
): TokenTree => {
  const trees = groups.map((group) => {
    return createNamespacedTokenTree(group.component, getTokenTree(group))
  })

  return mergeTokenTrees(...trees)
}

const createThemeTokenInputs = (
  themeDefinitions: ThemeDefinition[],
): ThemeTokenInput[] => {
  return themeDefinitions.map((theme) => {
    return {
      name: theme.name,
      selector: theme.selector,
      colorScheme: theme.colorScheme,
      tokens: getTokenTree(theme),
    }
  })
}

export const createStyleTokenInput = (): StyleTokenInput => {
  const foundationTokens = createTokenTreeFromNamedGroups([
    ...primitiveTokens,
    ...semanticTokens,
  ])
  const componentTokens =
    createTokenTreeFromComponentGroups(componentTokenGroups)

  return {
    foundationTokens,
    componentTokens,
    tokenTree: mergeTokenTrees(foundationTokens, componentTokens),
    themeTokens: createThemeTokenInputs(themes),
  }
}

export const createThemedTokenTree = (
  input: StyleTokenInput,
  theme: ThemeTokenInput,
): TokenTree => {
  return mergeTokenTrees(
    input.foundationTokens,
    theme.tokens,
    input.componentTokens,
  )
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

export const validateStyleTokenInput = (input: StyleTokenInput): void => {
  if (input.themeTokens.length === 0) {
    validateTokenTreeReferences("tokens.css", input.tokenTree)
    return
  }

  for (const theme of input.themeTokens) {
    validateTokenTreeReferences(
      `tokens.css with theme "${theme.name}"`,
      createThemedTokenTree(input, theme),
    )
  }
}
