import type { SemanticTokenGroup } from "../types/index.js"

export const radiusSemantics: SemanticTokenGroup = {
  name: "radius",
  tokens: [
    { name: "radius-control", value: "var(--nx-radius-md)" },
    { name: "radius-surface", value: "var(--nx-radius-lg)" },
  ],
}
