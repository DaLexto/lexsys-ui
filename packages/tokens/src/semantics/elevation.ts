/**
 * elevation.ts
 *
 * @layer semantics
 * @description Defines reusable stacking and shadow roles for overlays and floating surfaces.
 */

import { semanticTokens } from "../types/authoring"

export const elevationSemantics = semanticTokens("elevation", {
  backdrop: {
    zIndex: { $value: "{z-index.overlay}", $type: "number" },
  },
  layer: {
    zIndex: { $value: "{z-index.modal}", $type: "number" },
  },
  floating: {
    zIndex: { $value: "{z-index.popover}", $type: "number" },
  },
  toast: {
    zIndex: { $value: "{z-index.toast}", $type: "number" },
  },
  tooltip: {
    zIndex: { $value: "{z-index.tooltip}", $type: "number" },
  },
  shadow: {
    $type: "shadow",
    floating: {
      color: {
        $value: {
          colorSpace: "oklch",
          components: [0, 0, 0],
          alpha: 0.12,
          hex: "#000000",
        },
      },
      offsetX: { $value: "0" },
      offsetY: { $value: "8px" },
      blur: { $value: "16px" },
      spread: { $value: "0" },
      boxShadow: { $value: "{shadow.4}" },
    },
    raised: {
      color: {
        $value: {
          colorSpace: "oklch",
          components: [0, 0, 0],
          alpha: 0.14,
          hex: "#000000",
        },
      },
      offsetX: { $value: "0" },
      offsetY: { $value: "16px" },
      blur: { $value: "32px" },
      spread: { $value: "0" },
      boxShadow: { $value: "{shadow.5}" },
    },
  },
})
