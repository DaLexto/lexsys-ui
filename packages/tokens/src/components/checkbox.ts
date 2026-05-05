import type { ComponentTokenGroup } from "../types/index.js"

export const checkboxComponentTokens: ComponentTokenGroup = {
  component: "checkbox",
  background: { value: "{color.background}" },
  foreground: { value: "{color.primary.foreground}" },
  borderColor: { value: "{color.border}" },
  checked: {
    background: { value: "{color.primary}" },
    borderColor: { value: "{color.primary}" },
    foreground: { value: "{color.primary.foreground}" },
  },
  radius: { value: "{radius.selection}" },
  size: {
    sm: { value: "{size.selectionControl.sm}" },
    md: { value: "{size.selectionControl.md}" },
    lg: { value: "{size.selectionControl.lg}" },
  },
  indicator: {
    fontSize: {
      sm: { value: "{typography.label.xs.fontSize}" },
      md: { value: "{typography.label.xs.fontSize}" },
      lg: { value: "{typography.label.sm.fontSize}" },
    },
  },
  label: {
    gap: { value: "{spacing.control.gap.md}" },
    foreground: { value: "{color.foreground}" },
    font: {
      size: { value: "{typography.label.sm.fontSize}" },
      weight: { value: "{typography.label.sm.fontWeight}" },
      lineHeight: { value: "{typography.label.sm.lineHeight}" },
    },
  },
  focus: {
    ringColor: { value: "{color.ring}" },
    ringOffsetColor: { value: "{color.background}" },
  },
  transition: {
    duration: { value: "{motion.duration.control}" },
    easing: { value: "{motion.easing.control}" },
  },
}
