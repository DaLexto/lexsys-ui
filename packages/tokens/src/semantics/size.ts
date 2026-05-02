import type { SemanticTokenGroup } from "../types"

export const sizeSemantics: SemanticTokenGroup = {
  name: "size",
  control: {
    xs: { value: "{size.6}" },
    sm: { value: "{size.8}" },
    md: { value: "{size.10}" },
    lg: { value: "{size.12}" },
    xl: { value: "{size.14}" },
  },
}
