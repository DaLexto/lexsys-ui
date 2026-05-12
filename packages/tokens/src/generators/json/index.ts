/**
 * index.ts
 *
 * @layer generators
 * @description Public entry point for DTCG-compatible JSON token generation.
 */

export { generateJsonTokens } from "./generator.js"

export {
  createDefaultJsonGeneratorOptions,
  resolveDtcgTokenType,
  setDtcgTokenTreeValue,
  toDtcgTokenLeaf,
} from "./generator.utils.js"

export type {
  DtcgTokenLeaf,
  DtcgTokenTree,
  DtcgTokenType,
  DtcgTokenTypeResolver,
  FlattenedTokenEntry,
  JsonGenerateResult,
  JsonGeneratorOptions,
} from "./generator.types.js"