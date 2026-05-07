import type { ComponentTokenGroup } from "../types/index.js"

export const numberFieldComponentTokens: ComponentTokenGroup = {
  component: "number-field",
  gap: { value: "{spacing.control.gap.sm}" },
  foreground: { value: "{color.foreground}" },
  background: { value: "{color.background}" },
  borderColor: { value: "{color.border}" },
  radius: { value: "{radius.control}" },
  height: {
    sm: { value: "{size.control.sm}" },
    md: { value: "{size.control.md}" },
    lg: { value: "{size.control.lg}" },
  },
  input: {
    foreground: { value: "{color.foreground}" },
    placeholder: {
      color: { value: "{color.muted.foreground}" },
    },
    padding: {
      x: {
        sm: { value: "{spacing.control.x.sm}" },
        md: { value: "{spacing.control.x.md}" },
        lg: { value: "{spacing.control.x.lg}" },
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
  },
  stepper: {
    background: { value: "{color.muted}" },
    foreground: { value: "{color.foreground}" },
    hover: {
      background: { value: "{color.muted}" },
    },
    borderColor: { value: "{color.border}" },
    width: {
      sm: { value: "{size.control.sm}" },
      md: { value: "{size.control.md}" },
      lg: { value: "{size.control.lg}" },
    },
    font: {
      size: {
        sm: { value: "{typography.control.sm.fontSize}" },
        md: { value: "{typography.control.md.fontSize}" },
        lg: { value: "{typography.control.lg.fontSize}" },
      },
      weight: { value: "{typography.control.md.fontWeight}" },
    },
  },
  focus: {
    ringColor: { value: "{color.ring}" },
  },
  invalid: {
    ringColor: { value: "{color.destructive}" },
  },
  scrub: {
    foreground: { value: "{color.muted.foreground}" },
    font: {
      size: { value: "{typography.label.sm.fontSize}" },
      weight: { value: "{typography.label.sm.fontWeight}" },
    },
    cursor: {
      background: { value: "{color.primary}" },
      radius: { value: "{radius.pill}" },
      size: { value: "{size.selectionIndicator.md}" },
    },
  },
  transition: {
    duration: { value: "{motion.duration.control}" },
    easing: { value: "{motion.easing.control}" },
  },
}
