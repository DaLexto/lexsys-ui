import type { ComponentTokenGroup } from "../types/index.js"

export const toastComponentTokens: ComponentTokenGroup = {
  component: "toast",
  viewport: {
    width: { $value: "{size.toast.viewportWidth}" },
    gap: { $value: "{spacing.surface.gap.sm}" },
    gapExpanded: { $value: "{spacing.surface.gap.md}" },
    padding: { $value: "{spacing.surface.sm}" },
  },
  background: { $value: "{color.background.base}" },
  foreground: { $value: "{color.text.primary}" },
  borderColor: { $value: "{color.border.default}" },
  success: {
    borderColor: { $value: "{color.action.primary.base}" },
  },
  destructive: {
    borderColor: { $value: "{color.action.danger.base}" },
  },
  radius: { $value: "{radius.surface}" },
  padding: { $value: "{spacing.surface.md}" },
  paddingEnd: { $value: "{size.control.lg}" },
  gap: { $value: "{spacing.surface.gap.sm}" },
  content: {
    gap: { $value: "{spacing.surface.gap.sm}" },
    behindOpacity: { $value: "0.72" },
  },
  arrow: {
    size: { $value: "{size.3}" },
  },
  title: {
    foreground: { $value: "{color.text.primary}" },
    font: {
      size: { $value: "{typography.heading.xs.fontSize}" },
      weight: { $value: "{typography.heading.xs.fontWeight}" },
      lineHeight: { $value: "{typography.heading.xs.lineHeight}" },
    },
  },
  description: {
    foreground: { $value: "{color.text.secondary}" },
    font: {
      size: { $value: "{typography.body.sm.fontSize}" },
      weight: { $value: "{typography.body.sm.fontWeight}" },
      lineHeight: { $value: "{typography.body.sm.lineHeight}" },
    },
  },
  action: {
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{color.border.default}" },
    hover: {
      background: { $value: "{color.background.subtle}" },
    },
    height: { $value: "{size.control.sm}" },
    radius: { $value: "{radius.control}" },
    padding: {
      x: { $value: "{spacing.control.x.sm}" },
    },
    font: {
      size: { $value: "{typography.control.sm.fontSize}" },
      weight: { $value: "{typography.control.sm.fontWeight}" },
      lineHeight: { $value: "{typography.control.sm.lineHeight}" },
    },
  },
  close: {
    foreground: { $value: "{color.text.secondary}" },
    hover: {
      background: { $value: "{color.background.subtle}" },
    },
    size: { $value: "{size.control.sm}" },
    inset: { $value: "{spacing.control.x.sm}" },
    radius: { $value: "{radius.control}" },
  },
  focus: {
    ringColor: { $value: "{color.border.focus}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
}
