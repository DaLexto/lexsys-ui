/**
 * index.ts
 *
 * @layer generators
 * @description Local entry point for token output target generators.
 *
 * @responsibility
 * - Expose supported output target generator APIs
 * - Keep output target folders behind one local import boundary
 */

export {
  createCssBlock,
  createCssVariableEntries,
  generateCssVariables,
  toCustomProperty,
} from "./css-vars"
export { DTCG_NEUREX_EXTENSION_KEY, generateJsonTokens } from "./dtcg"

export type {
  CssVariableEntry,
  CssVarsGenerateResult,
  CssVarsGeneratorOptions,
} from "./css-vars"
export type {
  DtcgGenerateResult,
  DtcgGeneratorOptions,
  DtcgTokenLeaf,
  DtcgTokenTree,
  DtcgTokenType,
  DtcgTokenTypeResolver,
} from "./dtcg"
