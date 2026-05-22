import { semanticTokens } from "../types/authoring"

export const radiusSemantics = semanticTokens("radius", {
  $type: "dimension",
  control: { $value: "{radius.md}" },
  selection: { $value: "{radius.sm}" },
  surface: { $value: "{radius.lg}" },
  pill: { $value: "{radius.full}" },
})
