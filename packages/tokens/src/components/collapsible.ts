import { componentTokens } from "../types/authoring"

export const collapsibleComponentTokens = componentTokens("collapsible", {
  background: { $value: "{color.background.surface}" },
  foreground: { $value: "{color.text.primary}" },
  borderColor: { $value: "{border.default}" },
  radius: { $value: "{radius.surface}" },
  focus: {
    $type: "dimension",
    ringColor: { $value: "{border.focus}" },
  },
  trigger: {
    background: {
      $type: "color",
      hover: { $value: "{color.background.subtle}" },
    },
    gap: { $value: "{spacing.control.gap.sm}" },
    padding: {
      $type: "dimension",
      x: { $value: "{spacing.surface.md}" },
      y: { $value: "{spacing.surface.sm}" },
    },
    icon: {
      $type: "dimension",
      size: { $value: "{size.selectionControl.md}" },
    },
    font: {
      size: { $value: "{typography.label.sm.fontSize}" },
      weight: { $value: "{typography.label.sm.fontWeight}" },
      lineHeight: { $value: "{typography.label.sm.lineHeight}" },
    },
  },
  panel: {
    foreground: { $value: "{color.text.secondary}" },
    padding: {
      $type: "dimension",
      x: { $value: "{spacing.surface.md}" },
      bottom: { $value: "{spacing.surface.md}" },
    },
    font: {
      size: { $value: "{typography.body.sm.fontSize}" },
      lineHeight: { $value: "{typography.body.sm.lineHeight}" },
    },
  },
  transition: {
    duration: { $value: "{motion.duration.surface}" },
    easing: { $value: "{motion.easing.surface}" },
  },

})
