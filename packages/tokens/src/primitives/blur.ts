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


import { primitiveTokens } from "../types/authoring"

export const blurPrimitives = primitiveTokens("blur", {
  $type: "dimension",
  $description:
    "Raw blur radius scale used as the source for effect and surface treatment semantics.",

  none: { $value: { value: 0, unit: "px" } },
  xs: { $value: { value: 2, unit: "px" } },
  sm: { $value: { value: 4, unit: "px" } },
  md: { $value: { value: 8, unit: "px" } },
  lg: { $value: { value: 12, unit: "px" } },
  xl: { $value: { value: 16, unit: "px" } },
  "2xl": { $value: { value: 24, unit: "px" } },
  "3xl": { $value: { value: 40, unit: "px" } },

})
