import { componentTokens } from "../components/index.js"
import { primitiveTokens } from "../primitives/index.js"
import { semanticTokens } from "../semantics/index.js"
import { themes } from "../themes/index.js"
import type {
  ComponentTokenGroup,
  PrimitiveTokenGroup,
  SemanticTokenGroup,
  StyleOutputs,
  ThemeDefinition,
  TokenEntry,
  TokenGroupProperty,
  TokenLeaf,
  TokenTree,
} from "../types/index.js"
import { defaultStyleOutputConfig } from "./output-config.js"

const styleOutputConfig = defaultStyleOutputConfig
const cssPrefix = styleOutputConfig.cssVarPrefix
const twPrefix = styleOutputConfig.tailwindPrefix
const tokenReferencePattern = /^\{([a-zA-Z0-9_.-]+)\}$/
const tokenGroupMetadataKeys = new Set([
  "name",
  "component",
  "selector",
  "colorScheme",
])

const toKebabSegment = (segment: string): string => {
  return segment
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
}

/* const normalizeTokenName = (name: string): string => {
  const overrides = styleOutputConfig.groupNameOverrides ?? {}

  const match = Object.keys(overrides)
    .sort((a, b) => b.length - a.length)
    .find((key) => name.startsWith(key))

  if (match) {
    return name.replace(match, overrides[match])
  }

  return name
} */

const normalizeTokenName = (name: string): string => {
  const sortedOverrides = Object.entries(
    styleOutputConfig.groupNameOverrides,
  ).sort(([left], [right]) => right.length - left.length)

  for (const [sourceName, outputName] of sortedOverrides) {
    if (name === sourceName) {
      return outputName
    }

    const sourceNamePrefix = `${sourceName}-`

    if (name.startsWith(sourceNamePrefix)) {
      return `${outputName}-${name.slice(sourceNamePrefix.length)}`
    }
  }

  return name
}

const toTokenName = (path: string[]): string => {
  return normalizeTokenName(path.map(toKebabSegment).join("-"))
}

const toCssVarName = (tokenName: string): string => {
  return `--${cssPrefix}-${tokenName}`
}

const resolveTokenValue = (value: string): string => {
  const reference = value.match(tokenReferencePattern)

  if (!reference) {
    return value
  }

  return `var(${toCssVarName(toTokenName(reference[1].split(".")))})`
}

const isTokenLeaf = (value: TokenGroupProperty): value is TokenLeaf => {
  return typeof value === "object" && value !== null && "value" in value
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

const flattenTokenTree = (
  tree: TokenTree,
  path: string[] = [],
): TokenEntry[] => {
  return Object.entries(tree).flatMap(([key, value]) => {
    const nextPath = key === "DEFAULT" ? path : [...path, key]

    if (isTokenLeaf(value)) {
      return {
        name: toTokenName(nextPath),
        value: resolveTokenValue(value.value),
      }
    }

    return flattenTokenTree(value, nextPath)
  })
}

const toCustomProperty = (token: TokenEntry): string => {
  return `  ${toCssVarName(token.name)}: ${token.value};`
}

const createRootBlock = (tokens: TokenEntry[]): string => {
  return [":root {", ...tokens.map(toCustomProperty), "}"].join("\n")
}

const createTokensCss = (): string => {
  const primitives = primitiveTokens.flatMap((group) => {
    return flattenTokenTree(getTokenTree(group), [group.name])
  })
  const semantics = semanticTokens.flatMap((group) => {
    return flattenTokenTree(getTokenTree(group), [group.name])
  })
  const componentValues = componentTokens.flatMap((group) => {
    return flattenTokenTree(getTokenTree(group), [group.component])
  })

  return `${styleOutputConfig.styleHeader}\n\n${createRootBlock([...primitives, ...semantics, ...componentValues])}\n`
}

const createThemeBlock = (
  selector: string,
  colorScheme: string,
  tokens: TokenEntry[],
): string => {
  const tokenLines = tokens.map(toCustomProperty)

  return [
    `${selector} {`,
    `  color-scheme: ${colorScheme};`,
    ...tokenLines,
    "}",
  ].join("\n")
}

const createTailwindThemeBlock = (): string => {
  const semanticNames = flattenTokenTree(getTokenTree(themes[0] ?? {})).map(
    (token) => token.name,
  )
  const colorLines = semanticNames.map((name) => {
    const tailwindName = name.replace(/^color-/, `color-${twPrefix}-`)

    return `  --${tailwindName}: var(${toCssVarName(name)});`
  })

  const radiusLines = ["sm", "md", "lg", "xl", "full"].map((name) => {
    return `  --radius-${twPrefix}-${name}: var(${toCssVarName(`radius-${name}`)});`
  })

  return ["@theme inline {", ...colorLines, ...radiusLines, "}"].join("\n")
}

const createThemeCss = (): string => {
  const themeBlocks = themes.map((theme) => {
    return createThemeBlock(
      theme.selector,
      theme.colorScheme,
      flattenTokenTree(getTokenTree(theme)),
    )
  })

  return `${styleOutputConfig.styleHeader}\n\n${[...themeBlocks, createTailwindThemeBlock()].join("\n\n")}\n`
}

export const createStyleOutputs = (): StyleOutputs => {
  return {
    tokensCss: createTokensCss(),
    themeCss: createThemeCss(),
  }
}
