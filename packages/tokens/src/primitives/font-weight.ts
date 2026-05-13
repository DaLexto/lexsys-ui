/**
 * font-weight.ts
 *
 * @layer primitives
 * @description Defines the raw primitive font weight scale used by the token system.
 *
 * @responsibility
 * - Provides reusable font weight values for typography semantics
 * - Keeps raw font weight decisions centralized in the primitive layer
 * - Serves as the source for semantic typography weight mappings
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic typography tokens should map from this file
 * - Components must not consume primitive font weights directly
 *
 * @notes
 * - This file contains raw font weight values only
 * - It does not define semantic usage such as regular, strong, heading, or label text
 * - Numeric values are kept as strings to preserve stable CSS output behavior
 */

import type { PrimitiveTokenGroup } from "../types"

export const fontWeightPrimitives: PrimitiveTokenGroup = {
  name: "font-weight",
  $description: "Raw font weight scale used as the source for typography semantics.",

  thin: { $value: "100", $type: "fontWeight" },
  extralight: { $value: "200", $type: "fontWeight" },
  light: { $value: "300", $type: "fontWeight" },
  normal: { $value: "400", $type: "fontWeight" },
  medium: { $value: "500", $type: "fontWeight" },
  semibold: { $value: "600", $type: "fontWeight" },
  bold: { $value: "700", $type: "fontWeight" },
  extrabold: { $value: "800", $type: "fontWeight" },
  black: { $value: "900", $type: "fontWeight" },
}