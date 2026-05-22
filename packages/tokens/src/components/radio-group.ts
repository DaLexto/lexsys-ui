import { componentTokens } from "../types/authoring"

export const radioGroupComponentTokens = componentTokens("radio-group", {
  gap: { $value: "{spacing.control.gap.md}" },
  item: {
    background: { $value: "{color.background.base}" },
    foreground: { $value: "{action.primary.base}" },
    borderColor: { $value: "{border.default}" },
    checkedBorderColor: { $value: "{action.primary.base}" },
    radius: { $value: "{radius.pill}" },
    size: {
      $type: "dimension",
      sm: { $value: "{size.selectionControl.sm}" },
      md: { $value: "{size.selectionControl.md}" },
      lg: { $value: "{size.selectionControl.lg}" },
    },
  },
  indicator: {
    size: {
      $type: "dimension",
      sm: { $value: "{size.selectionIndicator.sm}" },
      md: { $value: "{size.selectionIndicator.md}" },
      lg: { $value: "{size.selectionIndicator.lg}" },
    },
  },
  label: {
    gap: { $value: "{spacing.control.gap.md}" },
    foreground: { $value: "{color.text.primary}" },
    font: {
      size: { $value: "{typography.label.sm.fontSize}" },
      weight: { $value: "{typography.label.sm.fontWeight}" },
      lineHeight: { $value: "{typography.label.sm.lineHeight}" },
    },
  },
  focus: {
    ringColor: { $value: "{border.focus}" },
    ringOffsetColor: { $value: "{color.background.base}" },
      ringWidth: { $value: "{outline.width.focus}" },
      ringOffset: { $value: "{outline.offset.focus}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
})
