/**
 * index.ts
 *
 * @layer generators
 * @description Public entry point for DTCG-compatible JSON token generation.
 */

export { generateJsonTokens } from "./dtcg.generator"

export {
  createDefaultDtcgGeneratorOptions,
  DTCG_NEUREX_EXTENSION_KEY,
  DTCG_SCHEMA_URL,
  resolveDtcgTokenType,
  setDtcgTokenTreeValue,
  toDtcgTokenLeaf,
} from "./dtcg.utils"

export type {
  DtcgDocumentExtensions,
  DtcgNeurexMetadata,
  DtcgThemeMetadata,
  DtcgTokenLeaf,
  DtcgTokenDocument,
  DtcgTokenTree,
  DtcgTokenType,
  DtcgTokenTypeResolver,
  DtcgGenerateResult,
  DtcgGeneratorOptions,
} from "./dtcg.types"
