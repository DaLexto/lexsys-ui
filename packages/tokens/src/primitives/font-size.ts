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

import { primitiveTokens } from "../types/authoring"

export const fontSizePrimitives = primitiveTokens("font-size", {
  $type: "fontSize",
  $description:
    "Raw font size scale used as the source for typography semantics.",

  xs: { $value: { value: 0.75, unit: "rem" } },
  sm: { $value: { value: 0.875, unit: "rem" } },
  base: { $value: { value: 1, unit: "rem" } },
  lg: { $value: { value: 1.125, unit: "rem" } },
  xl: { $value: { value: 1.25, unit: "rem" } },
  "2xl": { $value: { value: 1.5, unit: "rem" } },
  "3xl": { $value: { value: 1.875, unit: "rem" } },
  "4xl": { $value: { value: 2.25, unit: "rem" } },
  "5xl": { $value: { value: 3, unit: "rem" } },
  "6xl": { $value: { value: 3.75, unit: "rem" } },
  "7xl": { $value: { value: 4.5, unit: "rem" } },
  "8xl": { $value: { value: 6, unit: "rem" } },
  "9xl": { $value: { value: 8, unit: "rem" } },
})
