import type { ComponentTokenGroup } from "../types/index.js"

export const alertDialogComponentTokens: ComponentTokenGroup = {
  component: "alert-dialog",
  backdrop: {
    background: { value: "{color.text.primary}" },
    opacity: { value: "0.56" },
  },
  viewport: {
    padding: { value: "{spacing.surface.md}" },
  },
  popup: {
    background: { value: "{color.background.base}" },
    foreground: { value: "{color.text.primary}" },
    borderColor: { value: "{color.border.default}" },
    radius: { value: "{radius.surface}" },
    maxWidth: { value: "{size.dialog.maxWidth}" },
    padding: { value: "{spacing.surface.md}" },
    gap: { value: "{spacing.surface.gap.md}" },
  },
  title: {
    foreground: { value: "{color.text.primary}" },
    paddingEnd: { value: "{size.control.lg}" },
    font: {
      size: { value: "{typography.heading.sm.fontSize}" },
      weight: { value: "{typography.heading.sm.fontWeight}" },
      lineHeight: { value: "{typography.heading.sm.lineHeight}" },
    },
  },
  description: {
    foreground: { value: "{color.text.secondary}" },
    font: {
      size: { value: "{typography.body.sm.fontSize}" },
      weight: { value: "{typography.body.sm.fontWeight}" },
      lineHeight: { value: "{typography.body.sm.lineHeight}" },
    },
  },
  trigger: {
    background: { value: "{color.action.danger.base}" },
    foreground: { value: "{color.text.inverse}" },
    hover: {
      background: { value: "{color.action.danger.base}" },
    },
    height: { value: "{size.control.md}" },
    radius: { value: "{radius.control}" },
    padding: {
      x: { value: "{spacing.control.x.md}" },
    },
    font: {
      size: { value: "{typography.control.md.fontSize}" },
      weight: { value: "{typography.control.md.fontWeight}" },
      lineHeight: { value: "{typography.control.md.lineHeight}" },
    },
  },
  close: {
    foreground: { value: "{color.text.secondary}" },
    hover: {
      background: { value: "{color.background.subtle}" },
    },
    size: { value: "{size.control.sm}" },
    inset: { value: "{spacing.control.x.sm}" },
    radius: { value: "{radius.control}" },
  },
  focus: {
    ringColor: { value: "{color.border.focus}" },
    ringOffsetColor: { value: "{color.background.base}" },
  },
  transition: {
    duration: { value: "{motion.duration.control}" },
    easing: { value: "{motion.easing.control}" },
  },
}
