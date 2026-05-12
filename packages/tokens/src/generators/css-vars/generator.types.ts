/**
 * css-vars-generator.types.ts
 *
 * @layer generators
 * @description Type contracts for the CSS variables generator.
 *
 * @responsibility
 * - Define CSS variable generator options
 * - Define CSS variable entries
 * - Keep CSS output types separate from token authoring types
 *
 * @notes
 * - This generator is CSS-specific.
 * - It does not resolve token references to final primitive values.
 * - Token references are mapped to CSS variable references.
 */

/**
 * CSS variable entry created from a token leaf.
 */
export interface CssVariableEntry {
  name: string
  value: string
}

/**
 * Options used when generating CSS variable names and values.
 */
export interface CssVarsGeneratorOptions {
  /**
   * Prefix used for generated CSS custom properties.
   *
   * Example:
   * cssVarPrefix: "nx"
   * --nx-color-primary
   */
  cssVarPrefix: string

  /**
   * Optional group/path name overrides.
   *
   * Example:
   * "motion-duration" -> "duration"
   */
  groupNameOverrides?: Readonly<Record<string, string>>

  /**
   * Metadata keys that should be ignored during token traversal.
   */
  metadataKeys?: ReadonlySet<string>
}

/**
 * Result returned by CSS variable generation.
 */
export interface CssVarsGenerateResult {
  entries: CssVariableEntry[]
  css: string
}
