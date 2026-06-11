import { componentTokens } from "../types/authoring";

export const badgeComponentTokens = componentTokens("badge", {
  radius: { $value: "{radius.control}" },
  height: {
    $type: "dimension",
    xs: { $value: "{size.control.xs}" },
    sm: { $value: "{size.control.compact}" },
    md: { $value: "{size.control.sm}" },
    lg: { $value: "{size.control.md}" },
    xl: { $value: "{size.control.lg}" },
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
    size: {
      $type: "fontSize",
      xs: { $value: "{typography.label.xs.fontSize}" },
      sm: { $value: "{typography.label.xs.fontSize}" },
      md: { $value: "{typography.label.sm.fontSize}" },
      lg: { $value: "{typography.label.sm.fontSize}" },
      xl: { $value: "{typography.label.md.fontSize}" },
    },
    weight: { $value: "{typography.label.sm.fontWeight}" },
    lineHeight: { $value: 1 },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
  outline: {
    $type: "color",
    background: { $value: "transparent" },
  },
  neutral: {
    background: { $value: "{color.background.subtle}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{border.default}" },
    subtleBackground: { $value: "{color.background.subtle}" },
    subtleForeground: { $value: "{color.text.secondary}" },
    ghostForeground: { $value: "{color.text.secondary}" },
  },
  primary: {
    $type: "color",
    background: { $value: "{action.primary.base}" },
    foreground: { $value: "{color.text.inverse}" },
    borderColor: { $value: "{action.primary.base}" },
    subtleBackground: { $value: "{action.primary.disabled}" },
    subtleForeground: { $value: "{action.primary.base}" },
    ghostForeground: { $value: "{action.primary.base}" },
  },
  danger: {
    $type: "color",
    background: { $value: "{action.danger.base}" },
    foreground: { $value: "{color.text.inverse}" },
    borderColor: { $value: "{action.danger.base}" },
  },
});
