import { componentTokens as componentTokenGroups } from "../../components"
import { primitiveTokens } from "../../primitives"
import { brandTokens as brandTokenGroups } from "../../brand"
import { defaultPresetId, presets } from "../../presets"
import { resolveTokenTree } from "../../resolver"
import { validateTokenLayerContractsStrict } from "../../resolver/layer-validation"
import { semanticTokens as semanticTokenGroups } from "../../semantics"
import { themes } from "../../themes"
import type {
  BrandTokenGroup,
  ComponentTokenGroup,
  PresetDefinition,
  PresetId,
  PrimitiveTokenGroup,
  SemanticTokenGroup,
  ThemeDefinition,
  ThemeModeId,
  TokenTree,
} from "../../types"
import {
  getComponentGroupNamespace,
  getNamedGroupNamespace,
  getTokenTreeFromSourceGroup,
  type TokenSourceGroup,
} from "../../types"
import { isTokenBranch } from "../shared"

export interface ThemeTokenInput {
  name: ThemeModeId
  brand: ThemeDefinition["brand"]
  selector: ThemeDefinition["selector"]
  colorScheme: ThemeDefinition["colorScheme"]
  tokens: TokenTree
}

export interface StyleTokenInputOptions {
  presetId?: PresetId
}

export interface StyleTokenInput {
  preset: PresetDefinition
  primitiveTokens: TokenTree
  brandTokens: TokenTree
  semanticTokens: TokenTree
  foundationTokens: TokenTree
  componentTokens: TokenTree
  tokenTree: TokenTree
  themeTokens: ThemeTokenInput[]
}

export const getTokenTree = (group: TokenSourceGroup): TokenTree => {
  return getTokenTreeFromSourceGroup(group)
}

export const mergeTokenTrees = (...trees: TokenTree[]): TokenTree => {
  const merged: TokenTree = {}

  for (const tree of trees) {
    for (const [key, value] of Object.entries(tree)) {
      const existingValue = merged[key]

      if (isTokenBranch(existingValue) && isTokenBranch(value)) {
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
  groups: Array<PrimitiveTokenGroup | BrandTokenGroup | SemanticTokenGroup>,
): TokenTree => {
  const trees = groups.map((group) => {
    return createNamespacedTokenTree(
      getNamedGroupNamespace(group),
      getTokenTree(group),
    )
  })

  return mergeTokenTrees(...trees)
}

const createTokenTreeFromComponentGroups = (
  groups: ComponentTokenGroup[],
): TokenTree => {
  const trees = groups.map((group) => {
    return createNamespacedTokenTree(
      getComponentGroupNamespace(group),
      getTokenTree(group),
    )
  })

  return mergeTokenTrees(...trees)
}

const createThemeTokenInputs = (
  themeDefinitions: ThemeDefinition[],
  preset: PresetDefinition,
): ThemeTokenInput[] => {
  return themeDefinitions
    .filter((theme) => {
      const matchesThemeMode = preset.themeModes.includes(theme.name)
      const matchesBrand =
        preset.brand === undefined ||
        theme.brand === undefined ||
        theme.brand === preset.brand

      return matchesThemeMode && matchesBrand
    })
    .map((theme) => {
      return {
        name: theme.name,
        brand: theme.brand,
        selector: theme.selector,
        colorScheme: theme.colorScheme,
        tokens: getTokenTree(theme),
      }
    })
}

const resolvePreset = (presetId: PresetId): PresetDefinition => {
  const preset = presets.find((candidate) => {
    return candidate.id === presetId
  })

  if (preset === undefined) {
    throw new Error(`Unknown token preset "${presetId}".`)
  }

  return preset
}

const validatePresetThemeCoverage = (
  preset: PresetDefinition,
  themeInputs: ThemeTokenInput[],
): void => {
  const themeNames = new Set(
    themeInputs.map((theme) => {
      return theme.name
    }),
  )
  const missingThemeModes = preset.themeModes.filter((themeMode) => {
    return !themeNames.has(themeMode)
  })

  if (missingThemeModes.length === 0) {
    return
  }

  throw new Error(
    `Token preset "${preset.id}" is missing theme modes: ${missingThemeModes.join(", ")}.`,
  )
}

export const createStyleTokenInput = (
  options: StyleTokenInputOptions = {},
): StyleTokenInput => {
  const preset = resolvePreset(options.presetId ?? defaultPresetId)
  const primitiveTokenTree = createTokenTreeFromNamedGroups(primitiveTokens)
  const brandTokens = createTokenTreeFromNamedGroups(brandTokenGroups)
  const semanticTokens = createTokenTreeFromNamedGroups(semanticTokenGroups)
  const foundationTokens = mergeTokenTrees(
    primitiveTokenTree,
    brandTokens,
    semanticTokens,
  )
  const componentTokens =
    createTokenTreeFromComponentGroups(componentTokenGroups)
  const themeTokens = createThemeTokenInputs(themes, preset)

  validatePresetThemeCoverage(preset, themeTokens)

  return {
    preset,
    primitiveTokens: primitiveTokenTree,
    brandTokens,
    semanticTokens,
    foundationTokens,
    componentTokens,
    tokenTree: mergeTokenTrees(foundationTokens, componentTokens),
    themeTokens,
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
  validateTokenLayerContractsStrict(input)

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
