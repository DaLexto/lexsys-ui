import type { SemanticTokenGroup } from "../types"

export const radiusSemantics: SemanticTokenGroup = {
  $type: "dimension",
  name: "radius",
  control: { $value: "{radius.md}" },
  selection: { $value: "{radius.sm}" },
  surface: { $value: "{radius.lg}" },
  pill: { $value: "{radius.full}" },
}
