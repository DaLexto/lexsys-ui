/**
 * generator.ts
 *
 * @layer generators
 * @description Generates DTCG-compatible JSON token output.
 *
 * @responsibility
 * - Convert Neurex { value } token trees into DTCG JSON token trees
 * - Preserve token references instead of resolving them
 * - Serialize generated JSON deterministically
 *
 * @notes
 * - This generator does not resolve token references.
 * - It maps internal { value } leaves to { $value, $type } leaves.
 * - The output is intended for token interop workflows such as Tokens Studio/Figma.
 */

import type { TokenTree } from "../../types/index.js"

import { flattenTokenTree } from "../shared/index.js"

import type {
  DtcgTokenTree,
  JsonGenerateResult,
  JsonGeneratorOptions,
} from "./generator.types.js"

import {
  createDefaultJsonGeneratorOptions,
  setDtcgTokenTreeValue,
  toDtcgTokenLeaf,
} from "./generator.utils.js"

/**
 * Generates a DTCG-compatible JSON token tree and formatted JSON content.
 */
export const generateJsonTokens = (
  tree: TokenTree,
  options: JsonGeneratorOptions = {},
): JsonGenerateResult => {
  const generatorOptions = createDefaultJsonGeneratorOptions(options)
  const entries = flattenTokenTree(tree, generatorOptions.metadataKeys)

  const json: DtcgTokenTree = {}

  entries.forEach((entry) => {
    const leaf = toDtcgTokenLeaf(entry, generatorOptions)

    setDtcgTokenTreeValue(json, entry.path, leaf)
  })

  return {
    json,
    content: `${JSON.stringify(json, null, 2)}\n`,
  }
}
