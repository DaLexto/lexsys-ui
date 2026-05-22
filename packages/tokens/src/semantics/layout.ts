/**
 * layout.ts
 *
 * @layer semantics
 * @description Reusable viewport breakpoint and aspect ratio roles for responsive layout.
 */

import { semanticTokens } from "../types/authoring"

export const layoutSemantics = semanticTokens("layout", {
  viewport: {
    $type: "dimension",
    $description:
      "Semantic viewport breakpoint roles mapped from primitive breakpoint.*.",

    mobile: { $value: "{breakpoint.sm}" },
    tablet: { $value: "{breakpoint.md}" },
    desktop: { $value: "{breakpoint.lg}" },
    wide: { $value: "{breakpoint.xl}" },
    ultrawide: { $value: "{breakpoint.2xl}" },
  },

  aspectRatio: {
    $type: "number",
    $description:
      "Semantic aspect ratio roles mapped from primitive aspect-ratio.*.",

    square: { $value: "{aspect-ratio.1-1}" },
    standard: { $value: "{aspect-ratio.4-3}" },
    photo: { $value: "{aspect-ratio.3-2}" },
    portrait: { $value: "{aspect-ratio.3-4}" },
    video: { $value: "{aspect-ratio.16-9}" },
    ultrawide: { $value: "{aspect-ratio.21-9}" },
  },
})
