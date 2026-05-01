import type { ComponentTokenGroup } from "../types/index.js"

export const alertComponentTokens: ComponentTokenGroup = {
  component: "alert",
  radius: { value: "{radius.surface}" },
  padding: { value: "{spacing.surface.sm}" },
  gap: { value: "{spacing.surface.gap.sm}" },
  transition: {
    duration: { value: "{motion.duration.surface}" },
  },
  neutral: {
    background: { value: "{color.surface}" },
    foreground: { value: "{color.foreground}" },
    borderColor: { value: "{color.border}" },
  },
  primary: {
    background: { value: "{color.muted}" },
    foreground: { value: "{color.primary}" },
    borderColor: { value: "{color.primary}" },
  },
  destructive: {
    background: { value: "{color.muted}" },
    foreground: { value: "{color.destructive}" },
    borderColor: { value: "{color.destructive}" },
  },
}
