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
      color: { $value: "{shadow.4.color}" },
      inset: { $value: "{shadow.4.inset}" },
      offsetX: { $value: "{shadow.4.offsetX}" },
      offsetY: { $value: "{shadow.4.offsetY}" },
      blur: { $value: "{shadow.4.blur}" },
      spread: { $value: "{shadow.4.spread}" },
      boxShadow: { $value: "{shadow.4.boxShadow}" },
    },
    raised: {
      color: { $value: "{shadow.5.color}" },
      inset: { $value: "{shadow.5.inset}" },
      offsetX: { $value: "{shadow.5.offsetX}" },
      offsetY: { $value: "{shadow.5.offsetY}" },
      blur: { $value: "{shadow.5.blur}" },
      spread: { $value: "{shadow.5.spread}" },
      boxShadow: { $value: "{shadow.5.boxShadow}" },
    },
  },
})
