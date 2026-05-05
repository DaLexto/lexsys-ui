import type { ComponentTokenGroup } from "../types/index.js"

export const progressComponentTokens: ComponentTokenGroup = {
  component: "progress",
  gap: { value: "{spacing.control.gap.sm}" },
  label: {
    foreground: { value: "{color.muted.foreground}" },
    font: {
      size: { value: "{typography.label.sm.fontSize}" },
      lineHeight: { value: "{typography.label.sm.lineHeight}" },
    },
  },
  track: {
    background: { value: "{color.muted}" },
    radius: { value: "{radius.pill}" },
    height: {
      sm: { value: "{size.track.sm}" },
      md: { value: "{size.track.md}" },
      lg: { value: "{size.track.lg}" },
    },
  },
  indicator: {
    background: { value: "{color.primary}" },
  },
  transition: {
    duration: { value: "{motion.duration.surface}" },
    easing: { value: "{motion.easing.surface}" },
  },
}
