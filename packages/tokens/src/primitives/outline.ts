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


import { primitiveTokens } from "../types/authoring"

export const outlinePrimitives = primitiveTokens("outline", {
  $description:
    "Raw outline width and offset values used as the source for focus and state outline semantics.",

  width: {
    $type: "dimension",
    $description: "Raw outline width scale.",

    none: { $value: { value: 0, unit: "px" } },
    hairline: { $value: { value: 1, unit: "px" } },
    thin: { $value: { value: 2, unit: "px" } },
    medium: { $value: { value: 3, unit: "px" } },
    thick: { $value: { value: 4, unit: "px" } },
  },

  offset: {
    $type: "dimension",
    $description: "Raw outline offset scale.",

    none: { $value: { value: 0, unit: "px" } },
    xs: { $value: { value: 1, unit: "px" } },
    sm: { $value: { value: 2, unit: "px" } },
    md: { $value: { value: 4, unit: "px" } },
    lg: { $value: { value: 6, unit: "px" } },
    xl: { $value: { value: 8, unit: "px" } },
  },

})
