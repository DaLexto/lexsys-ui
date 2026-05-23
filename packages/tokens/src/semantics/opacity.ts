/**
 * opacity.ts
 *
 * @layer semantics
 * @description Cross-cutting opacity roles for disabled, busy, and overlay states.
 */

import { semanticTokens } from "../types/authoring"

export const opacitySemantics = semanticTokens("opacity", {
  disabled: {
    $type: "number",
    $description: "Standard disabled control opacity.",
    $value: "{opacity.50}",
  },
  busy: {
    $type: "number",
    $description: "Opacity for busy/loading interactive controls.",
    $value: "{opacity.80}",
  },
})
