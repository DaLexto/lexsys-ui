import type { ComponentTokenGroup } from "../types/index.js"

export const toggleComponentTokens: ComponentTokenGroup = {
  component: "toggle",
  background: { value: "{color.background}" },
  foreground: { value: "{color.foreground}" },
  borderColor: { value: "{color.border}" },
  hoverBackground: { value: "{color.muted}" },
  pressed: {
    background: { value: "{color.primary}" },
    foreground: { value: "{color.primary.foreground}" },
    borderColor: { value: "{color.primary}" },
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
  focus: {
    ringColor: { value: "{color.ring}" },
    ringOffsetColor: { value: "{color.background}" },
  },
  transition: {
    duration: { value: "{motion.duration.control}" },
    easing: { value: "{motion.easing.control}" },
  },
}
