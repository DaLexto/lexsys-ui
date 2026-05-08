import type { ComponentTokenGroup } from "../types/index.js"

export const menuComponentTokens: ComponentTokenGroup = {
  component: "menu",
  radius: { value: "{radius.surface}" },
  trigger: {
    background: { value: "{color.surface}" },
    foreground: { value: "{color.foreground}" },
    borderColor: { value: "{color.border}" },
    open: {
      background: { value: "{color.muted}" },
      borderColor: { value: "{color.ring}" },
    },
    gap: { value: "{spacing.control.gap.sm}" },
    radius: { value: "{radius.control}" },
    height: { value: "{size.control.md}" },
    padding: {
      x: { value: "{spacing.control.x.md}" },
    },
    font: {
      size: { value: "{typography.control.sm.fontSize}" },
      weight: { value: "{typography.control.md.fontWeight}" },
      lineHeight: { value: "{typography.control.sm.lineHeight}" },
    },
  },
  popup: {
    background: { value: "{color.background}" },
    foreground: { value: "{color.foreground}" },
    borderColor: { value: "{color.border}" },
    minWidth: { value: "{size.12}" },
    maxWidth: { value: "{size.popover.maxWidth}" },
  },
  viewport: {
    maxHeight: { value: "{size.16}" },
  },
  list: {
    gap: { value: "{spacing.control.gap.sm}" },
    padding: { value: "{spacing.control.y.xs}" },
  },
  item: {
    foreground: { value: "{color.foreground}" },
    gap: { value: "{spacing.control.gap.sm}" },
    radius: { value: "{radius.control}" },
    padding: {
      x: { value: "{spacing.control.x.sm}" },
      y: { value: "{spacing.control.y.xs}" },
    },
    font: {
      size: { value: "{typography.control.sm.fontSize}" },
      weight: { value: "{typography.control.md.fontWeight}" },
      lineHeight: { value: "{typography.control.sm.lineHeight}" },
    },
    highlight: {
      background: { value: "{color.muted}" },
      foreground: { value: "{color.foreground}" },
    },
    checked: {
      background: { value: "{color.primary}" },
      foreground: { value: "{color.primary.foreground}" },
    },
    indicator: {
      size: { value: "{size.selectionControl.sm}" },
    },
  },
  submenu: {
    icon: {
      size: { value: "{size.selectionControl.sm}" },
    },
  },
  group: {
    gap: { value: "{spacing.control.gap.sm}" },
    label: {
      foreground: { value: "{color.muted.foreground}" },
      padding: {
        y: { value: "{spacing.control.y.xs}" },
      },
      font: {
        size: { value: "{typography.label.xs.fontSize}" },
        weight: { value: "{typography.label.xs.fontWeight}" },
        lineHeight: { value: "{typography.label.xs.lineHeight}" },
      },
    },
  },
  separator: {
    background: { value: "{color.border}" },
    margin: {
      y: { value: "{spacing.control.y.xs}" },
    },
  },
  arrow: {
    size: { value: "{size.selectionIndicator.md}" },
  },
  backdrop: {
    background: { value: "{color.foreground}" },
  },
  focus: {
    borderColor: { value: "{color.ring}" },
    ringColor: { value: "{color.ring}" },
    ringOffsetColor: { value: "{color.background}" },
  },
  transition: {
    duration: { value: "{motion.duration.control}" },
    easing: { value: "{motion.easing.control}" },
  },
}
