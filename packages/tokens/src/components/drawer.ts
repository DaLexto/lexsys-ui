import type { ComponentTokenGroup } from "../types/index.js"

export const drawerComponentTokens: ComponentTokenGroup = {
  component: "drawer",
  backdrop: {
    background: { value: "{color.foreground}" },
    opacity: { value: "0.48" },
  },
  indent: {
    background: { value: "{color.muted}" },
    scale: { value: "0.96" },
    radius: { value: "{radius.surface}" },
  },
  viewport: {
    padding: { value: "{spacing.surface.sm}" },
  },
  popup: {
    background: { value: "{color.background}" },
    foreground: { value: "{color.foreground}" },
    borderColor: { value: "{color.border}" },
    radius: { value: "{radius.surface}" },
    maxWidth: { value: "{size.drawer.maxWidth}" },
    width: {
      sm: { value: "{size.drawer.width.sm}" },
      md: { value: "{size.drawer.width.md}" },
      lg: { value: "{size.drawer.width.lg}" },
    },
    height: {
      sm: { value: "{size.drawer.height.sm}" },
      md: { value: "{size.drawer.height.md}" },
      lg: { value: "{size.drawer.height.lg}" },
    },
  },
  content: {
    padding: { value: "{spacing.surface.md}" },
    gap: { value: "{spacing.surface.gap.md}" },
  },
  handle: {
    background: { value: "{color.border}" },
    width: { value: "{size.control.lg}" },
    height: { value: "{size.track.md}" },
    marginTop: { value: "{spacing.control.y.sm}" },
    radius: { value: "{radius.pill}" },
  },
  swipeArea: {
    size: { value: "{size.control.lg}" },
  },
  title: {
    foreground: { value: "{color.foreground}" },
    paddingEnd: { value: "{size.control.lg}" },
    font: {
      size: { value: "{typography.heading.sm.fontSize}" },
      weight: { value: "{typography.heading.sm.fontWeight}" },
      lineHeight: { value: "{typography.heading.sm.lineHeight}" },
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
    background: { value: "{color.primary}" },
    foreground: { value: "{color.primary.foreground}" },
    hover: {
      background: { value: "{color.primary.hover}" },
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
