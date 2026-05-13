import type { ComponentTokenGroup } from "../types/index.js"

export const menuComponentTokens: ComponentTokenGroup = {
  component: "menu",
  radius: { $value: "{radius.surface}" },
  trigger: {
    background: { $value: "{color.background.surface}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{color.border.default}" },
    open: {
      background: { $value: "{color.background.subtle}" },
      borderColor: { $value: "{color.border.focus}" },
    },
    gap: { $value: "{spacing.control.gap.sm}" },
    radius: { $value: "{radius.control}" },
    height: { $value: "{size.control.md}" },
    padding: {
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
    borderColor: { $value: "{color.border.default}" },
    minWidth: { $value: "{size.12}" },
    maxWidth: { $value: "{size.popover.maxWidth}" },
  },
  viewport: {
    maxHeight: { $value: "{size.16}" },
  },
  list: {
    gap: { $value: "{spacing.control.gap.sm}" },
    padding: { $value: "{spacing.control.y.xs}" },
  },
  item: {
    foreground: { $value: "{color.text.primary}" },
    gap: { $value: "{spacing.control.gap.sm}" },
    radius: { $value: "{radius.control}" },
    padding: {
      x: { $value: "{spacing.control.x.sm}" },
      y: { $value: "{spacing.control.y.xs}" },
    },
    font: {
      size: { $value: "{typography.control.sm.fontSize}" },
      weight: { $value: "{typography.control.md.fontWeight}" },
      lineHeight: { $value: "{typography.control.sm.lineHeight}" },
    },
    highlight: {
      background: { $value: "{color.background.subtle}" },
      foreground: { $value: "{color.text.primary}" },
    },
    checked: {
      background: { $value: "{color.action.primary.base}" },
      foreground: { $value: "{color.text.inverse}" },
    },
    indicator: {
      size: { $value: "{size.selectionControl.sm}" },
    },
  },
  submenu: {
    icon: {
      size: { $value: "{size.selectionControl.sm}" },
    },
  },
  group: {
    gap: { $value: "{spacing.control.gap.sm}" },
    label: {
      foreground: { $value: "{color.text.secondary}" },
      padding: {
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
    background: { $value: "{color.border.default}" },
    margin: {
      y: { $value: "{spacing.control.y.xs}" },
    },
  },
  arrow: {
    size: { $value: "{size.selectionIndicator.md}" },
  },
  backdrop: {
    background: { $value: "{color.text.primary}" },
  },
  focus: {
    borderColor: { $value: "{color.border.focus}" },
    ringColor: { $value: "{color.border.focus}" },
    ringOffsetColor: { $value: "{color.background.base}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
}
