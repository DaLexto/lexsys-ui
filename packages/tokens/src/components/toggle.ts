import { componentTokens } from "../types/authoring"

export const toggleComponentTokens = componentTokens("toggle", {
  background: { $value: "{color.background.base}" },
  foreground: { $value: "{color.text.primary}" },
  borderColor: { $value: "{color.border.default}" },
  hoverBackground: { $value: "{color.background.subtle}" },
  pressed: {
    $type: "color",
    background: { $value: "{action.primary.base}" },
    foreground: { $value: "{color.text.inverse}" },
    borderColor: { $value: "{action.primary.base}" },
  },
  radius: { $value: "{radius.control}" },
  height: {
    $type: "dimension",
    sm: { $value: "{size.control.sm}" },
    md: { $value: "{size.control.md}" },
    lg: { $value: "{size.control.lg}" },
  },
  padding: {
    x: {
      $type: "dimension",
      sm: { $value: "{spacing.control.x.sm}" },
      md: { $value: "{spacing.control.x.md}" },
      lg: { $value: "{spacing.control.x.lg}" },
    },
  },
  font: {
    family: { $value: "{typography.control.md.fontFamily}" },
    size: {
      $type: "fontSize",
      sm: { $value: "{typography.control.sm.fontSize}" },
      md: { $value: "{typography.control.md.fontSize}" },
      lg: { $value: "{typography.control.lg.fontSize}" },
    },
    weight: { $value: "{typography.control.md.fontWeight}" },
    lineHeight: { $value: "{typography.control.md.lineHeight}" },
    letterSpacing: { $value: "{typography.control.md.letterSpacing}" },
  },
  focus: {
    ringColor: { $value: "{color.border.focus}" },
    ringOffsetColor: { $value: "{color.background.base}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },

})
