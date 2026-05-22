/**
 * breakpoint.ts
 *
 * @layer primitives
 * @description Defines the raw primitive responsive breakpoint scale used by the token system.
 *
 * @responsibility
 * - Provides reusable viewport width thresholds
 * - Keeps raw responsive layout decisions centralized in the primitive layer
 * - Serves as the source for semantic layout and container mappings
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic layout tokens should map from this file
 * - Components must not consume primitive breakpoints directly
 *
 * @notes
 * - This file contains raw breakpoint values only
 * - It does not define semantic usage such as mobile, tablet, desktop, or wide layouts
 * - Breakpoint tokens use the DTCG `dimension` type
 */


import { primitiveTokens } from "../types/authoring"

export const breakpointPrimitives = primitiveTokens("breakpoint", {
  $type: "dimension",
  $description:
    "Raw responsive breakpoint scale used as the source for layout semantics.",

  sm: {
    $description:
      "Small viewport breakpoint, equivalent to 640px at a 16px root font size.",
    $value: { value: 40, unit: "rem" },
  },

  md: {
    $description:
      "Medium viewport breakpoint, equivalent to 768px at a 16px root font size.",
    $value: { value: 48, unit: "rem" },
  },

  lg: {
    $description:
      "Large viewport breakpoint, equivalent to 1024px at a 16px root font size.",
    $value: { value: 64, unit: "rem" },
  },

  xl: {
    $description:
      "Extra-large viewport breakpoint, equivalent to 1280px at a 16px root font size.",
    $value: { value: 80, unit: "rem" },
  },

  "2xl": {
    $description:
      "Double-extra-large viewport breakpoint, equivalent to 1536px at a 16px root font size.",
    $value: { value: 96, unit: "rem" },
  },

})
