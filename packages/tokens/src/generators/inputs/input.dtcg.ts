import type { TokenTree } from "../../types"
import type { BrandId, ThemeDefinition, ThemeModeId } from "../../types"
import { isTokenValue } from "../shared"
import {
  DTCG_NEUREX_EXTENSION_KEY,
  type DtcgLexsysMetadata,
  type DtcgThemeMetadata,
  type DtcgTokenDocument,
} from "../outputs/dtcg"
import type { ThemeTokenInput } from "./input.source"

const DOCUMENT_METADATA_KEYS = new Set(["$schema", "$extensions"])
const TOKEN_METADATA_KEYS = new Set([
  "$description",
  "$deprecated",
  "$extensions",
  "$type",
])

export interface DtcgTokenInput {
  metadata: DtcgLexsysMetadata
  tokenTree: TokenTree
  semanticTokenTree?: TokenTree
}

export interface DtcgThemeTokenInput {
  metadata: DtcgLexsysMetadata
  themes: ThemeTokenInput[]
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

const isStringArray = (value: unknown): value is string[] => {
  return (
    Array.isArray(value) &&
    value.every((entry) => {
      return typeof entry === "string"
    })
  )
}

const isThemeMetadataArray = (value: unknown): value is DtcgThemeMetadata[] => {
  return (
    Array.isArray(value) &&
    value.every((entry) => {
      return isRecord(entry) && typeof entry.name === "string"
    })
  )
}

const isThemeModeId = (value: unknown): value is ThemeModeId => {
  return value === "light" || value === "dark"
}

const isBrandId = (value: unknown): value is BrandId => {
  return typeof value === "string"
}

const isThemeSelector = (
  value: unknown,
): value is ThemeDefinition["selector"] => {
  return (
    value === ":root" ||
    (typeof value === "string" &&
      (value.startsWith(".") || (value.startsWith("[") && value.endsWith("]"))))
  )
}

const toDiagnosticPath = (path: string[]): string => {
  return path.length === 0 ? "(root)" : path.join(".")
}

const validateDtcgMetadataValue = (
  key: string,
  value: unknown,
  path: string[],
): void => {
  const diagnosticPath = toDiagnosticPath([...path, key])

  if (key === "$description" && typeof value !== "string") {
    throw new Error(`DTCG metadata "${diagnosticPath}" must be a string.`)
  }

  if (
    key === "$deprecated" &&
    typeof value !== "string" &&
    typeof value !== "boolean"
  ) {
    throw new Error(
      `DTCG metadata "${diagnosticPath}" must be a string or boolean.`,
    )
  }

  if (key === "$extensions" && !isRecord(value)) {
    throw new Error(`DTCG metadata "${diagnosticPath}" must be an object.`)
  }

  if (key === "$type" && typeof value !== "string") {
    throw new Error(`DTCG metadata "${diagnosticPath}" must be a string.`)
  }
}

const validateDtcgTokenNode = (node: unknown, path: string[]): void => {
  if (!isRecord(node)) {
    throw new Error(
      `DTCG token node "${toDiagnosticPath(path)}" must be an object.`,
    )
  }

  if ("$value" in node) {
    if (!isTokenValue(node.$value)) {
      throw new Error(
        `DTCG token leaf "${toDiagnosticPath(path)}" has an invalid "$value".`,
      )
    }

    Object.entries(node).forEach(([key, value]) => {
      if (key === "$value") {
        return
      }

      if (!TOKEN_METADATA_KEYS.has(key)) {
        throw new Error(
          `DTCG token leaf "${toDiagnosticPath(path)}" has invalid child "${key}".`,
        )
      }

      validateDtcgMetadataValue(key, value, path)
    })

    return
  }

  Object.entries(node).forEach(([key, value]) => {
    if (TOKEN_METADATA_KEYS.has(key)) {
      validateDtcgMetadataValue(key, value, path)
      return
    }

    validateDtcgTokenNode(value, [...path, key])
  })
}

const validateDtcgTokenTree = (tree: TokenTree): void => {
  validateDtcgTokenNode(tree, [])
}

const readLexsysMetadata = (
  document: DtcgTokenDocument,
): DtcgLexsysMetadata => {
  const extensions = document.$extensions

  if (!isRecord(extensions)) {
    throw new Error('DTCG token document is missing root "$extensions".')
  }

  const metadata = extensions[DTCG_NEUREX_EXTENSION_KEY]

  if (!isRecord(metadata)) {
    throw new Error(
      `DTCG token document is missing "$extensions.${DTCG_NEUREX_EXTENSION_KEY}".`,
    )
  }

  if (typeof metadata.generatedBy !== "string") {
    throw new Error(
      `DTCG token document extension "${DTCG_NEUREX_EXTENSION_KEY}" is missing "generatedBy".`,
    )
  }

  if (!isStringArray(metadata.tokenSetOrder)) {
    throw new Error(
      `DTCG token document extension "${DTCG_NEUREX_EXTENSION_KEY}" is missing "tokenSetOrder".`,
    )
  }

  return {
    generatedBy: metadata.generatedBy,
    presetId:
      typeof metadata.presetId === "string" ? metadata.presetId : undefined,
    presetName:
      typeof metadata.presetName === "string" ? metadata.presetName : undefined,
    tokenSetOrder: metadata.tokenSetOrder,
    themes: isThemeMetadataArray(metadata.themes) ? metadata.themes : undefined,
  }
}

const mergeTokenTrees = (...trees: TokenTree[]): TokenTree => {
  const merged: TokenTree = {}

  trees.forEach((tree) => {
    Object.entries(tree).forEach(([key, value]) => {
      const existingValue = merged[key]

      if (isRecord(existingValue) && isRecord(value)) {
        merged[key] = mergeTokenTrees(existingValue, value)
        return
      }

      merged[key] = value
    })
  })

  return merged
}

const getDocumentTokenTree = (document: DtcgTokenDocument): TokenTree => {
  return Object.fromEntries(
    Object.entries(document).filter(([key]) => {
      return !DOCUMENT_METADATA_KEYS.has(key)
    }),
  ) as TokenTree
}

const getLayerTree = (
  tokenTree: TokenTree,
  layer: string,
): TokenTree | undefined => {
  const candidate = tokenTree[layer]

  if (!isRecord(candidate) || "$value" in candidate) {
    return undefined
  }

  return candidate
}

const createRuntimeTokenTree = (documentTokenTree: TokenTree): TokenTree => {
  const primitives = getLayerTree(documentTokenTree, "primitives")
  const brand = getLayerTree(documentTokenTree, "brand")
  const semantics = getLayerTree(documentTokenTree, "semantics")
  const components = getLayerTree(documentTokenTree, "components")

  if (
    primitives === undefined &&
    brand === undefined &&
    semantics === undefined &&
    components === undefined
  ) {
    return documentTokenTree
  }

  return mergeTokenTrees(
    primitives ?? {},
    brand ?? {},
    semantics ?? {},
    components ?? {},
  )
}

export const createDtcgTokenInput = (
  document: DtcgTokenDocument,
): DtcgTokenInput => {
  const metadata = readLexsysMetadata(document)
  const documentTokenTree = getDocumentTokenTree(document)
  validateDtcgTokenTree(documentTokenTree)
  const tokenTree = createRuntimeTokenTree(documentTokenTree)
  const semanticTokenTree = getLayerTree(documentTokenTree, "semantics")

  return {
    metadata,
    tokenTree,
    semanticTokenTree,
  }
}

export const parseDtcgTokenDocument = (content: string): DtcgTokenDocument => {
  const document = JSON.parse(content) as unknown

  if (!isRecord(document)) {
    throw new Error("DTCG token document must be a JSON object.")
  }

  return document as DtcgTokenDocument
}

export const createDtcgTokenInputFromJson = (
  content: string,
): DtcgTokenInput => {
  return createDtcgTokenInput(parseDtcgTokenDocument(content))
}

export const createDtcgThemeTokenInput = (
  document: DtcgTokenDocument,
): DtcgThemeTokenInput => {
  const metadata = readLexsysMetadata(document)
  const themeMetadata = metadata.themes

  if (themeMetadata === undefined) {
    throw new Error(
      `DTCG theme document extension "${DTCG_NEUREX_EXTENSION_KEY}" is missing "themes".`,
    )
  }

  const themes: ThemeTokenInput[] = themeMetadata.map((theme) => {
    if (!isThemeModeId(theme.name)) {
      throw new Error(
        `DTCG theme "${theme.name}" is not a supported theme mode.`,
      )
    }

    if (!isThemeSelector(theme.selector)) {
      throw new Error(`DTCG theme "${theme.name}" is missing "selector".`)
    }

    if (!isThemeModeId(theme.colorScheme)) {
      throw new Error(`DTCG theme "${theme.name}" is missing "colorScheme".`)
    }

    if (theme.brand !== undefined && !isBrandId(theme.brand)) {
      throw new Error(`DTCG theme "${theme.name}" has invalid "brand".`)
    }

    const tokens = document[theme.name]

    if (!isRecord(tokens) || "$value" in tokens) {
      throw new Error(`DTCG theme "${theme.name}" must be a token tree.`)
    }

    validateDtcgTokenTree(tokens as TokenTree)

    return {
      name: theme.name,
      brand: theme.brand,
      selector: theme.selector,
      colorScheme: theme.colorScheme,
      tokens: tokens as TokenTree,
    }
  })

  return {
    metadata,
    themes,
  }
}

export const createDtcgThemeTokenInputFromJson = (
  content: string,
): DtcgThemeTokenInput => {
  return createDtcgThemeTokenInput(parseDtcgTokenDocument(content))
}
