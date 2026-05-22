/**
 * border.ts
 *
 * @layer semantics
 * @description Defines semantic border color roles.
 */

import { semanticTokens } from "../types/authoring"

export const borderSemantics = semanticTokens("border", {
  $type: "color",

  default: { $value: "{color.neutral.200}" },
  strong: { $value: "{color.neutral.400}" },
  focus: { $value: "{brand.color.primary.base}" },
  accent: { $value: "{brand.color.accent.base}" },

  control: {
    $type: "border",
    color: { $value: "{color.neutral.200}" },
    width: { $value: "{border.thin}" },
    style: { $value: "solid" },
  },
})
