/**
 * output.types.ts
 *
 * @layer generators
 * @description Shared type contracts for generated token outputs.
 *
 * @responsibility
 * - Define flattened token entries used by output generators
 * - Keep shared output traversal types separate from format-specific generator types
 *
 * @notes
 * - These types are output-generator helpers.
 * - They are not token authoring contracts.
 * - Format-specific generators may ignore fields they do not need.
 */

import type { TokenPrimitive, TokenType } from "../../types/index.js"

/**
 * Raw flattened token entry before format-specific serialization.
 *
 * CSS output uses path and value.
 * JSON/DTCG output may also use description and type.
 */
export interface FlattenedTokenEntry {
  path: string[]
  value: TokenPrimitive
  description?: string
  type?: TokenType
}
