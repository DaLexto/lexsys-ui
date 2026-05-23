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
 * - Scales 0–6 and inner use branch + slot leaves; CSS generator composes boxShadow from slots
 * - boxShadow shorthand leaves preserve full CSS (including multi-layer strings) for export
 */

import { primitiveTokens } from "../types/authoring"

const shadowColor = (alpha: number) => ({
  $value: {
    colorSpace: "oklch" as const,
    components: [0, 0, 0] as [number, number, number],
    alpha,
    hex: "#000000",
  },
})

const shadowScaleStep = (options: {
  description: string
  offsetY: string
  blur: string
  alpha: number
  boxShadow: string
}) => ({
  $description: options.description,
  color: shadowColor(options.alpha),
  offsetX: { $value: "0" },
  offsetY: { $value: options.offsetY },
  blur: { $value: options.blur },
  spread: { $value: "0" },
  inset: { $value: "" },
  boxShadow: {
    $value: options.boxShadow,
    $description:
      "Full CSS shadow string; slot vars compose the primary layer for boxShadow output.",
  },
})

export const shadowPrimitives = primitiveTokens("shadow", {
  $type: "shadow",
  $description:
    "Raw shadow scale used as the source for elevation, depth, and surface layering semantics.",

  0: {
    $description: "No shadow. Used as the base elevation reset.",
    color: shadowColor(0),
    offsetX: { $value: "0" },
    offsetY: { $value: "0" },
    blur: { $value: "0" },
    spread: { $value: "0" },
    inset: { $value: "" },
    boxShadow: { $value: "none" },
  },

  1: shadowScaleStep({
    description: "Subtle shadow for minimally raised surfaces.",
    offsetY: "1px",
    blur: "2px",
    alpha: 0.06,
    boxShadow: "0 1px 2px rgb(0 0 0 / 0.06), 0 1px 1px rgb(0 0 0 / 0.04)",
  }),

  2: shadowScaleStep({
    description: "Low shadow for small elevated surfaces and controls.",
    offsetY: "2px",
    blur: "4px",
    alpha: 0.08,
    boxShadow: "0 2px 4px rgb(0 0 0 / 0.08), 0 1px 2px rgb(0 0 0 / 0.06)",
  }),

  3: shadowScaleStep({
    description: "Medium shadow for cards and raised containers.",
    offsetY: "4px",
    blur: "8px",
    alpha: 0.1,
    boxShadow: "0 4px 8px rgb(0 0 0 / 0.10), 0 2px 4px rgb(0 0 0 / 0.08)",
  }),

  4: shadowScaleStep({
    description:
      "High shadow for floating surfaces such as popovers and menus.",
    offsetY: "8px",
    blur: "16px",
    alpha: 0.12,
    boxShadow: "0 8px 16px rgb(0 0 0 / 0.12), 0 4px 8px rgb(0 0 0 / 0.08)",
  }),

  5: shadowScaleStep({
    description:
      "Strong shadow for prominent overlays such as dialogs and drawers.",
    offsetY: "16px",
    blur: "32px",
    alpha: 0.14,
    boxShadow: "0 16px 32px rgb(0 0 0 / 0.14), 0 8px 16px rgb(0 0 0 / 0.10)",
  }),

  6: shadowScaleStep({
    description:
      "Maximum shadow for highest elevation surfaces and dramatic depth.",
    offsetY: "24px",
    blur: "48px",
    alpha: 0.16,
    boxShadow: "0 24px 48px rgb(0 0 0 / 0.16), 0 12px 24px rgb(0 0 0 / 0.12)",
  }),

  inner: {
    $description:
      "Inset shadow for pressed, recessed, or contained surface effects.",
    color: shadowColor(0.08),
    offsetX: { $value: "0" },
    offsetY: { $value: "1px" },
    blur: { $value: "2px" },
    spread: { $value: "0" },
    inset: { $value: "inset" },
    boxShadow: {
      $value: "inset 0 1px 2px rgb(0 0 0 / 0.08)",
      $description:
        "Full CSS shadow string; slot vars compose the inset layer for boxShadow output.",
    },
  },
})
