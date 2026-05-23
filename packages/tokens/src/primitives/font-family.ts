/**
 * font-family.ts
 *
 * @layer primitives
 * @description Defines the raw primitive font family stacks used by the token system.
 *
 * @responsibility
 * - Provides reusable typeface stacks for typography semantics
 * - Keeps raw font family decisions centralized in the primitive layer
 * - Serves as the source for semantic typography mappings
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic typography tokens should map from this file
 * - Components must not consume primitive font families directly
 *
 * @notes
 * - This file contains raw font family stacks only
 * - It does not define semantic usage such as body, heading, code, or label text
 * - Font stacks are ordered from preferred typeface to generic fallback
 */

import { primitiveTokens } from "../types/authoring"

export const fontFamilyPrimitives = primitiveTokens("font-family", {
  $type: "fontFamily",
  $description:
    "Raw font family stacks used as the source for typography semantics.",

  sans: {
    $value:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  serif: {
    $value: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  },

  mono: {
    $value:
      '"JetBrains Mono", "Cascadia Code", "SFMono-Regular", Consolas, "Liberation Mono", monospace',
  },
})
