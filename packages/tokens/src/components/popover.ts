import type { ComponentTokenGroup } from "../types/index.js"

export const popoverComponentTokens: ComponentTokenGroup = {
  component: "popover",
  backdrop: {
    background: { value: "{color.foreground}" },
    opacity: { value: "0.24" },
  },
  popup: {
    background: { value: "{color.background}" },
    foreground: { value: "{color.foreground}" },
    borderColor: { value: "{color.border}" },
    radius: { value: "{radius.surface}" },
    maxWidth: { value: "{size.popover.maxWidth}" },
    padding: { value: "{spacing.surface.md}" },
    gap: { value: "{spacing.surface.gap.sm}" },
  },
  arrow: {
    size: { value: "{size.3}" },
  },
  title: {
    foreground: { value: "{color.foreground}" },
    paddingEnd: { value: "{size.control.lg}" },
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
  trigger: {
    background: { value: "{color.background}" },
    foreground: { value: "{color.foreground}" },
    borderColor: { value: "{color.border}" },
    hover: {
      background: { value: "{color.muted}" },
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
    ringOffsetColor: { value: "{color.background}" },
  },
  transition: {
    duration: { value: "{motion.duration.control}" },
    easing: { value: "{motion.easing.control}" },
  },
}
