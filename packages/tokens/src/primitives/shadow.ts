/**
 * shadow.ts
 *
 * @layer primitives
 * @description Defines the raw primitive shadow scale used by the token system.
 *
 * @responsibility
 * - Provides reusable shadow values for elevation and depth
 * - Keeps raw shadow decisions centralized in the primitive layer
 * - Serves as the source for semantic elevation and component shadow mappings
 *
 * @usage
 * - Use these values only as primitive token sources
 * - Semantic elevation tokens should map from this file
 * - Components must not consume primitive shadows directly
 *
 * @notes
 * - This file contains raw shadow values only
 * - It does not define semantic usage such as card, popover, dialog, or tooltip elevation
 * - Shadow values are currently authored as CSS-compatible strings
 * - Structured DTCG shadow objects can replace these strings when composite shadow generation is implemented
 */


import { primitiveTokens } from "../types/authoring"

export const shadowPrimitives = primitiveTokens("shadow", {
  $type: "shadow",
  $description:
    "Raw shadow scale used as the source for elevation, depth, and surface layering semantics.",

  0: {
    $description: "No shadow. Used as the base elevation reset.",
    $value: "none",
  },

  1: {
    $description: "Subtle shadow for minimally raised surfaces.",
    $value: "0 1px 2px rgb(0 0 0 / 0.06), 0 1px 1px rgb(0 0 0 / 0.04)",
  },

  2: {
    $description: "Low shadow for small elevated surfaces and controls.",
    $value: "0 2px 4px rgb(0 0 0 / 0.08), 0 1px 2px rgb(0 0 0 / 0.06)",
  },

  3: {
    $description: "Medium shadow for cards and raised containers.",
    $value: "0 4px 8px rgb(0 0 0 / 0.10), 0 2px 4px rgb(0 0 0 / 0.08)",
  },

  4: {
    $description:
      "High shadow for floating surfaces such as popovers and menus.",
    $value: "0 8px 16px rgb(0 0 0 / 0.12), 0 4px 8px rgb(0 0 0 / 0.08)",
  },

  5: {
    $description:
      "Strong shadow for prominent overlays such as dialogs and drawers.",
    $value: "0 16px 32px rgb(0 0 0 / 0.14), 0 8px 16px rgb(0 0 0 / 0.10)",
  },

  6: {
    $description:
      "Maximum shadow for highest elevation surfaces and dramatic depth.",
    $value: "0 24px 48px rgb(0 0 0 / 0.16), 0 12px 24px rgb(0 0 0 / 0.12)",
  },

  inner: {
    $description:
      "Inset shadow for pressed, recessed, or contained surface effects.",
    $value: "inset 0 1px 2px rgb(0 0 0 / 0.08)",
  },

})
