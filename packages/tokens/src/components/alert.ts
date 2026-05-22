import { componentTokens } from "../types/authoring"

export const alertComponentTokens = componentTokens("alert", {
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
    borderColor: { $value: "{border.default}" },
  },
  primary: {
    $type: "color",
    background: { $value: "{color.feedback.info.background}" },
    foreground: { $value: "{color.feedback.info.foreground}" },
    borderColor: { $value: "{color.feedback.info.foreground}" },
  },
  destructive: {
    $type: "color",
    background: { $value: "{color.feedback.danger.background}" },
    foreground: { $value: "{color.feedback.danger.foreground}" },
    borderColor: { $value: "{color.feedback.danger.foreground}" },
  },
})
