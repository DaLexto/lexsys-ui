import type { SemanticTokenGroup } from "../types/index.js"

export const spacingSemantics: SemanticTokenGroup = {
  name: "spacing",
  control: {
    gap: {
      sm: { value: "{spacing.1}" },
      md: { value: "{spacing.2}" },
      lg: { value: "{spacing.3}" },
    },
    x: {
      xs: { value: "{spacing.2}" },
      sm: { value: "{spacing.3}" },
      md: { value: "{spacing.4}" },
      lg: { value: "{spacing.6}" },
      xl: { value: "{spacing.8}" },
    },
    y: {
      xs: { value: "{spacing.1}" },
      sm: { value: "{spacing.2}" },
      md: { value: "{spacing.3}" },
      lg: { value: "{spacing.4}" },
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
