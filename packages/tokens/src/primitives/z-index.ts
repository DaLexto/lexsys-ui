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

import { primitiveTokens } from "../types/authoring"

export const zIndexPrimitives = primitiveTokens("z-index", {
  $type: "number",
  $description:
    "Raw z-index scale used as the source for stacking and overlay semantics.",

  base: {
    $description: "Base stacking level for normal document flow.",
    $value: 0,
  },

  behind: {
    $description:
      "Negative stacking level for decorative layers behind content.",
    $value: -10,
  },

  local: {
    $description:
      "Local stacking level for handles and controls within a bounded surface.",
    $value: 30,
  },

  raised: {
    $description: "Low stacking level for slightly raised local elements.",
    $value: 10,
  },

  sticky: {
    $description: "Stacking level for sticky or pinned interface regions.",
    $value: 100,
  },

  dropdown: {
    $description: "Stacking level for dropdown-like floating surfaces.",
    $value: 1000,
  },

  overlay: {
    $description:
      "Stacking level for overlay backdrops and page-blocking layers.",
    $value: 2000,
  },

  modal: {
    $description: "Stacking level for modal dialogs and blocking overlays.",
    $value: 3000,
  },

  popover: {
    $description:
      "Stacking level for popovers, menus, and floating panels above modals when needed.",
    $value: 4000,
  },

  toast: {
    $description:
      "Stacking level for toast notifications and global transient feedback.",
    $value: 5000,
  },

  tooltip: {
    $description:
      "Stacking level for tooltips and highest-priority contextual hints.",
    $value: 6000,
  },

  max: {
    $description:
      "Maximum reserved stacking level for exceptional escape-hatch cases.",
    $value: 9999,
  },
})
