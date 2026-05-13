import type { TokenTree } from "../../types"
import {
  DTCG_NEUREX_EXTENSION_KEY,
  type DtcgNeurexMetadata,
  type DtcgTokenDocument,
} from "../outputs/dtcg"

const DOCUMENT_METADATA_KEYS = new Set(["$schema", "$extensions"])

export interface DtcgTokenInput {
  metadata: DtcgNeurexMetadata
  tokenTree: TokenTree
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

const readNeurexMetadata = (
  document: DtcgTokenDocument,
): DtcgNeurexMetadata => {
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
  }
}

export const createDtcgTokenInput = (
  document: DtcgTokenDocument,
): DtcgTokenInput => {
  const metadata = readNeurexMetadata(document)
  const tokenTree = Object.fromEntries(
    Object.entries(document).filter(([key]) => {
      return !DOCUMENT_METADATA_KEYS.has(key)
    }),
  ) as TokenTree

  return {
    metadata,
    tokenTree,
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
