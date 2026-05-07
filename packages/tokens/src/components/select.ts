import type { ComponentTokenGroup } from "../types/index.js"

export const selectComponentTokens: ComponentTokenGroup = {
  component: "select",
  background: { value: "{color.background}" },
  foreground: { value: "{color.foreground}" },
  placeholder: {
    color: { value: "{color.muted.foreground}" },
  },
  borderColor: { value: "{color.border}" },
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
  trigger: {
    gap: { value: "{spacing.control.gap.sm}" },
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
  label: {
    foreground: { value: "{color.foreground}" },
    font: {
      size: { value: "{typography.label.sm.fontSize}" },
      weight: { value: "{typography.label.sm.fontWeight}" },
      lineHeight: { value: "{typography.label.sm.lineHeight}" },
    },
  },
  icon: {
    foreground: { value: "{color.muted.foreground}" },
    size: { value: "{size.selectionControl.md}" },
  },
  popup: {
    background: { value: "{color.background}" },
    foreground: { value: "{color.foreground}" },
    borderColor: { value: "{color.border}" },
    maxHeight: { value: "{size.16}" },
  },
  list: {
    gap: { value: "{spacing.control.gap.sm}" },
    padding: { value: "{spacing.control.y.xs}" },
  },
  item: {
    foreground: { value: "{color.foreground}" },
    gap: { value: "{spacing.control.gap.sm}" },
    radius: { value: "{radius.control}" },
    padding: {
      x: { value: "{spacing.control.x.sm}" },
      y: { value: "{spacing.control.y.xs}" },
    },
    font: {
      size: { value: "{typography.control.sm.fontSize}" },
      weight: { value: "{typography.control.md.fontWeight}" },
      lineHeight: { value: "{typography.control.sm.lineHeight}" },
    },
    highlight: {
      background: { value: "{color.muted}" },
      foreground: { value: "{color.foreground}" },
    },
    selected: {
      background: { value: "{color.primary}" },
      foreground: { value: "{color.primary.foreground}" },
    },
    indicator: {
      size: { value: "{size.selectionControl.sm}" },
    },
  },
  group: {
    gap: { value: "{spacing.control.gap.sm}" },
    label: {
      foreground: { value: "{color.muted.foreground}" },
      padding: {
        y: { value: "{spacing.control.y.xs}" },
      },
      font: {
        size: { value: "{typography.label.xs.fontSize}" },
        weight: { value: "{typography.label.xs.fontWeight}" },
        lineHeight: { value: "{typography.label.xs.lineHeight}" },
      },
    },
  },
  arrow: {
    size: { value: "{size.selectionIndicator.md}" },
  },
  scrollArrow: {
    height: { value: "{size.control.xs}" },
  },
  backdrop: {
    background: { value: "{color.foreground}" },
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
  transition: {
    duration: { value: "{motion.duration.control}" },
    easing: { value: "{motion.easing.control}" },
  },
}
