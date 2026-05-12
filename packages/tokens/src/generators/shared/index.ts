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
  isTokenPrimitive,
  normalizeTokenName,
  toKebabSegment,
  toTokenName,
} from "./output.utils.js"

export type { FlattenedTokenEntry } from "./output.types.js"
