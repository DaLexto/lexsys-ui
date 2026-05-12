/**
 * css-vars-generator.ts
 *
 * @layer generators
 * @description CSS custom property generator for Neurex token trees.
 *
 * @responsibility
 * - Generate CSS variable entries from Neurex token trees
 * - Serialize CSS custom properties into selector blocks
 * - Preserve CSS variable reference chains
 *
 * @notes
 * - This generator is CSS-output-specific.
 * - It maps {token.path} references to var(--nx-token-path).
 * - It does not resolve references to final primitive values.
 */

import type { TokenTree } from "../../types/index.js"
import { flattenTokenTree as flattenSharedTokenTree } from "../shared/index.js"

import type {
  CssVariableEntry,
  CssVarsGenerateResult,
  CssVarsGeneratorOptions,
} from "./generator.types.js"

import {
  createDefaultCssVarsGeneratorOptions,
  toCssVariableEntry,
  toCssVarName,
} from "./generator.utils.js"

/* -------------------------------------------------------------------------------------------------
 * CSS serialization
 * ------------------------------------------------------------------------------------------------- */

export const toCustomProperty = (
  entry: CssVariableEntry,
  options: Required<CssVarsGeneratorOptions>,
): string => {
  return `  ${toCssVarName(entry.name, options)}: ${entry.value};`
}

export const createCssBlock = (
  selector: string,
  entries: CssVariableEntry[],
  options: Required<CssVarsGeneratorOptions>,
  leadingLines: string[] = [],
): string => {
  return [
    `${selector} {`,
    ...leadingLines.map((line) => `  ${line}`),
    ...entries.map((entry) => toCustomProperty(entry, options)),
    "}",
  ].join("\n")
}

/* -------------------------------------------------------------------------------------------------
 * Entry generation
 * ------------------------------------------------------------------------------------------------- */

export const createCssVariableEntries = (
  tree: TokenTree,
  options: CssVarsGeneratorOptions,
  path: string[] = [],
): CssVariableEntry[] => {
  const resolvedOptions = createDefaultCssVarsGeneratorOptions(options)

  return flattenSharedTokenTree(tree, resolvedOptions.metadataKeys, path)
    .map((entry) => toCssVariableEntry(entry, resolvedOptions))
    .filter((entry): entry is CssVariableEntry => entry !== null)
}

/* -------------------------------------------------------------------------------------------------
 * Full CSS generation
 * ------------------------------------------------------------------------------------------------- */

export const generateCssVariables = (
  tree: TokenTree,
  options: CssVarsGeneratorOptions,
  selector = ":root",
  path: string[] = [],
): CssVarsGenerateResult => {
  const resolvedOptions = createDefaultCssVarsGeneratorOptions(options)
  const entries = flattenSharedTokenTree(
    tree,
    resolvedOptions.metadataKeys,
    path,
  )
    .map((entry) => toCssVariableEntry(entry, resolvedOptions))
    .filter((entry): entry is CssVariableEntry => entry !== null)

  return {
    entries,
    css: createCssBlock(selector, entries, resolvedOptions),
  }
}
