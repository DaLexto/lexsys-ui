import type { ComponentTokenGroup } from "../types"

export const inputComponentTokens: ComponentTokenGroup = {
  component: "input",
  background: { $value: "{color.background.base}" },
  foreground: { $value: "{color.text.primary}" },
  placeholder: {
    color: { $value: "{color.text.secondary}" },
  },
  border: {
    color: { $value: "{color.border.default}" },
  },
  focus: {
    borderColor: { $value: "{color.border.focus}" },
    ringColor: { $value: "{color.border.focus}" },
    ringOffsetColor: { $value: "{color.background.base}" },
  },
  invalid: {
    borderColor: { $value: "{color.action.danger.base}" },
    ringColor: { $value: "{color.action.danger.base}" },
  },
  radius: { $value: "{radius.control}" },
  height: {
    sm: { $value: "{size.control.sm}" },
    md: { $value: "{size.control.md}" },
    lg: { $value: "{size.control.lg}" },
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
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
}
