/**
 * token.types.ts
 *
 * @layer types
 * @description Core DTCG-shaped token authoring contracts.
 *
 * @responsibility
 * - Define the next token leaf shape based on $value metadata
 * - Define scalar and structured token values
 * - Define DTCG-style metadata shared by leaves and branches
 * - Keep output-specific flattened generator types out of the core authoring model
 *
 * @standard Design Tokens Community Group Format
 * @see https://www.designtokens.org/tr/2025.10/format/
 *
 * @notes
 * - Runtime validators must enforce stricter tree rules than TypeScript can express.
 * - Source group metadata is separated from token payloads via authoring factories.
 */

/* -------------------------------------------------------------------------------------------------
 * Token references
 * ------------------------------------------------------------------------------------------------- */

/**
 * Token reference string using DTCG alias syntax.
 *
 * Examples:
 * - "{color.purple.600}"
 * - "{brand.color.accent}"
 * - "{action.primary.base}"
 *
 * Notes:
 * - This type is useful for naming and helper/type-guard APIs.
 * - Because TokenScalarValue still includes string, TypeScript cannot fully
 *   distinguish references from normal strings at authoring time.
 * - Reference validity must be checked by resolver/validator logic.
 */
export type TokenReference = `{${string}}`

/* -------------------------------------------------------------------------------------------------
 * Token type names
 * ------------------------------------------------------------------------------------------------- */

/**
 * Standard scalar token type names supported by the Lexsys DTCG-shaped token model.
 *
 * Scalar tokens represent individual values that can usually be emitted as a
 * single CSS custom property after output-specific serialization.
 */
export type StandardScalarTokenType =
  /** Color values serialized from structured color values or compatible strings. */
  | "color"
  /** Length, distance, or size values such as px, rem, em, or %. */
  | "dimension"
  /** Unitless numerical values such as opacity, scale, or line-height. */
  | "number"
  /** Time values for motion such as ms or s. */
  | "duration"
  /** Easing curve values, usually authored as cubic bezier values. */
  | "cubicBezier"
  /** Typeface names or CSS font stacks. */
  | "fontFamily"
  /** Font weight values such as 400, 500, or 700. */
  | "fontWeight"
  /** Stroke pattern styles such as solid, dashed, or dotted. */
  | "strokeStyle"
  /** External resource references such as icons, images, or font files. */
  | "asset"
  /** Metadata, preset labels, and other scalar string token values. */
  | "string"

/**
 * Lexsys authoring aliases for typography-related scalar values.
 *
 * These aliases are useful in source files and generators, but interchange
 * outputs may serialize them as standard dimension or number values where
 * required.
 */
export type LexsysScalarTokenType =
  /** Font size values, typically emitted as dimensions. */
  | "fontSize"
  /** Vertical spacing between lines, usually unitless in Lexsys. */
  | "lineHeight"
  /** Horizontal spacing between characters such as 0em or -0.01em. */
  | "letterSpacing"

/**
 * Scalar token type names supported by Lexsys.
 */
export type ScalarTokenType = StandardScalarTokenType | LexsysScalarTokenType

/**
 * Composite token type names reserved for structured object values.
 *
 * These types are part of the long-term token model, but require
 * generator-specific support before they can be used by every output pipeline.
 */
export type CompositeTokenType =
  /** Composite text style containing font family, size, weight, line-height, etc. */
  | "typography"
  /** Composite border style containing color, width, and stroke style. */
  | "border"
  /** Composite shadow style containing color, offsets, blur, and spread. */
  | "shadow"
  /** Composite transition style containing duration, delay, and easing. */
  | "transition"
  /** Composite blur/effect style. */
  | "blur"
  /** Composite gradient style containing type, stops, and direction. */
  | "gradient"

/**
 * Design token type names supported by the Lexsys token model.
 */
export type TokenType = ScalarTokenType | CompositeTokenType

/* -------------------------------------------------------------------------------------------------
 * Token values
 * ------------------------------------------------------------------------------------------------- */

/**
 * Scalar values supported by Lexsys token leaves.
 *
 * Lexsys intentionally excludes boolean and null token values from the next
 * token authoring model.
 */
export type TokenScalarValue = string | number

/**
 * Platform-neutral dimension, duration, or unit-based token value.
 *
 * CSS output can serialize this shape back to strings such as "16px", "1rem",
 * "150ms", or "0.2s".
 */
export interface TokenUnitValue {
  value: number
  unit: string
}

/**
 * Platform-neutral color token value.
 *
 * `hex` is an optional fallback for tools that cannot consume the selected
 * color space directly. The canonical value remains `colorSpace` plus
 * `components`.
 */
export interface TokenColorValue {
  colorSpace: "oklch" | "srgb" | "display-p3"
  components: readonly number[]
  alpha?: number
  hex?: string
}

/**
 * Structured token values supported by the Lexsys token model.
 */
export type TokenStructuredValue = TokenUnitValue | TokenColorValue

/**
 * Token values supported by the Lexsys DTCG-shaped authoring model.
 *
 * Composite DTCG values such as shadow, border, transition, and typography can
 * be added when their generators and validators are implemented.
 */
export type TokenValue = TokenScalarValue | TokenStructuredValue

/* -------------------------------------------------------------------------------------------------
 * Token metadata
 * ------------------------------------------------------------------------------------------------- */

/**
 * Shared metadata fields allowed on token leaves and token branches.
 *
 * `$description` documents the purpose or intended usage of a token or branch.
 *
 * `$deprecated` follows the DTCG lifecycle convention:
 * - `true` marks a token or branch as deprecated
 * - `string` marks it as deprecated and explains why or what to use instead
 */
export interface TokenMetadata {
  $description?: string
  $deprecated?: boolean | string
  $type?: TokenType
}

/**
 * Metadata value allowed on DTCG `$`-prefixed branch keys.
 */
export type TokenMetadataValue = TokenMetadata[keyof TokenMetadata]

/* -------------------------------------------------------------------------------------------------
 * Token tree
 * ------------------------------------------------------------------------------------------------- */

/**
 * Token leaf shape used by the next authoring tree.
 *
 * The `$`-prefixed keys follow the Design Tokens Community Group format.
 */
export interface TokenLeaf<
  TValue extends TokenValue = TokenValue,
> extends TokenMetadata {
  $value: TValue
}

/**
 * Recursive branch node used by the next DTCG-shaped token model.
 *
 * Token branches may contain DTCG-style metadata without being treated as token
 * leaves during traversal or reference resolution.
 *
 * TypeScript cannot cleanly express:
 * "metadata keys may have metadata values, but all other keys must be token
 * leaves or token branches."
 *
 * Because of that, this index signature intentionally allows metadata values.
 * Runtime validators must reject invalid non-metadata scalar branches.
 */
export interface TokenBranch extends TokenMetadata {
  [key: string]: TokenLeaf | TokenBranch | TokenMetadataValue
}

/**
 * Token tree root used by resolver and generator inputs.
 */
export type TokenTree = TokenBranch

/**
 * Any node in the DTCG-shaped token tree.
 */
export type TokenNode = TokenLeaf | TokenBranch
