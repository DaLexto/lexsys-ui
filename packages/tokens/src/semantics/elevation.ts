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
    floating: { $value: "{shadow.4}" },
    raised: { $value: "{shadow.5}" },
  },
})
