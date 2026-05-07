import type { ComponentTokenGroup } from "../types/index.js"

export const textareaComponentTokens: ComponentTokenGroup = {
  component: "textarea",
  background: { value: "{color.background}" },
  foreground: { value: "{color.foreground}" },
  placeholder: {
    color: { value: "{color.muted.foreground}" },
  },
  border: {
    color: { value: "{color.border}" },
  },
  focus: {
    borderColor: { value: "{color.ring}" },
    ringColor: { value: "{color.ring}" },
    ringOffsetColor: { value: "{color.background}" },
  },
  invalid: {
    borderColor: { value: "{color.destructive}" },
    ringColor: { value: "{color.destructive}" },
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
