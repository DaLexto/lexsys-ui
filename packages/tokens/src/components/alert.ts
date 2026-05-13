import type { ComponentTokenGroup } from "../types/index.js"

export const alertComponentTokens: ComponentTokenGroup = {
  component: "alert",
  radius: { $value: "{radius.surface}" },
  padding: { $value: "{spacing.surface.sm}" },
  gap: { $value: "{spacing.surface.gap.sm}" },
  transition: {
    duration: { $value: "{motion.duration.surface}" },
    easing: { $value: "{motion.easing.surface}" },
  },
  title: {
    font: {
      size: { $value: "{typography.label.sm.fontSize}" },
      weight: { $value: "{typography.label.sm.fontWeight}" },
      lineHeight: { $value: "{typography.label.sm.lineHeight}" },
    },
  },
  description: {
    foreground: { $value: "{color.text.secondary}" },
    font: {
      size: { $value: "{typography.body.sm.fontSize}" },
      lineHeight: { $value: "{typography.body.sm.lineHeight}" },
    },
  },
  neutral: {
    background: { $value: "{color.background.surface}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{color.border.default}" },
  },
  primary: {
    background: { $value: "{color.background.subtle}" },
    foreground: { $value: "{color.action.primary.base}" },
    borderColor: { $value: "{color.action.primary.base}" },
  },
  destructive: {
    background: { $value: "{color.background.subtle}" },
    foreground: { $value: "{color.action.danger.base}" },
    borderColor: { $value: "{color.action.danger.base}" },
  },
}
