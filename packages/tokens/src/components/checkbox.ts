import type { ComponentTokenGroup } from "../types/index.js"

export const checkboxComponentTokens: ComponentTokenGroup = {
  component: "checkbox",
  background: { value: "{color.background.base}" },
  foreground: { value: "{color.text.inverse}" },
  borderColor: { value: "{color.border.default}" },
  checked: {
    background: { value: "{color.action.primary.base}" },
    borderColor: { value: "{color.action.primary.base}" },
    foreground: { value: "{color.text.inverse}" },
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
    foreground: { value: "{color.text.primary}" },
    font: {
      size: { value: "{typography.label.sm.fontSize}" },
      weight: { value: "{typography.label.sm.fontWeight}" },
      lineHeight: { value: "{typography.label.sm.lineHeight}" },
    },
  },
  focus: {
    ringColor: { value: "{color.border.focus}" },
    ringOffsetColor: { value: "{color.background.base}" },
  },
  transition: {
    duration: { value: "{motion.duration.control}" },
    easing: { value: "{motion.easing.control}" },
  },
}
