import type { ComponentTokenGroup } from "../types/index.js"

export const avatarComponentTokens: ComponentTokenGroup = {
  component: "avatar",
  background: { value: "{color.muted}" },
  foreground: { value: "{color.muted.foreground}" },
  borderColor: { value: "{color.border}" },
  fallback: {
    background: { value: "{color.muted}" },
    foreground: { value: "{color.muted.foreground}" },
  },
  radius: {
    circle: { value: "{radius.pill}" },
    square: { value: "{radius.control}" },
  },
  size: {
    sm: { value: "{size.control.sm}" },
    md: { value: "{size.control.md}" },
    lg: { value: "{size.control.lg}" },
  },
  font: {
    size: {
      sm: { value: "{typography.label.xs.fontSize}" },
      md: { value: "{typography.label.sm.fontSize}" },
      lg: { value: "{typography.label.md.fontSize}" },
    },
    weight: { value: "{typography.label.md.fontWeight}" },
  },
  transition: {
    duration: { value: "{motion.duration.surface}" },
    easing: { value: "{motion.easing.surface}" },
  },
}
