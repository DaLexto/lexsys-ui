import type { ComponentTokenGroup } from "../types/index.js"

export const alertComponentTokens: ComponentTokenGroup = {
  component: "alert",
  radius: { value: "{radius.surface}" },
  padding: { value: "{spacing.surface.sm}" },
  gap: { value: "{spacing.surface.gap.sm}" },
  transition: {
    duration: { value: "{motion.duration.surface}" },
    easing: { value: "{motion.easing.surface}" },
  },
  title: {
    font: {
      size: { value: "{typography.label.sm.fontSize}" },
      weight: { value: "{typography.label.sm.fontWeight}" },
      lineHeight: { value: "{typography.label.sm.lineHeight}" },
    },
  },
  description: {
    foreground: { value: "{color.muted.foreground}" },
    font: {
      size: { value: "{typography.body.sm.fontSize}" },
      lineHeight: { value: "{typography.body.sm.lineHeight}" },
    },
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
