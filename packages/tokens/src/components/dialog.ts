import { componentTokens } from "../types/authoring"

export const dialogComponentTokens = componentTokens("dialog", {
  backdrop: {
    background: { $value: "{color.text.primary}" },
    opacity: { $value: 0.48 },
    zIndex: { $value: "{elevation.backdrop.zIndex}" },
  },
  viewport: {
    $type: "dimension",
    padding: { $value: "{spacing.surface.md}" },
    zIndex: { $value: "{elevation.layer.zIndex}" },
  },
  popup: {
    background: { $value: "{color.background.base}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{border.default}" },
    radius: { $value: "{radius.surface}" },
    maxWidth: { $value: "{size.panel.width.lg}" },
    padding: { $value: "{spacing.surface.md}" },
    gap: { $value: "{spacing.surface.gap.md}" },
    shadow: { $value: "{elevation.shadow.raised.boxShadow}" },
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
    ringWidth: { $value: "{outline.width.focus}" },
    ringOffset: { $value: "{outline.offset.focus}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
})
