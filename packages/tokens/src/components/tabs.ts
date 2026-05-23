import { componentTokens } from "../types/authoring"

export const tabsComponentTokens = componentTokens("tabs", {
  gap: { $value: "{spacing.control.gap.lg}" },
  list: {
    background: { $value: "{color.background.subtle}" },
    radius: { $value: "{radius.control}" },
    padding: { $value: "{spacing.control.y.xs}" },
  },
  tab: {
    background: { $type: "color", $value: "transparent" },
    foreground: { $value: "{color.text.secondary}" },
    activeBackground: { $value: "{color.background.base}" },
    activeForeground: { $value: "{color.text.primary}" },
    radius: { $value: "{radius.selection}" },
    padding: {
      $type: "dimension",
      x: { $value: "{spacing.control.x.sm}" },
      y: { $value: "{spacing.control.y.xs}" },
    },
    font: {
      size: { $value: "{typography.control.sm.fontSize}" },
      weight: { $value: "{typography.control.sm.fontWeight}" },
      lineHeight: { $value: "{typography.control.sm.lineHeight}" },
    },
  },
  panel: {
    foreground: { $value: "{color.text.primary}" },
    font: {
      size: { $value: "{typography.body.sm.fontSize}" },
      lineHeight: { $value: "{typography.body.sm.lineHeight}" },
    },
  },
  focus: {
    $type: "dimension",
    ringColor: { $value: "{border.focus}" },
    ringWidth: { $value: "{outline.width.inset}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
})
