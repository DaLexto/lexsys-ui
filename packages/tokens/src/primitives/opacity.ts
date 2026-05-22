/**
 * opacity.ts
 *
 * @layer primitives
 * @description Defines the raw primitive opacity scale used by the token system.
 *
 * @responsibility
 * - Provides reusable alpha values for transparency decisions
 * - Keeps raw opacity decisions centralized in the primitive layer
 * - Serves as the source for semantic state, overlay, and disabled mappings
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic opacity tokens should map from this file
 * - Components must not consume primitive opacity values directly
 *
 * @notes
 * - This file contains raw opacity values only
 * - It does not define semantic usage such as disabled, overlay, hover, or muted states
 * - Opacity tokens use the DTCG `number` type
 * - Values are unitless numbers from 0 to 1
 */


import { primitiveTokens } from "../types/authoring"

export const opacityPrimitives = primitiveTokens("opacity", {
  $type: "number",
  $description:
    "Raw opacity scale used as the source for transparency and state semantics.",

  0: { $value: 0 },
  5: { $value: 0.05 },
  10: { $value: 0.1 },
  20: { $value: 0.2 },
  30: { $value: 0.3 },
  40: { $value: 0.4 },
  50: { $value: 0.5 },
  60: { $value: 0.6 },
  70: { $value: 0.7 },
  80: { $value: 0.8 },
  90: { $value: 0.9 },
  100: { $value: 1 },

})
