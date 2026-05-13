/**
 * dtcg.types.ts
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
 * - Token leaves follow the DTCG-style { $value, $type } shape.
 * - JSON export preserves references for downstream token tooling.
 */

import type { TokenPrimitive, TokenType } from "../../../types"
import type { FlattenedTokenEntry } from "../../shared"

/**
 * Supported DTCG-compatible token types for Neurex JSON export.
 *
 * Keep this list intentionally limited to token types Neurex currently needs.
 */
export type DtcgTokenType = TokenType | "string"

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
 * Neurex metadata attached to the root DTCG token document.
 *
 * This is stored under a vendor key in root `$extensions`, which is the DTCG
 * mechanism for proprietary metadata. Keep tool-specific metadata in adapter
 * outputs such as Tokens Studio.
 */
export interface DtcgNeurexMetadata {
  generatedBy: string
  presetId?: string
  presetName?: string
  tokenSetOrder: string[]
}

/**
 * Root DTCG document extensions.
 */
export type DtcgDocumentExtensions = Record<string, unknown> & {
  "org.neurex": DtcgNeurexMetadata
}

/**
 * Recursive DTCG-compatible JSON token tree.
 */
export type DtcgTokenTree = {
  [key: string]: DtcgTokenLeaf | DtcgTokenTree
}

/**
 * Root DTCG JSON document emitted by Neurex.
 */
export interface DtcgTokenDocument {
  $schema: string
  $extensions: DtcgDocumentExtensions
  [key: string]: DtcgTokenLeaf | DtcgTokenTree | DtcgDocumentExtensions | string
}

/**
 * Resolver used to determine the DTCG $type for a flattened token entry.
 */
export type DtcgTokenTypeResolver = (
  entry: FlattenedTokenEntry,
  options: Required<DtcgGeneratorOptions>,
) => DtcgTokenType

/**
 * Options used when generating DTCG-compatible JSON tokens.
 */
export interface DtcgGeneratorOptions {
  /**
   * JSON schema URL for the emitted token document.
   */
  schemaUrl?: string

  /**
   * Neurex root document metadata stored under `$extensions["org.neurex"]`.
   */
  metadata?: DtcgNeurexMetadata

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
export interface DtcgGenerateResult {
  json: DtcgTokenDocument
  content: string
}
