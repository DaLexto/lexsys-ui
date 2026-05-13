/**
 * index.ts
 *
 * @layer generators
 * @description Public entry point for DTCG-compatible JSON token generation.
 */

export { generateJsonTokens } from "./dtcg.generator"

export {
  createDefaultDtcgGeneratorOptions,
  resolveDtcgTokenType,
  setDtcgTokenTreeValue,
  toDtcgTokenLeaf,
} from "./dtcg.utils"

export type {
  DtcgTokenLeaf,
  DtcgTokenTree,
  DtcgTokenType,
  DtcgTokenTypeResolver,
  DtcgGenerateResult,
  DtcgGeneratorOptions,
} from "./dtcg.types"
