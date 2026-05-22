import type { ComponentTokenGroup } from "../types"

export const meterComponentTokens: ComponentTokenGroup = {
  component: "meter",
  gap: { $value: "{spacing.control.gap.sm}" },
  header: {
    $type: "dimension",
    gap: { $value: "{spacing.control.gap.sm}" },
  },
  label: {
    foreground: { $value: "{color.text.secondary}" },
    font: {
      size: { $value: "{typography.label.sm.fontSize}" },
      weight: { $value: "{typography.label.sm.fontWeight}" },
      lineHeight: { $value: "{typography.label.sm.lineHeight}" },
    },
  },
  $value: {
    foreground: { $value: "{color.text.primary}" },
    font: {
      weight: { $value: "{typography.label.sm.fontWeight}" },
    },
  },
  track: {
    background: { $value: "{color.background.subtle}" },
    radius: { $value: "{radius.pill}" },
    height: {
      $type: "dimension",
      sm: { $value: "{size.track.sm}" },
      md: { $value: "{size.track.md}" },
      lg: { $value: "{size.track.lg}" },
    },
  },
  indicator: {
    $type: "color",
    background: { $value: "{action.primary.base}" },
    backgroundComplete: { $value: "{action.primary.base}" },
  },
  transition: {
    duration: { $value: "{motion.duration.surface}" },
    easing: { $value: "{motion.easing.surface}" },
  },
}
