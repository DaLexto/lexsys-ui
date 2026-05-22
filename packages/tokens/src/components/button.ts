import type { ComponentTokenGroup } from "../types"

export const buttonComponentTokens: ComponentTokenGroup = {
  component: "button",
  radius: { $value: "{radius.control}" },
  focus: {
    ringColor: { $value: "{color.border.focus}" },
    ringOffsetColor: { $value: "{color.background.base}" },
  },
  primary: {
    $type: "color",
    background: { $value: "{action.primary.base}" },
    foreground: { $value: "{color.text.inverse}" },
    hoverBackground: { $value: "{action.primary.hover}" },
    borderColor: { $value: "transparent" },
  },
  secondary: {
    background: { $value: "{color.background.subtle}" },
    foreground: { $value: "{color.text.primary}" },
    hoverBackground: { $value: "{color.background.surface}" },
    borderColor: { $value: "{color.border.default}" },
  },
  height: {
    $type: "dimension",
    xs: { $value: "{size.control.xs}" },
    sm: { $value: "{size.control.sm}" },
    md: { $value: "{size.control.md}" },
    lg: { $value: "{size.control.lg}" },
    xl: { $value: "{size.control.xl}" },
  },
  padding: {
    x: {
      $type: "dimension",
      xs: { $value: "{spacing.control.x.xs}" },
      sm: { $value: "{spacing.control.x.sm}" },
      md: { $value: "{spacing.control.x.md}" },
      lg: { $value: "{spacing.control.x.lg}" },
      xl: { $value: "{spacing.control.x.xl}" },
    },
  },
  font: {
    family: { $value: "{typography.control.md.fontFamily}" },
    size: {
      $type: "fontSize",
      xs: { $value: "{typography.control.xs.fontSize}" },
      sm: { $value: "{typography.control.sm.fontSize}" },
      md: { $value: "{typography.control.md.fontSize}" },
      lg: { $value: "{typography.control.lg.fontSize}" },
      xl: { $value: "{typography.control.xl.fontSize}" },
    },
    weight: { $value: "{typography.control.md.fontWeight}" },
    lineHeight: { $value: "{typography.control.md.lineHeight}" },
    letterSpacing: { $value: "{typography.control.md.letterSpacing}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
}
