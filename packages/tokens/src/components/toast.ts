import type { ComponentTokenGroup } from "../types/index.js"

export const toastComponentTokens: ComponentTokenGroup = {
  component: "toast",
  viewport: {
    width: { value: "{size.toast.viewportWidth}" },
    gap: { value: "{spacing.surface.gap.sm}" },
    gapExpanded: { value: "{spacing.surface.gap.md}" },
    padding: { value: "{spacing.surface.sm}" },
  },
  background: { value: "{color.background}" },
  foreground: { value: "{color.foreground}" },
  borderColor: { value: "{color.border}" },
  success: {
    borderColor: { value: "{color.primary}" },
  },
  destructive: {
    borderColor: { value: "{color.destructive}" },
  },
  radius: { value: "{radius.surface}" },
  padding: { value: "{spacing.surface.md}" },
  paddingEnd: { value: "{size.control.lg}" },
  gap: { value: "{spacing.surface.gap.sm}" },
  content: {
    gap: { value: "{spacing.surface.gap.sm}" },
    behindOpacity: { value: "0.72" },
  },
  arrow: {
    size: { value: "{size.3}" },
  },
  title: {
    foreground: { value: "{color.foreground}" },
    font: {
      size: { value: "{typography.heading.xs.fontSize}" },
      weight: { value: "{typography.heading.xs.fontWeight}" },
      lineHeight: { value: "{typography.heading.xs.lineHeight}" },
    },
  },
  description: {
    foreground: { value: "{color.muted.foreground}" },
    font: {
      size: { value: "{typography.body.sm.fontSize}" },
      weight: { value: "{typography.body.sm.fontWeight}" },
      lineHeight: { value: "{typography.body.sm.lineHeight}" },
    },
  },
  action: {
    foreground: { value: "{color.foreground}" },
    borderColor: { value: "{color.border}" },
    hover: {
      background: { value: "{color.muted}" },
    },
    height: { value: "{size.control.sm}" },
    radius: { value: "{radius.control}" },
    padding: {
      x: { value: "{spacing.control.x.sm}" },
    },
    font: {
      size: { value: "{typography.control.sm.fontSize}" },
      weight: { value: "{typography.control.sm.fontWeight}" },
      lineHeight: { value: "{typography.control.sm.lineHeight}" },
    },
  },
  close: {
    foreground: { value: "{color.muted.foreground}" },
    hover: {
      background: { value: "{color.muted}" },
    },
    size: { value: "{size.control.sm}" },
    inset: { value: "{spacing.control.x.sm}" },
    radius: { value: "{radius.control}" },
  },
  focus: {
    ringColor: { value: "{color.ring}" },
  },
  transition: {
    duration: { value: "{motion.duration.control}" },
    easing: { value: "{motion.easing.control}" },
  },
}
