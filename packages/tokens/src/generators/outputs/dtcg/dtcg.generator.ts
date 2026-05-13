/**
 * dtcg.generator.ts
 *
 * @layer generators
 * @description Generates DTCG-compatible JSON token output.
 *
 * @responsibility
 * - Generate DTCG JSON token trees from Neurex token trees
 * - Preserve token references instead of resolving them
 * - Serialize generated JSON deterministically
 *
 * @notes
 * - This generator does not resolve token references.
 * - It preserves DTCG-style { $value, $type } leaves for interop output.
 * - The output is intended for token interop workflows such as Tokens Studio/Figma.
 */

import type { TokenTree } from "../../../types"

import { flattenTokenTree } from "../../shared"

import type {
  DtcgTokenDocument,
  DtcgTokenTree,
  DtcgGenerateResult,
  DtcgGeneratorOptions,
} from "./dtcg.types"

import {
  createDefaultDtcgGeneratorOptions,
  DTCG_NEUREX_EXTENSION_KEY,
  setDtcgTokenTreeValue,
  toDtcgTokenLeaf,
} from "./dtcg.utils"

/**
 * Generates a DTCG-compatible JSON token tree and formatted JSON content.
 */
export const generateJsonTokens = (
  tree: TokenTree,
  options: DtcgGeneratorOptions = {},
): DtcgGenerateResult => {
  const generatorOptions = createDefaultDtcgGeneratorOptions(options)
  const entries = flattenTokenTree(tree, generatorOptions.metadataKeys)

  const tokenTree: DtcgTokenTree = {}

  entries.forEach((entry) => {
    const leaf = toDtcgTokenLeaf(entry, generatorOptions)

    setDtcgTokenTreeValue(tokenTree, entry.path, leaf)
  })

  const json: DtcgTokenDocument = {
    $schema: generatorOptions.schemaUrl,
    $extensions: {
      [DTCG_NEUREX_EXTENSION_KEY]: generatorOptions.metadata,
    },
    ...tokenTree,
  }

  return {
    json,
    content: `${JSON.stringify(json, null, 2)}\n`,
  }
}
