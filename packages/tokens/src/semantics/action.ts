/**
 * action.ts
 *
 * @layer semantics
 * @description Defines semantic action color roles for interactive UI states.
 */

import type { SemanticTokenGroup } from "../types"

export const actionSemantics: SemanticTokenGroup = {
  name: "action",

  primary: {
    $type: "color",
    base: { $value: "{brand.color.primary.base}" },
    hover: { $value: "{brand.color.primary.hover}" },
    active: { $value: "{brand.color.primary.active}" },
    disabled: { $value: "{brand.color.primary.disabled}" },
  },

  secondary: {
    $type: "color",
    base: { $value: "{color.neutral.100}" },
    hover: { $value: "{color.neutral.200}" },
    active: { $value: "{color.neutral.300}" },
    disabled: { $value: "{color.neutral.100}" },
  },

  danger: {
    $type: "color",
    base: { $value: "{color.red.600}" },
    hover: { $value: "{color.red.700}" },
    active: { $value: "{color.red.800}" },
    disabled: { $value: "{color.red.300}" },
  },
}
