import type { ComponentTokenGroup } from "../types/index.js"

export const tabsComponentTokens: ComponentTokenGroup = {
  component: "tabs",
  gap: { value: "{spacing.control.gap.lg}" },
  list: {
    background: { value: "{color.muted}" },
    radius: { value: "{radius.control}" },
    padding: { value: "{spacing.1}" },
  },
  tab: {
    background: { value: "transparent" },
    foreground: { value: "{color.muted.foreground}" },
    activeBackground: { value: "{color.background}" },
    activeForeground: { value: "{color.foreground}" },
    radius: { value: "{radius.selection}" },
    padding: {
      x: { value: "{spacing.control.x.sm}" },
      y: { value: "{spacing.control.y.xs}" },
    },
    font: {
      size: { value: "{typography.control.sm.fontSize}" },
      weight: { value: "{typography.control.sm.fontWeight}" },
      lineHeight: { value: "{typography.control.sm.lineHeight}" },
    },
  },
  panel: {
    foreground: { value: "{color.foreground}" },
    font: {
      size: { value: "{typography.body.sm.fontSize}" },
      lineHeight: { value: "{typography.body.sm.lineHeight}" },
    },
  },
  focus: {
    ringColor: { value: "{color.ring}" },
  },
  transition: {
    duration: { value: "{motion.duration.control}" },
    easing: { value: "{motion.easing.control}" },
  },
}
