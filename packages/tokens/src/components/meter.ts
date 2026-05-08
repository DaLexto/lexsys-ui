import type { ComponentTokenGroup } from "../types/index.js"

export const meterComponentTokens: ComponentTokenGroup = {
  component: "meter",
  gap: { value: "{spacing.control.gap.sm}" },
  header: {
    gap: { value: "{spacing.control.gap.sm}" },
  },
  label: {
    foreground: { value: "{color.muted.foreground}" },
    font: {
      size: { value: "{typography.label.sm.fontSize}" },
      weight: { value: "{typography.label.sm.fontWeight}" },
      lineHeight: { value: "{typography.label.sm.lineHeight}" },
    },
  },
  value: {
    foreground: { value: "{color.foreground}" },
    font: {
      weight: { value: "{typography.label.sm.fontWeight}" },
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
    backgroundComplete: { value: "{color.primary}" },
  },
  transition: {
    duration: { value: "{motion.duration.surface}" },
    easing: { value: "{motion.easing.surface}" },
  },
}
