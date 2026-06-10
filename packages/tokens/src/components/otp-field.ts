import { componentTokens } from "../types/authoring";

export const otpFieldComponentTokens = componentTokens("otp-field", {
  gap: { $value: "{spacing.control.gap.sm}" },
  slot: {
    background: { $value: "{color.background.base}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{border.default}" },
    radius: { $value: "{radius.control}" },
    height: {
      $type: "dimension",
      sm: { $value: "{size.control.sm}" },
      md: { $value: "{size.control.md}" },
      lg: { $value: "{size.control.lg}" },
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
      borderColor: { $value: "{border.focus}" },
      ringColor: { $value: "{border.focus}" },
      ringOffsetColor: { $value: "{color.background.base}" },
      ringWidth: { $value: "{outline.width.focus}" },
      ringOffset: { $value: "{outline.offset.focus}" },
    },
    filled: {
      $type: "color",
      borderColor: { $value: "{border.focus}" },
    },
  },
  separator: {
    foreground: { $value: "{color.text.secondary}" },
    font: {
      size: { $value: "{typography.control.md.fontSize}" },
      weight: { $value: "{typography.control.md.fontWeight}" },
    },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
});
