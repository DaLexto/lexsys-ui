/**
 * radius.ts
 *
 * @layer primitives
 * @description Defines the raw primitive border radius scale used by the token system.
 *
 * @responsibility
 * - Provides reusable corner radius values for shape semantics
 * - Keeps raw radius decisions centralized in the primitive layer
 * - Serves as the source for semantic and component radius mappings
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic radius tokens should map from this file
 * - Components must not consume primitive radius values directly
 *
 * @notes
 * - This file contains raw radius values only
 * - It does not define semantic usage such as control, card, dialog, or pill radius
 * - Radius tokens use the DTCG `dimension` type
 */

import type { PrimitiveTokenGroup } from "../types/index.js"

export const radiusPrimitives: PrimitiveTokenGroup = {
  name: "radius",
  $description: "Raw border radius scale used as the source for shape semantics.",

  none: { $value: "0", $type: "dimension" },
  sm: { $value: "0.25rem", $type: "dimension" },
  md: { $value: "0.375rem", $type: "dimension" },
  lg: { $value: "0.5rem", $type: "dimension" },
  xl: { $value: "0.75rem", $type: "dimension" },
  "2xl": { $value: "1rem", $type: "dimension" },
  full: { $value: "9999px", $type: "dimension" },
}