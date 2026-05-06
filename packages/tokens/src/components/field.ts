import type { ComponentTokenGroup } from "../types/index.js"

export const fieldComponentTokens: ComponentTokenGroup = {
  component: "field",
  gap: { value: "{spacing.control.gap.sm}" },
  foreground: { value: "{color.foreground}" },
  label: {
    foreground: { value: "{color.foreground}" },
    invalid: {
      foreground: { value: "{color.destructive}" },
    },
    font: {
      size: { value: "{typography.label.sm.fontSize}" },
      weight: { value: "{typography.label.sm.fontWeight}" },
      lineHeight: { value: "{typography.label.sm.lineHeight}" },
      letterSpacing: { value: "{typography.label.sm.letterSpacing}" },
    },
  },
  description: {
    foreground: { value: "{color.muted.foreground}" },
    font: {
      size: { value: "{typography.body.xs.fontSize}" },
      weight: { value: "{typography.body.xs.fontWeight}" },
      lineHeight: { value: "{typography.body.xs.lineHeight}" },
      letterSpacing: { value: "{typography.body.xs.letterSpacing}" },
    },
  },
  error: {
    foreground: { value: "{color.destructive}" },
    font: {
      size: { value: "{typography.body.xs.fontSize}" },
      weight: { value: "{typography.body.xs.fontWeight}" },
      lineHeight: { value: "{typography.body.xs.lineHeight}" },
      letterSpacing: { value: "{typography.body.xs.letterSpacing}" },
    },
  },
  item: {
    gap: { value: "{spacing.control.gap.sm}" },
  },
  control: {
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
    height: {
      sm: { value: "{size.control.sm}" },
      md: { value: "{size.control.md}" },
      lg: { value: "{size.control.lg}" },
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
  transition: {
    duration: { value: "{motion.duration.control}" },
    easing: { value: "{motion.easing.control}" },
  },
}
