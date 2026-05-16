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
 * - Token branches may carry DTCG-style metadata such as $description.
 * - JSON export preserves references for downstream token tooling.
 */

import type { TokenType, TokenValue } from "../../../types"
import type { FlattenedTokenEntry } from "../../shared"

/**
 * Supported DTCG-compatible token types for Neurex JSON export.
 *
 * Keep this list intentionally limited to token types Neurex currently needs.
 */
export type DtcgTokenType = TokenType | "string"

/**
 * Shared DTCG-style metadata allowed on token leaves and token branches.
 *
 * `$deprecated` follows the DTCG lifecycle convention:
 * - `true` marks a token or branch as deprecated
 * - `string` marks it as deprecated and explains why
 */
export interface DtcgTokenMetadata {
  $description?: string
  $deprecated?: boolean | string
  $type?: DtcgTokenType
}

/**
 * DTCG-compatible token leaf used in exported JSON.
 */
export interface DtcgTokenLeaf extends DtcgTokenMetadata {
  $value: TokenValue
  $extensions?: Record<string, unknown>
}

/**
 * Recursive DTCG-compatible JSON token branch.
 *
 * Branch metadata must be preserved without being treated as a token leaf.
 */
export interface DtcgTokenTree extends DtcgTokenMetadata {
  [key: string]: DtcgTokenLeaf | DtcgTokenTree | string | boolean | undefined
}

/**
 * Theme metadata used by Neurex when a DTCG document contains theme override
 * token sets.
 */
export interface DtcgThemeMetadata {
  name: string
  selector: string
  colorScheme: string
  brand?: string
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
  themes?: DtcgThemeMetadata[]
}

/**
 * Root DTCG document extensions.
 */
export type DtcgDocumentExtensions = Record<string, unknown> & {
  "org.neurex": DtcgNeurexMetadata
}

/**
 * Root DTCG JSON document emitted by Neurex.
 */
export interface DtcgTokenDocument {
  $schema: string
  $extensions: DtcgDocumentExtensions
  [key: string]:
    | DtcgTokenLeaf
    | DtcgTokenTree
    | DtcgDocumentExtensions
    | string
    | boolean
    | undefined
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
