import type { ComponentTokenGroup } from "../types/index.js"

export const progressComponentTokens: ComponentTokenGroup = {
  component: "progress",
  gap: { $value: "{spacing.control.gap.sm}" },
  label: {
    foreground: { $value: "{color.text.secondary}" },
    font: {
      size: { $value: "{typography.label.sm.fontSize}" },
      lineHeight: { $value: "{typography.label.sm.lineHeight}" },
    },
  },
  track: {
    background: { $value: "{color.background.subtle}" },
    radius: { $value: "{radius.pill}" },
    height: {
      sm: { $value: "{size.track.sm}" },
      md: { $value: "{size.track.md}" },
      lg: { $value: "{size.track.lg}" },
    },
  },
  indicator: {
    background: { $value: "{color.action.primary.base}" },
  },
  transition: {
    duration: { $value: "{motion.duration.surface}" },
    easing: { $value: "{motion.easing.surface}" },
  },
}
