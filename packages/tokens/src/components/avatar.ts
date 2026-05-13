import type { ComponentTokenGroup } from "../types/index.js"

export const avatarComponentTokens: ComponentTokenGroup = {
  component: "avatar",
  background: { $value: "{color.background.subtle}" },
  foreground: { $value: "{color.text.secondary}" },
  borderColor: { $value: "{color.border.default}" },
  fallback: {
    background: { $value: "{color.background.subtle}" },
    foreground: { $value: "{color.text.secondary}" },
  },
  radius: {
    circle: { $value: "{radius.pill}" },
    square: { $value: "{radius.control}" },
  },
  size: {
    sm: { $value: "{size.control.sm}" },
    md: { $value: "{size.control.md}" },
    lg: { $value: "{size.control.lg}" },
  },
  font: {
    size: {
      sm: { $value: "{typography.label.xs.fontSize}" },
      md: { $value: "{typography.label.sm.fontSize}" },
      lg: { $value: "{typography.label.md.fontSize}" },
    },
    weight: { $value: "{typography.label.md.fontWeight}" },
  },
  transition: {
    duration: { $value: "{motion.duration.surface}" },
    easing: { $value: "{motion.easing.surface}" },
  },
}
