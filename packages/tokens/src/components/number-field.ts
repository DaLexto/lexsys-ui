import type { ComponentTokenGroup } from "../types/index.js"

export const numberFieldComponentTokens: ComponentTokenGroup = {
  component: "number-field",
  gap: { $value: "{spacing.control.gap.sm}" },
  foreground: { $value: "{color.text.primary}" },
  background: { $value: "{color.background.base}" },
  borderColor: { $value: "{color.border.default}" },
  radius: { $value: "{radius.control}" },
  height: {
    sm: { $value: "{size.control.sm}" },
    md: { $value: "{size.control.md}" },
    lg: { $value: "{size.control.lg}" },
  },
  input: {
    foreground: { $value: "{color.text.primary}" },
    placeholder: {
      color: { $value: "{color.text.secondary}" },
    },
    padding: {
      x: {
        sm: { $value: "{spacing.control.x.sm}" },
        md: { $value: "{spacing.control.x.md}" },
        lg: { $value: "{spacing.control.x.lg}" },
      },
    },
    font: {
      family: { $value: "{typography.control.md.fontFamily}" },
      size: {
        sm: { $value: "{typography.control.sm.fontSize}" },
        md: { $value: "{typography.control.md.fontSize}" },
        lg: { $value: "{typography.control.lg.fontSize}" },
      },
      weight: { $value: "{typography.control.md.fontWeight}" },
      lineHeight: { $value: "{typography.control.md.lineHeight}" },
      letterSpacing: { $value: "{typography.control.md.letterSpacing}" },
    },
  },
  stepper: {
    background: { $value: "{color.background.subtle}" },
    foreground: { $value: "{color.text.primary}" },
    hover: {
      background: { $value: "{color.background.subtle}" },
    },
    borderColor: { $value: "{color.border.default}" },
    width: {
      sm: { $value: "{size.control.sm}" },
      md: { $value: "{size.control.md}" },
      lg: { $value: "{size.control.lg}" },
    },
    font: {
      size: {
        sm: { $value: "{typography.control.sm.fontSize}" },
        md: { $value: "{typography.control.md.fontSize}" },
        lg: { $value: "{typography.control.lg.fontSize}" },
      },
      weight: { $value: "{typography.control.md.fontWeight}" },
    },
  },
  focus: {
    ringColor: { $value: "{color.border.focus}" },
  },
  invalid: {
    ringColor: { $value: "{color.action.danger.base}" },
  },
  scrub: {
    foreground: { $value: "{color.text.secondary}" },
    font: {
      size: { $value: "{typography.label.sm.fontSize}" },
      weight: { $value: "{typography.label.sm.fontWeight}" },
    },
    cursor: {
      background: { $value: "{color.action.primary.base}" },
      radius: { $value: "{radius.pill}" },
      size: { $value: "{size.selectionIndicator.md}" },
    },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
}
