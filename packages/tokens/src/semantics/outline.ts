/**
 * outline.ts
 *
 * @layer semantics
 * @description Reusable outline width and offset roles for focus and state rings.
 */

import { semanticTokens } from "../types/authoring"

export const outlineSemantics = semanticTokens("outline", {
  width: {
    $type: "dimension",
    $description: "Semantic outline width roles mapped from primitive outline.width.",

    focus: { $value: "{outline.width.thin}" },
    inset: { $value: "{outline.width.thin}" },
    zero: { $value: "{outline.width.none}" },
  },

  offset: {
    $type: "dimension",
    $description: "Semantic outline offset roles mapped from primitive outline.offset.",

    focus: { $value: "{outline.offset.sm}" },
    zero: { $value: "{outline.offset.none}" },
  },
})
