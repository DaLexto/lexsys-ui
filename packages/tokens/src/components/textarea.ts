import { componentTokens } from "../types/authoring"

export const textareaComponentTokens = componentTokens("textarea", {
  background: { $value: "{color.background.base}" },
  foreground: { $value: "{color.text.primary}" },
  placeholder: {
    $type: "color",
    color: { $value: "{color.text.secondary}" },
  },
  border: {
    $type: "dimension",
    color: { $value: "{border.default}" },
  },
  focus: {
    borderColor: { $value: "{border.focus}" },
    ringColor: { $value: "{border.focus}" },
    ringOffsetColor: { $value: "{color.background.base}" },
    ringWidth: { $value: "{outline.width.focus}" },
    ringOffset: { $value: "{outline.offset.focus}" },
  },
  invalid: {
    $type: "color",
    borderColor: { $value: "{action.danger.base}" },
    ringColor: { $value: "{action.danger.base}" },
    ringWidth: { $value: "{outline.width.focus}" },
  },
  radius: { $value: "{radius.control}" },
  minHeight: {
    $type: "dimension",
    sm: { $value: "{size.14}" },
    md: { $value: "{size.16}" },
    lg: { $value: "{size.16}" },
  },
  padding: {
    x: {
      $type: "dimension",
      sm: { $value: "{spacing.control.x.sm}" },
      md: { $value: "{spacing.control.x.md}" },
      lg: { $value: "{spacing.control.x.lg}" },
    },
    y: {
      $type: "dimension",
      sm: { $value: "{spacing.control.y.sm}" },
      md: { $value: "{spacing.control.y.md}" },
      lg: { $value: "{spacing.control.y.lg}" },
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
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
})
