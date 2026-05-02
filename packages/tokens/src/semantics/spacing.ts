import type { SemanticTokenGroup } from "../types/index.js"

export const spacingSemantics: SemanticTokenGroup = {
  name: "spacing",
  control: {
    x: {
      xs: { value: "{spacing.2}" },
      sm: { value: "{spacing.3}" },
      md: { value: "{spacing.4}" },
      lg: { value: "{spacing.6}" },
      xl: { value: "{spacing.8}" },
    },
  },
  surface: {
    sm: { value: "{spacing.4}" },
    md: { value: "{spacing.6}" },
    gap: {
      sm: { value: "{spacing.1}" },
      md: { value: "{spacing.3}" },
    },
  },
}
