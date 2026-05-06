import type { ComponentTokenGroup } from "../types/index.js"

export const cardComponentTokens: ComponentTokenGroup = {
  component: "card",
  background: { value: "{color.surface}" },
  foreground: { value: "{color.surface.foreground}" },
  borderColor: { value: "{color.border}" },
  muted: {
    background: { value: "{color.muted}" },
  },
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
  title: {
    foreground: { value: "{color.foreground}" },
    font: {
      size: { value: "{typography.heading.sm.fontSize}" },
      weight: { value: "{typography.heading.sm.fontWeight}" },
      lineHeight: { value: "{typography.heading.sm.lineHeight}" },
      letterSpacing: { value: "{typography.heading.sm.letterSpacing}" },
    },
  },
  description: {
    foreground: { value: "{color.muted.foreground}" },
    font: {
      size: { value: "{typography.body.sm.fontSize}" },
      lineHeight: { value: "{typography.body.sm.lineHeight}" },
    },
  },
  content: {
    font: {
      size: { value: "{typography.body.sm.fontSize}" },
      lineHeight: { value: "{typography.body.sm.lineHeight}" },
    },
  },
  transition: {
    duration: { value: "{motion.duration.surface}" },
    easing: { value: "{motion.easing.surface}" },
  },
}
