import { componentTokens } from "../types/authoring"

export const authFormComponentTokens = componentTokens("auth-form", {
  root: {
    foreground: { $value: "{color.text.primary}" },
  },
  content: {
    gap: { $value: "{spacing.surface.sm}" },
  },
  footer: {
    gap: { $value: "{spacing.surface.gap.md}" },
  },
})
