import { componentTokens } from "../types/authoring"

export const menuComponentTokens = componentTokens("menu", {
  radius: { $value: "{radius.surface}" },
  trigger: {
    background: { $value: "{color.background.surface}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{border.default}" },
    open: {
      background: { $value: "{color.background.subtle}" },
      borderColor: { $value: "{border.focus}" },
    },
    gap: { $value: "{spacing.control.gap.sm}" },
    radius: { $value: "{radius.control}" },
    height: { $value: "{size.control.md}" },
    padding: {
      $type: "dimension",
      x: { $value: "{spacing.control.x.md}" },
    },
    font: {
      size: { $value: "{typography.control.sm.fontSize}" },
      weight: { $value: "{typography.control.md.fontWeight}" },
      lineHeight: { $value: "{typography.control.sm.lineHeight}" },
    },
  },
  popup: {
    background: { $value: "{color.background.base}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{border.default}" },
    minWidth: { $value: "{size.area.swipe.sm}" },
    maxWidth: { $value: "{size.popover.maxWidth}" },
  },
  viewport: {
    $type: "dimension",
    maxHeight: { $value: "{size.area.swipe.md}" },
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
    checked: {
      $type: "color",
      background: { $value: "{action.primary.base}" },
      foreground: { $value: "{color.text.inverse}" },
    },
    indicator: {
      $type: "dimension",
      size: { $value: "{size.selectionControl.sm}" },
    },
  },
  submenu: {
    icon: {
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
  separator: {
    background: { $value: "{border.default}" },
    margin: {
      $type: "dimension",
      y: { $value: "{spacing.control.y.xs}" },
    },
  },
  arrow: {
    $type: "dimension",
    size: { $value: "{size.selectionIndicator.md}" },
  },
  backdrop: {
    $type: "color",
    background: { $value: "{color.text.primary}" },
  },
  focus: {
    borderColor: { $value: "{border.focus}" },
    ringColor: { $value: "{border.focus}" },
    ringOffsetColor: { $value: "{color.background.base}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },

})
