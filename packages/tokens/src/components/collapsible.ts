import type { ComponentTokenGroup } from "../types/index.js"

export const collapsibleComponentTokens: ComponentTokenGroup = {
  component: "collapsible",
  background: { value: "{color.surface}" },
  foreground: { value: "{color.foreground}" },
  borderColor: { value: "{color.border}" },
  radius: { value: "{radius.surface}" },
  focus: {
    ringColor: { value: "{color.ring}" },
  },
  trigger: {
    background: {
      hover: { value: "{color.muted}" },
    },
    gap: { value: "{spacing.control.gap.sm}" },
    padding: {
      x: { value: "{spacing.surface.md}" },
      y: { value: "{spacing.surface.sm}" },
    },
    icon: {
      size: { value: "{size.selectionControl.md}" },
    },
    font: {
      size: { value: "{typography.label.sm.fontSize}" },
      weight: { value: "{typography.label.sm.fontWeight}" },
      lineHeight: { value: "{typography.label.sm.lineHeight}" },
    },
  },
  panel: {
    foreground: { value: "{color.muted.foreground}" },
    padding: {
      x: { value: "{spacing.surface.md}" },
      bottom: { value: "{spacing.surface.md}" },
    },
    font: {
      size: { value: "{typography.body.sm.fontSize}" },
      lineHeight: { value: "{typography.body.sm.lineHeight}" },
    },
  },
  transition: {
    duration: { value: "{motion.duration.surface}" },
    easing: { value: "{motion.easing.surface}" },
  },
}
