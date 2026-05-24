/**
 * dtcg.generator.ts
 *
 * @layer generators
 * @description Generates DTCG-compatible JSON token output.
 *
 * @responsibility
 * - Generate DTCG JSON token trees from Lexsys token trees
 * - Preserve token references instead of resolving them
 * - Preserve DTCG-style branch and leaf metadata
 * - Serialize generated JSON deterministically
 *
 * @notes
 * - This generator does not resolve token references.
 * - It preserves DTCG-style { $value, $type } leaves for interop output.
 * - It preserves branch metadata such as $description and $deprecated.
 * - The canonical output uses W3C/DTCG root metadata under $extensions.
 * - Tool-specific formats such as Tokens Studio should be implemented as adapters.
 */

import type { TokenTree } from "../../../types"
import { normalizeCompositeBranches } from "../../../engine/composite"

import type {
  DtcgGenerateResult,
  DtcgGeneratorOptions,
  DtcgTokenDocument,
} from "./dtcg.types"

import {
  createDefaultDtcgGeneratorOptions,
  DTCG_LEXSYS_EXTENSION_KEY,
  stringifyDtcgJson,
  toDtcgTokenTree,
} from "./dtcg.utils"

/**
 * Generates a DTCG-compatible JSON token tree and formatted JSON content.
 */
export const generateJsonTokens = (
  tree: TokenTree,
  options: DtcgGeneratorOptions = {},
): DtcgGenerateResult => {
  const generatorOptions = createDefaultDtcgGeneratorOptions(options)
  const tokenTree = toDtcgTokenTree(
    normalizeCompositeBranches(tree),
    generatorOptions,
  )

  const json: DtcgTokenDocument = {
    $schema: generatorOptions.schemaUrl,
    $extensions: {
      [DTCG_LEXSYS_EXTENSION_KEY]: generatorOptions.metadata,
    },
    ...tokenTree,
  }

  return {
    json,
    content: stringifyDtcgJson(json),
  }
}
