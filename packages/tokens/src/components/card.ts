import type { ComponentTokenGroup } from "../types/index.js"

export const cardComponentTokens: ComponentTokenGroup = {
  component: "card",
  background: { value: "{color.surface}" },
  foreground: { value: "{color.surface.foreground}" },
  borderColor: { value: "{color.border}" },
  radius: { value: "{radius.surface}" },
  padding: { value: "{spacing.surface.md}" },
  gap: {
    sm: { value: "{spacing.surface.gap.sm}" },
    md: { value: "{spacing.surface.gap.md}" },
  },
  header: {
    padding: {
      bottom: { value: "{spacing.surface.sm}" },
    },
  },
  transition: {
    duration: { value: "{motion.duration.surface}" },
  },
}
