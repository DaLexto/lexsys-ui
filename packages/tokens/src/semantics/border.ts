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
  focus: { $value: "{color.neutral.500}" },
  accent: { $value: "{brand.color.accent.base}" },

})
