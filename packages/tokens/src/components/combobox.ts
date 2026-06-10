import { componentTokens } from "../types/authoring";

export const comboboxComponentTokens = componentTokens("combobox", {
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
  padding: {
    x: {
      $type: "dimension",
      sm: { $value: "{spacing.control.x.sm}" },
      md: { $value: "{spacing.control.x.md}" },
      lg: { $value: "{spacing.control.x.lg}" },
    },
  },
  trigger: {
    $type: "dimension",
    gap: { $value: "{spacing.control.gap.sm}" },
  },
  label: {
    foreground: { $value: "{color.text.primary}" },
    font: {
      size: { $value: "{typography.label.sm.fontSize}" },
      weight: { $value: "{typography.label.sm.fontWeight}" },
      lineHeight: { $value: "{typography.label.sm.lineHeight}" },
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
  popup: {
    background: { $value: "{color.background.base}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{border.default}" },
    maxHeight: { $value: "{size.overlay.list.maxHeight}" },
    shadow: { $value: "{elevation.shadow.floating.boxShadow}" },
  },
  list: {
    gap: { $value: "{spacing.control.gap.sm}" },
    padding: { $value: "{spacing.control.y.xs}" },
  },
  item: {
    foreground: { $value: "{color.text.primary}" },
    highlight: {
      $type: "color",
      background: { $value: "{color.background.subtle}" },
      foreground: { $value: "{color.text.primary}" },
    },
    selected: {
      $type: "color",
      background: { $value: "{action.primary.base}" },
      foreground: { $value: "{color.text.inverse}" },
    },
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
  transition: {
    duration: { $value: "{motion.duration.surface}" },
    easing: { $value: "{motion.easing.control}" },
  },
});
