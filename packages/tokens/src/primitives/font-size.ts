/**
 * font-size.ts
 *
 * @layer primitives
 * @description Defines the raw primitive font size scale used by the token system.
 *
 * @responsibility
 * - Provides reusable text size values for typography semantics
 * - Keeps raw font size decisions centralized in the primitive layer
 * - Serves as the source for semantic typography size mappings
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic typography tokens should map from this file
 * - Components must not consume primitive font sizes directly
 *
 * @notes
 * - This file contains raw font size values only
 * - It does not define semantic usage such as body, heading, label, or caption text
 * - Font size tokens use the DTCG `fontSize` type even though values emit as CSS dimensions
 */

import type { PrimitiveTokenGroup } from "../types"

export const fontSizePrimitives: PrimitiveTokenGroup = {
  name: "font-size",
  $type: "fontSize",
  $description:
    "Raw font size scale used as the source for typography semantics.",

  xs: { $value: "0.75rem" },
  sm: { $value: "0.875rem" },
  base: { $value: "1rem" },
  lg: { $value: "1.125rem" },
  xl: { $value: "1.25rem" },
  "2xl": { $value: "1.5rem" },
  "3xl": { $value: "1.875rem" },
  "4xl": { $value: "2.25rem" },
  "5xl": { $value: "3rem" },
  "6xl": { $value: "3.75rem" },
  "7xl": { $value: "4.5rem" },
  "8xl": { $value: "6rem" },
  "9xl": { $value: "8rem" },
}
