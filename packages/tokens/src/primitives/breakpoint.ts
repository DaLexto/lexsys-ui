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

import type { PrimitiveTokenGroup } from "../types/index.js"

export const breakpointPrimitives: PrimitiveTokenGroup = {
  name: "breakpoint",
  $description:
    "Raw responsive breakpoint scale used as the source for layout semantics.",
  $type: "dimension",

  sm: {
    $value: "40rem",
    $description:
      "Small viewport breakpoint, equivalent to 640px at a 16px root font size.",
  },

  md: {
    $value: "48rem",
    $description:
      "Medium viewport breakpoint, equivalent to 768px at a 16px root font size.",
  },

  lg: {
    $value: "64rem",
    $description:
      "Large viewport breakpoint, equivalent to 1024px at a 16px root font size.",
  },

  xl: {
    $value: "80rem",
    $description:
      "Extra-large viewport breakpoint, equivalent to 1280px at a 16px root font size.",
  },

  "2xl": {
    $value: "96rem",
    $description:
      "Double-extra-large viewport breakpoint, equivalent to 1536px at a 16px root font size.",
  },
}
