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
      "Semantic viewport breakpoint roles mapped from primitive breakpoint.*. Keys align with the breakpoint scale.",

    sm: {
      $description: "Mobile viewport.",
      $value: "{breakpoint.sm}",
    },
    md: {
      $description: "Tablet viewport.",
      $value: "{breakpoint.md}",
    },
    lg: {
      $description: "Desktop viewport.",
      $value: "{breakpoint.lg}",
    },
    xl: {
      $description: "Wide viewport.",
      $value: "{breakpoint.xl}",
    },
    "2xl": {
      $description: "Ultrawide viewport.",
      $value: "{breakpoint.2xl}",
    },
    full: {
      $description: "Full dynamic viewport height.",
      $value: { value: 100, unit: "dvh" },
    },
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
