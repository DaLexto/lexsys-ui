import type { SemanticTokenGroup } from "../types/index.js"

export const radiusSemantics: SemanticTokenGroup = {
  name: "radius",
  control: { $value: "{radius.md}" },
  selection: { $value: "{radius.sm}" },
  surface: { $value: "{radius.lg}" },
  pill: { $value: "{radius.full}" },
}
