/**
 * index.ts
 *
 * @layer generators
 * @description Public entry point for shared generator helpers.
 */

export {
  DEFAULT_GENERATOR_METADATA_KEYS,
  flattenTokenTree,
  isTokenBranch,
  isTokenLeaf,
  isTokenScalarValue,
  isTokenValue,
  normalizeTokenName,
  toKebabSegment,
  toTokenName,
} from "./shared.utils"

export type { FlattenedTokenEntry } from "./shared.types"
