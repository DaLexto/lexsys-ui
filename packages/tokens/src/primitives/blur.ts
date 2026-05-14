/**
 * blur.ts
 *
 * @layer primitives
 * @description Defines the raw primitive blur radius scale used by the token system.
 *
 * @responsibility
 * - Provides reusable blur radius values for visual effects
 * - Keeps raw blur decisions centralized in the primitive layer
 * - Serves as the source for semantic effect and surface treatment mappings
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic effect tokens should map from this file
 * - Components must not consume primitive blur values directly
 *
 * @notes
 * - This file contains raw blur radius values only
 * - It does not define semantic usage such as backdrop, overlay, glass, or disabled effects
 * - Blur radius tokens use the DTCG `dimension` type
 */

import type { PrimitiveTokenGroup } from "../types/index.js"

export const blurPrimitives: PrimitiveTokenGroup = {
  name: "blur",
  $type: "dimension",
  $description:
    "Raw blur radius scale used as the source for effect and surface treatment semantics.",

  none: { $value: "0" },
  xs: { $value: "2px" },
  sm: { $value: "4px" },
  md: { $value: "8px" },
  lg: { $value: "12px" },
  xl: { $value: "16px" },
  "2xl": { $value: "24px" },
  "3xl": { $value: "40px" },
}
