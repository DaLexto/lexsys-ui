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
    $description: "Raw outline width scale.",

    none: { $value: "0", $type: "dimension" },
    hairline: { $value: "1px", $type: "dimension" },
    thin: { $value: "2px", $type: "dimension" },
    medium: { $value: "3px", $type: "dimension" },
    thick: { $value: "4px", $type: "dimension" },
  },

  offset: {
    $description: "Raw outline offset scale.",

    none: { $value: "0", $type: "dimension" },
    xs: { $value: "1px", $type: "dimension" },
    sm: { $value: "2px", $type: "dimension" },
    md: { $value: "4px", $type: "dimension" },
    lg: { $value: "6px", $type: "dimension" },
    xl: { $value: "8px", $type: "dimension" },
  },
}