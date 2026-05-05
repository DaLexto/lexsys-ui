import type { ComponentTokenGroup } from "../types/index.js"

export const radioGroupComponentTokens: ComponentTokenGroup = {
  component: "radio-group",
  gap: { value: "{spacing.control.gap.md}" },
  item: {
    background: { value: "{color.background}" },
    foreground: { value: "{color.primary}" },
    borderColor: { value: "{color.border}" },
    checkedBorderColor: { value: "{color.primary}" },
    radius: { value: "{radius.pill}" },
    size: {
      sm: { value: "{size.selectionControl.sm}" },
      md: { value: "{size.selectionControl.md}" },
      lg: { value: "{size.selectionControl.lg}" },
    },
  },
  indicator: {
    size: {
      sm: { value: "{size.selectionIndicator.sm}" },
      md: { value: "{size.selectionIndicator.md}" },
      lg: { value: "{size.selectionIndicator.lg}" },
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
