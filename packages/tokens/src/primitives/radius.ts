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

import { primitiveTokens } from "../types/authoring"

export const radiusPrimitives = primitiveTokens("radius", {
  $type: "dimension",
  $description:
    "Raw border radius scale used as the source for shape semantics.",

  none: { $value: { value: 0, unit: "px" } },
  sm: { $value: { value: 0.25, unit: "rem" } },
  md: { $value: { value: 0.375, unit: "rem" } },
  lg: { $value: { value: 0.5, unit: "rem" } },
  xl: { $value: { value: 0.75, unit: "rem" } },
  "2xl": { $value: { value: 1, unit: "rem" } },
  full: { $value: { value: 9999, unit: "px" } },
})
