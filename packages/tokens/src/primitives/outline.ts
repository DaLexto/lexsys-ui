/**
 * outline.ts
 *
 * @layer primitives
 * @description Defines the raw primitive outline width and offset values used by the token system.
 *
 * @responsibility
 * - Provides reusable outline width values
 * - Provides reusable outline offset values
 * - Keeps raw focus and outline measurements centralized in the primitive layer
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic outline tokens should map from this file
 * - Components must not consume primitive outline values directly
 *
 * @notes
 * - This file contains raw outline measurement values only
 * - It does not define semantic usage such as focus, danger, selected, or invalid outlines
 * - Outline width and offset tokens use the DTCG `dimension` type
 */

import type { PrimitiveTokenGroup } from "../types/index.js"

export const outlinePrimitives: PrimitiveTokenGroup = {
  name: "outline",
  $description:
    "Raw outline width and offset values used as the source for focus and state outline semantics.",

  width: {
    $type: "dimension",
    $description: "Raw outline width scale.",

    none: { $value: "0" },
    hairline: { $value: "1px" },
    thin: { $value: "2px" },
    medium: { $value: "3px" },
    thick: { $value: "4px" },
  },

  offset: {
    $type: "dimension",
    $description: "Raw outline offset scale.",

    none: { $value: "0" },
    xs: { $value: "1px" },
    sm: { $value: "2px" },
    md: { $value: "4px" },
    lg: { $value: "6px" },
    xl: { $value: "8px" },
  },
}
