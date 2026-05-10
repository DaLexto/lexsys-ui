import type { ComponentTokenGroup } from "../types/index.js"

export const textareaComponentTokens: ComponentTokenGroup = {
  component: "textarea",
  background: { value: "{color.background.base}" },
  foreground: { value: "{color.text.primary}" },
  placeholder: {
    color: { value: "{color.text.secondary}" },
  },
  border: {
    color: { value: "{color.border.default}" },
  },
  focus: {
    borderColor: { value: "{color.border.focus}" },
    ringColor: { value: "{color.border.focus}" },
    ringOffsetColor: { value: "{color.background.base}" },
  },
  invalid: {
    borderColor: { value: "{color.action.danger.base}" },
    ringColor: { value: "{color.action.danger.base}" },
  },
  radius: { value: "{radius.control}" },
  minHeight: {
    sm: { value: "{size.textarea.minHeight.sm}" },
    md: { value: "{size.textarea.minHeight.md}" },
    lg: { value: "{size.textarea.minHeight.lg}" },
  },
  padding: {
    x: {
      sm: { value: "{spacing.control.x.sm}" },
      md: { value: "{spacing.control.x.md}" },
      lg: { value: "{spacing.control.x.lg}" },
    },
    y: {
      sm: { value: "{spacing.control.y.sm}" },
      md: { value: "{spacing.control.y.md}" },
      lg: { value: "{spacing.control.y.lg}" },
    },
  },
  font: {
    family: { value: "{typography.control.md.fontFamily}" },
    size: {
      sm: { value: "{typography.control.sm.fontSize}" },
      md: { value: "{typography.control.md.fontSize}" },
      lg: { value: "{typography.control.lg.fontSize}" },
    },
    weight: { value: "{typography.control.md.fontWeight}" },
    lineHeight: { value: "{typography.control.md.lineHeight}" },
    letterSpacing: { value: "{typography.control.md.letterSpacing}" },
  },
  transition: {
    duration: { value: "{motion.duration.control}" },
    easing: { value: "{motion.easing.control}" },
  },
}
