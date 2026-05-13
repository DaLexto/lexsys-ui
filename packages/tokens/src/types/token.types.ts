/**
 * token.types.ts
 *
 * @layer types
 * @description Core token tree authoring contracts.
 * @standard Design Tokens Community Group Format
 * @see https://design-tokens.github.io/community-group/format/
 */

/**
 * Token categories currently supported by Neurex authoring and output layers.
 */
export type TokenType =
  | "color"
  | "dimension"
  | "fontFamily"
  | "fontWeight"
  | "duration"
  | "cubicBezier"
  | "number"
  | "strokeStyle"
  | "border"
  | "transition"
  | "shadow"
  | "gradient"
  | "typography"

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
