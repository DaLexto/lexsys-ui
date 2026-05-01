/**
 * index.ts
 *
 * @layer types
 * @description Shared token system type contracts.
 *
 * @responsibility
 * - Define the Neurex token authoring shape
 * - Define shared token tree primitives used by resolver and generators
 * - Keep token group metadata flexible without allowing raw string token leaves
 *
 * @notes
 * - Token source files use object trees.
 * - Token leaves must use the { value } shape.
 * - CSS variable prefixes belong to output generation, not token authoring.
 */

/* -------------------------------------------------------------------------------------------------
 * Token primitives
 * ------------------------------------------------------------------------------------------------- */

/**
 * Primitive value that can be stored inside a token leaf.
 *
 * Notes:
 * - string is the main authoring format
 * - number/boolean/null are supported for generic generator compatibility
 * - null can be skipped by CSS generators
 */
export type TokenPrimitive = string | number | boolean | null

/**
 * Token leaf node.
 *
 * This is the only valid token value shape in Neurex authoring files.
 */
export interface TokenLeaf {
  value: TokenPrimitive
  description?: string
}

/**
 * Token tree node.
 *
 * A node can either be:
 * - a token leaf
 * - another nested token tree
 */
export type TokenNode = TokenLeaf | TokenTree

/**
 * Nested token tree.
 */
export interface TokenTree {
  [key: string]: TokenNode
}

/* -------------------------------------------------------------------------------------------------
 * Legacy/transitional generator support
 * ------------------------------------------------------------------------------------------------- */

/**
 * Flat token entry used by output generators.
 *
 * This is not the preferred token authoring format.
 * It is only used after flattening a token tree.
 */
export interface TokenEntry {
  name: string
  value: string
}

/**
 * Transitional group property type.
 *
 * Keep this while the current working outputs.ts still imports it.
 * New resolver/generator code should prefer unknown + runtime guards instead.
 */
export type TokenGroupProperty = unknown

/* -------------------------------------------------------------------------------------------------
 * Token groups
 * ------------------------------------------------------------------------------------------------- */

/**
 * Primitive token group.
 *
 * Example:
 * colorPrimitives = {
 *   name: "color",
 *   white: { value: "oklch(1 0 0)" }
 * }
 */
export interface PrimitiveTokenGroup {
  name: string
  [key: string]: unknown
}

/**
 * Semantic token group.
 *
 * Example:
 * colorSemantics = {
 *   name: "color",
 *   background: { value: "{color.white}" }
 * }
 */
export interface SemanticTokenGroup {
  name: string
  [key: string]: unknown
}

/**
 * Component token group.
 *
 * Example:
 * buttonTokens = {
 *   component: "button",
 *   radius: { value: "{radius.control}" }
 * }
 */
export interface ComponentTokenGroup {
  component: string
  [key: string]: unknown
}

/* -------------------------------------------------------------------------------------------------
 * Style presets and themes
 * ------------------------------------------------------------------------------------------------- */

export type StylePresetId = "default"

export type ThemeModeId = "light" | "dark"

export interface StylePresetDefinition {
  id: StylePresetId
  name: string
  description: string
  themeModes: ThemeModeId[]
}

export interface ThemeDefinition {
  name: ThemeModeId
  selector: ":root" | ".dark"
  colorScheme: ThemeModeId
  [key: string]: unknown
}

export type ThemeTokenMap = TokenTree

/* -------------------------------------------------------------------------------------------------
 * Style outputs
 * ------------------------------------------------------------------------------------------------- */

export interface StyleOutputs {
  tokensCss: string
  themeCss: string
}