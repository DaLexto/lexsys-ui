import { componentTokens } from "../types/authoring"

export const fieldComponentTokens = componentTokens("field", {
  gap: { $value: "{spacing.control.gap.sm}" },
  foreground: { $value: "{color.text.primary}" },
  label: {
    foreground: { $value: "{color.text.primary}" },
    invalid: {
      $type: "color",
      foreground: { $value: "{action.danger.base}" },
    },
    font: {
      size: { $value: "{typography.label.sm.fontSize}" },
      weight: { $value: "{typography.label.sm.fontWeight}" },
      lineHeight: { $value: "{typography.label.sm.lineHeight}" },
      letterSpacing: { $value: "{typography.label.sm.letterSpacing}" },
    },
  },
  description: {
    foreground: { $value: "{color.text.secondary}" },
    font: {
      size: { $value: "{typography.body.xs.fontSize}" },
      weight: { $value: "{typography.body.xs.fontWeight}" },
      lineHeight: { $value: "{typography.body.xs.lineHeight}" },
      letterSpacing: { $value: "{typography.body.xs.letterSpacing}" },
    },
  },
  error: {
    foreground: { $value: "{action.danger.base}" },
    font: {
      size: { $value: "{typography.body.xs.fontSize}" },
      weight: { $value: "{typography.body.xs.fontWeight}" },
      lineHeight: { $value: "{typography.body.xs.lineHeight}" },
      letterSpacing: { $value: "{typography.body.xs.letterSpacing}" },
    },
  },
  item: {
    $type: "dimension",
    gap: { $value: "{spacing.control.gap.sm}" },
  },
  control: {
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
    },
    invalid: {
      $type: "color",
      borderColor: { $value: "{action.danger.base}" },
      ringColor: { $value: "{action.danger.base}" },
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
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },

})
