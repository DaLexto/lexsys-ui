/**
 * z-index.ts
 *
 * @layer primitives
 * @description Defines the raw primitive z-index scale used by the token system.
 *
 * @responsibility
 * - Provides reusable stacking order values
 * - Keeps raw layering decisions centralized in the primitive layer
 * - Serves as the source for semantic elevation, overlay, and component stacking mappings
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic elevation or layering tokens should map from this file
 * - Components must not consume primitive z-index values directly
 *
 * @notes
 * - This file contains raw stacking values only
 * - It does not define semantic usage such as dropdown, modal, toast, or tooltip layers
 * - Z-index tokens use the DTCG `number` type
 * - Semantic tokens should assign meaning to these raw layers before components consume them
 */

import type { PrimitiveTokenGroup } from "../types/index.js"

export const zIndexPrimitives: PrimitiveTokenGroup = {
  name: "z-index",
  $description:
    "Raw z-index scale used as the source for stacking and overlay semantics.",
  $type: "number",

  base: {
    $value: 0,
    $description: "Base stacking level for normal document flow.",
  },

  raised: {
    $value: 10,
    $description: "Low stacking level for slightly raised local elements.",
  },

  sticky: {
    $value: 100,
    $description: "Stacking level for sticky or pinned interface regions.",
  },

  dropdown: {
    $value: 1000,
    $description: "Stacking level for dropdown-like floating surfaces.",
  },

  overlay: {
    $value: 2000,
    $description:
      "Stacking level for overlay backdrops and page-blocking layers.",
  },

  modal: {
    $value: 3000,
    $description: "Stacking level for modal dialogs and blocking overlays.",
  },

  popover: {
    $value: 4000,
    $description:
      "Stacking level for popovers, menus, and floating panels above modals when needed.",
  },

  toast: {
    $value: 5000,
    $description:
      "Stacking level for toast notifications and global transient feedback.",
  },

  tooltip: {
    $value: 6000,
    $description:
      "Stacking level for tooltips and highest-priority contextual hints.",
  },

  max: {
    $value: 9999,
    $description:
      "Maximum reserved stacking level for exceptional escape-hatch cases.",
  },
}
