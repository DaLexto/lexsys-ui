import { componentTokens } from "../types/authoring"

export const selectComponentTokens = componentTokens("select", {
  background: { $value: "{color.background.base}" },
  foreground: { $value: "{color.text.primary}" },
  placeholder: {
    $type: "color",
    color: { $value: "{color.text.secondary}" },
  },
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
  label: {
    foreground: { $value: "{color.text.primary}" },
    font: {
      size: { $value: "{typography.label.sm.fontSize}" },
      weight: { $value: "{typography.label.sm.fontWeight}" },
      lineHeight: { $value: "{typography.label.sm.lineHeight}" },
    },
  },
  icon: {
    foreground: { $value: "{color.text.secondary}" },
    size: { $value: "{size.selectionControl.md}" },
  },
  popup: {
    background: { $value: "{color.background.base}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{border.default}" },
    maxHeight: { $value: "{size.area.swipe.md}" },
    shadow: { $value: "{elevation.shadow.floating}" },
  },
  positioner: {
    zIndex: { $value: "{elevation.floating.zIndex}" },
  },
  list: {
    $type: "dimension",
    gap: { $value: "{spacing.control.gap.sm}" },
    padding: { $value: "{spacing.control.y.xs}" },
  },
  item: {
    foreground: { $value: "{color.text.primary}" },
    gap: { $value: "{spacing.control.gap.sm}" },
    radius: { $value: "{radius.control}" },
    padding: {
      $type: "dimension",
      x: { $value: "{spacing.control.x.sm}" },
      y: { $value: "{spacing.control.y.xs}" },
    },
    font: {
      size: { $value: "{typography.control.sm.fontSize}" },
      weight: { $value: "{typography.control.md.fontWeight}" },
      lineHeight: { $value: "{typography.control.sm.lineHeight}" },
    },
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
    indicator: {
      $type: "dimension",
      size: { $value: "{size.selectionControl.sm}" },
    },
  },
  group: {
    gap: { $value: "{spacing.control.gap.sm}" },
    label: {
      foreground: { $value: "{color.text.secondary}" },
      padding: {
        $type: "dimension",
        y: { $value: "{spacing.control.y.xs}" },
      },
      font: {
        size: { $value: "{typography.label.xs.fontSize}" },
        weight: { $value: "{typography.label.xs.fontWeight}" },
        lineHeight: { $value: "{typography.label.xs.lineHeight}" },
      },
    },
  },
  arrow: {
    $type: "dimension",
    size: { $value: "{size.selectionIndicator.md}" },
  },
  scrollArrow: {
    $type: "dimension",
    height: { $value: "{size.control.xs}" },
  },
  backdrop: {
    $type: "color",
    background: { $value: "{color.text.primary}" },
    zIndex: { $value: "{elevation.backdrop.zIndex}" },
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
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
})
