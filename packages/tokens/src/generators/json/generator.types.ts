/**
 * generator.types.ts
 *
 * @layer generators
 * @description Type contracts for the DTCG-compatible JSON generator.
 *
 * @responsibility
 * - Define JSON token generator options
 * - Define DTCG-compatible JSON token entries
 * - Keep JSON output types separate from token authoring types
 *
 * @notes
 * - This generator is JSON-specific.
 * - It does not resolve token references to final primitive values.
 * - Internal Neurex token leaves use { value }.
 * - JSON export leaves use DTCG-style { $value, $type }.
 */

import type { TokenPrimitive } from "../../types/index.js"
import type { FlattenedTokenEntry } from "../shared/index.js"

/**
 * Supported DTCG-compatible token types for Neurex JSON export.
 *
 * Keep this list intentionally limited to token types Neurex currently needs.
 */
export type DtcgTokenType =
  | "color"
  | "dimension"
  | "fontFamily"
  | "fontWeight"
  | "duration"
  | "cubicBezier"
  | "number"
  | "string"
  | "boolean"

/**
 * DTCG-compatible token leaf used in exported JSON.
 */
export interface DtcgTokenLeaf {
  $value: TokenPrimitive
  $type: DtcgTokenType
  $description?: string
  $extensions?: Record<string, unknown>
}

/**
 * Recursive DTCG-compatible JSON token tree.
 */
export type DtcgTokenTree = {
  [key: string]: DtcgTokenLeaf | DtcgTokenTree
}

/**
 * Resolver used to determine the DTCG $type for a flattened token entry.
 */
export type DtcgTokenTypeResolver = (
  entry: FlattenedTokenEntry,
  options: Required<JsonGeneratorOptions>,
) => DtcgTokenType

/**
 * Options used when generating DTCG-compatible JSON tokens.
 */
export interface JsonGeneratorOptions {
  /**
   * Optional group/type mapping.
   *
   * The key is a normalized token group/name prefix.
   *
   * Examples:
   * "color" -> "color"
   * "spacing" -> "dimension"
   * "font-weight" -> "fontWeight"
   * "motion-duration" -> "duration"
   */
  tokenTypeByGroup?: Readonly<Record<string, DtcgTokenType>>

  /**
   * Optional group/path name overrides.
   *
   * This should mirror CSS output naming behavior when needed.
   *
   * Example:
   * "motion-duration" -> "duration"
   */
  groupNameOverrides?: Readonly<Record<string, string>>

  /**
   * Metadata keys that should be ignored during token traversal.
   */
  metadataKeys?: ReadonlySet<string>

  /**
   * Optional custom type resolver.
   *
   * If provided, this resolver controls the final DTCG $type value.
   */
  tokenTypeResolver?: DtcgTokenTypeResolver
}

/**
 * Result returned by JSON token generation.
 */
export interface JsonGenerateResult {
  json: DtcgTokenTree
  content: string
}
