/**
 * token.types.ts
 *
 * @layer types
 * @description Core token tree authoring contracts.
 * @standard Design Tokens Community Group Format
 * @see https://design-tokens.github.io/community-group/format/
 */

/**
 * Scalar token type names supported by the Neurex DTCG-shaped token model.
 *
 * Scalar tokens represent individual values that can usually be emitted as a
 * single CSS custom property.
 */
export type ScalarTokenType =
  /** Color values in any valid CSS-compatible format. */
  | "color"
  /** Length, distance, or size values such as px, rem, em, or %. */
  | "dimension"
  /** Unitless numerical values such as opacity, scale, or line-height. */
  | "number"
  /** Time values for motion such as 150ms or 0.2s. */
  | "duration"
  /** Easing curve values, currently authored as CSS-compatible strings. */
  | "cubicBezier"
  /** Typeface names or CSS font stacks, currently authored as strings. */
  | "fontFamily"
  /** Font weight values such as 400, 500, 700, or supported keywords. */
  | "fontWeight"
  /** Font size values, typically emitted as dimensions. */
  | "fontSize"
  /** Vertical spacing between lines, usually unitless in Neurex. */
  | "lineHeight"
  /** Horizontal spacing between characters such as 0em or -0.01em. */
  | "letterSpacing"
  /** Stroke pattern styles such as solid, dashed, or dotted. */
  | "strokeStyle"
  /** External resource references such as icons, images, or font files. */
  | "asset"

/**
 * Composite token type names reserved for structured object values.
 *
 * These types are part of the long-term DTCG-shaped model, but require
 * generator-specific support before they can be used by the CSS pipeline.
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
 * Design token type names supported by the Neurex token model.
 */
export type TokenType = ScalarTokenType | CompositeTokenType

/**
 * Primitive values currently supported by the CSS-oriented token pipeline.
 *
 * Composite DTCG values such as shadow, border, transition, and typography can
 * be added when their generators are implemented.
 */
export type TokenPrimitive = string | number

/**
 * Token leaf shape used by the authoring tree.
 *
 * The `$`-prefixed keys follow the Design Tokens Community Group format.
 */
export interface TokenLeaf {
  $value: TokenPrimitive
  $type?: TokenType
  $description?: string
}

/**
 * Token nodes are either token leaves or nested token branches.
 */
export type TokenNode = TokenLeaf | TokenTree

/**
 * Recursive token tree used across primitives, brand, semantics, themes, and
 * component token groups.
 */
export interface TokenTree {
  [key: string]: TokenNode
}

/**
 * Flat token representation consumed by CSS-oriented generators.
 */
export interface TokenEntry {
  name: string
  value: string
  type?: TokenType
}