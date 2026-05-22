import { componentTokens } from "../types/authoring"

export const drawerComponentTokens = componentTokens("drawer", {
  backdrop: {
    background: { $value: "{color.text.primary}" },
    opacity: { $value: 0.48 },
    zIndex: { $value: "{elevation.backdrop.zIndex}" },
  },
  indent: {
    background: { $value: "{color.background.subtle}" },
    scale: { $value: 0.96 },
    radius: { $value: "{radius.surface}" },
  },
  viewport: {
    $type: "dimension",
    padding: { $value: "{spacing.surface.sm}" },
    zIndex: { $value: "{elevation.layer.zIndex}" },
  },
  popup: {
    background: { $value: "{color.background.base}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{border.default}" },
    radius: { $value: "{radius.surface}" },
    maxWidth: { $value: "{size.160}" },
    width: {
      $type: "dimension",
      sm: { $value: "{size.80}" },
      md: { $value: "{size.96}" },
      lg: { $value: "{size.128}" },
    },
    height: {
      $type: "dimension",
      sm: { $value: "{size.48}" },
      md: { $value: "{size.80}" },
      lg: { $value: "{size.128}" },
    },
    shadow: { $value: "{elevation.shadow.raised}" },
  },
  content: {
    $type: "dimension",
    padding: { $value: "{spacing.surface.md}" },
    gap: { $value: "{spacing.surface.gap.md}" },
  },
  handle: {
    $type: "dimension",
    background: { $value: "{border.default}" },
    width: { $value: "{size.control.lg}" },
    height: { $value: "{size.track.md}" },
    marginTop: { $value: "{spacing.control.y.sm}" },
    radius: { $value: "{radius.pill}" },
  },
  swipeArea: {
    $type: "dimension",
    size: { $value: "{size.area.swipe.sm}" },
  },
  title: {
    foreground: { $value: "{color.text.primary}" },
    paddingEnd: { $value: "{size.control.lg}" },
    font: {
      size: { $value: "{typography.heading.sm.fontSize}" },
      weight: { $value: "{typography.heading.sm.fontWeight}" },
      lineHeight: { $value: "{typography.heading.sm.lineHeight}" },
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
  trigger: {
    background: { $value: "{action.primary.base}" },
    foreground: { $value: "{color.text.inverse}" },
    hover: {
      $type: "color",
      background: { $value: "{action.primary.hover}" },
    },
    height: { $value: "{size.control.md}" },
    radius: { $value: "{radius.control}" },
    padding: {
      $type: "dimension",
      x: { $value: "{spacing.control.x.md}" },
    },
    font: {
      size: { $value: "{typography.control.md.fontSize}" },
      weight: { $value: "{typography.control.md.fontWeight}" },
      lineHeight: { $value: "{typography.control.md.lineHeight}" },
    },
  },
  close: {
    foreground: { $value: "{color.text.secondary}" },
    hover: {
      $type: "color",
      background: { $value: "{color.background.subtle}" },
    },
    size: { $value: "{size.control.sm}" },
    inset: { $value: "{spacing.control.x.sm}" },
    radius: { $value: "{radius.control}" },
  },
  focus: {
    ringColor: { $value: "{border.focus}" },
    ringOffsetColor: { $value: "{color.background.base}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
})
