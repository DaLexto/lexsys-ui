import { componentTokens } from "../types/authoring"

export const badgeComponentTokens = componentTokens("badge", {
  radius: { $value: "{radius.control}" },
  height: {
    $type: "dimension",
    sm: { $value: "{size.control.xs}" },
    md: { $value: "{size.badge.md}" },
  },
  padding: {
    x: {
      $type: "dimension",
      sm: { $value: "{spacing.control.x.xs}" },
      md: { $value: "{spacing.control.x.sm}" },
    },
  },
  font: {
    size: {
      $type: "fontSize",
      sm: { $value: "{typography.label.xs.fontSize}" },
      md: { $value: "{typography.label.sm.fontSize}" },
    },
    weight: { $value: "{typography.label.sm.fontWeight}" },
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
  },
  primary: {
    $type: "color",
    background: { $value: "{action.primary.base}" },
    foreground: { $value: "{color.text.inverse}" },
    borderColor: { $value: "{action.primary.base}" },
  },
  destructive: {
    $type: "color",
    background: { $value: "{action.danger.base}" },
    foreground: { $value: "{color.text.inverse}" },
    borderColor: { $value: "{action.danger.base}" },
  },

})
