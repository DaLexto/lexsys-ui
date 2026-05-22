import { componentTokens } from "../types/authoring"

export const numberFieldComponentTokens = componentTokens("number-field", {
  gap: { $value: "{spacing.control.gap.sm}" },
  foreground: { $value: "{color.text.primary}" },
  background: { $value: "{color.background.base}" },
  borderColor: { $value: "{border.default}" },
  radius: { $value: "{radius.control}" },
  height: {
    $type: "dimension",
    sm: { $value: "{size.control.sm}" },
    md: { $value: "{size.control.md}" },
    lg: { $value: "{size.control.lg}" },
  },
  input: {
    foreground: { $value: "{color.text.primary}" },
    placeholder: {
      $type: "color",
      color: { $value: "{color.text.secondary}" },
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
  stepper: {
    background: { $value: "{color.background.subtle}" },
    foreground: { $value: "{color.text.primary}" },
    hover: {
      $type: "color",
      background: { $value: "{color.background.subtle}" },
    },
    borderColor: { $value: "{border.default}" },
    width: {
      $type: "dimension",
      sm: { $value: "{size.control.sm}" },
      md: { $value: "{size.control.md}" },
      lg: { $value: "{size.control.lg}" },
    },
    font: {
      size: {
        $type: "fontSize",
        sm: { $value: "{typography.control.sm.fontSize}" },
        md: { $value: "{typography.control.md.fontSize}" },
        lg: { $value: "{typography.control.lg.fontSize}" },
      },
      weight: { $value: "{typography.control.md.fontWeight}" },
    },
  },
  focus: {
    $type: "dimension",
    ringColor: { $value: "{border.focus}" },
  },
  invalid: {
    $type: "color",
    ringColor: { $value: "{action.danger.base}" },
  },
  scrub: {
    foreground: { $value: "{color.text.secondary}" },
    font: {
      size: { $value: "{typography.label.sm.fontSize}" },
      weight: { $value: "{typography.label.sm.fontWeight}" },
    },
    cursor: {
      background: { $value: "{action.primary.base}" },
      radius: { $value: "{radius.pill}" },
      size: { $value: "{size.selectionIndicator.md}" },
    },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
})
