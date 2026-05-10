import type { ComponentTokenGroup } from "../types/index.js"

export const drawerComponentTokens: ComponentTokenGroup = {
  component: "drawer",
  backdrop: {
    background: { value: "{color.text.primary}" },
    opacity: { value: "0.48" },
  },
  indent: {
    background: { value: "{color.background.subtle}" },
    scale: { value: "0.96" },
    radius: { value: "{radius.surface}" },
  },
  viewport: {
    padding: { value: "{spacing.surface.sm}" },
  },
  popup: {
    background: { value: "{color.background.base}" },
    foreground: { value: "{color.text.primary}" },
    borderColor: { value: "{color.border.default}" },
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
    background: { value: "{color.border.default}" },
    width: { value: "{size.control.lg}" },
    height: { value: "{size.track.md}" },
    marginTop: { value: "{spacing.control.y.sm}" },
    radius: { value: "{radius.pill}" },
  },
  swipeArea: {
    size: { value: "{size.area.swipe.sm}" },
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
    background: { value: "{color.action.primary.base}" },
    foreground: { value: "{color.text.inverse}" },
    hover: {
      background: { value: "{color.action.primary.hover}" },
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
