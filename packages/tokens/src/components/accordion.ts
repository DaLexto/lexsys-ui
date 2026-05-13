import type { ComponentTokenGroup } from "../types/index.js"

export const accordionComponentTokens: ComponentTokenGroup = {
  component: "accordion",
  background: { $value: "{color.background.surface}" },
  foreground: { $value: "{color.text.primary}" },
  borderColor: { $value: "{color.border.default}" },
  radius: { $value: "{radius.surface}" },
  item: {
    borderColor: { $value: "{color.border.default}" },
  },
  trigger: {
    backgroundHover: { $value: "{color.background.subtle}" },
    padding: {
      x: { $value: "{spacing.control.x.md}" },
      y: { $value: "{spacing.control.y.md}" },
    },
    font: {
      family: { $value: "{typography.label.sm.fontFamily}" },
      size: { $value: "{typography.label.sm.fontSize}" },
      weight: { $value: "{typography.label.sm.fontWeight}" },
      lineHeight: { $value: "{typography.label.sm.lineHeight}" },
    },
  },
  panel: {
    foreground: { $value: "{color.text.secondary}" },
    padding: {
      x: { $value: "{spacing.control.x.md}" },
      bottom: { $value: "{spacing.surface.sm}" },
    },
    font: {
      size: { $value: "{typography.body.sm.fontSize}" },
      lineHeight: { $value: "{typography.body.sm.lineHeight}" },
    },
  },
  focus: {
    ringColor: { $value: "{color.border.focus}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
}
