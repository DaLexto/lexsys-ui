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
  $type: "fontWeight",
  $description:
    "Raw font weight scale used as the source for typography semantics.",

  thin: { $value: "100" },
  extralight: { $value: "200" },
  light: { $value: "300" },
  normal: { $value: "400" },
  medium: { $value: "500" },
  semibold: { $value: "600" },
  bold: { $value: "700" },
  extrabold: { $value: "800" },
  black: { $value: "900" },
}
