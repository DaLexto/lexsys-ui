/**
 * index.ts
 *
 * @layer generators
 * @description Public entry point for the CSS variables generator.
 *
 * @responsibility
 * - Expose CSS variable generator API
 * - Expose CSS variable generator types
 *
 * @notes
 * - Internal generator utilities are intentionally not exported.
 * - This generator maps token references to CSS var() references.
 */

export {
  createCssBlock,
  createCssVariableEntries,
  generateCssVariables,
  toCustomProperty,
} from "./css.generator"

export type {
  CssVariableEntry,
  CssVarsGenerateResult,
  CssVarsGeneratorOptions,
} from "./css.types"
