import { componentTokens } from "../types/authoring"

export const cardComponentTokens = componentTokens("card", {
  background: { $value: "{color.background.surface}" },
  foreground: { $value: "{color.text.primary}" },
  borderColor: { $value: "{border.default}" },
  muted: {
    $type: "color",
    background: { $value: "{color.background.subtle}" },
  },
  radius: { $value: "{radius.surface}" },
  padding: { $value: "{spacing.surface.md}" },
  gap: {
    $type: "dimension",
    sm: { $value: "{spacing.surface.gap.sm}" },
    md: { $value: "{spacing.surface.gap.md}" },
  },
  header: {
    padding: {
      $type: "dimension",
      bottom: { $value: "{spacing.surface.sm}" },
    },
  },
  title: {
    foreground: { $value: "{color.text.primary}" },
    font: {
      size: { $value: "{typography.heading.sm.fontSize}" },
      weight: { $value: "{typography.heading.sm.fontWeight}" },
      lineHeight: { $value: "{typography.heading.sm.lineHeight}" },
      letterSpacing: { $value: "{typography.heading.sm.letterSpacing}" },
    },
  },
  description: {
    foreground: { $value: "{color.text.secondary}" },
    font: {
      size: { $value: "{typography.body.sm.fontSize}" },
      lineHeight: { $value: "{typography.body.sm.lineHeight}" },
    },
  },
  content: {
    font: {
      size: { $value: "{typography.body.sm.fontSize}" },
      lineHeight: { $value: "{typography.body.sm.lineHeight}" },
    },
  },
  transition: {
    duration: { $value: "{motion.duration.surface}" },
    easing: { $value: "{motion.easing.surface}" },
  },

})
