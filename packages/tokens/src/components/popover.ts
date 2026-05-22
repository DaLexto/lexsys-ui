import { componentTokens } from "../types/authoring"

export const popoverComponentTokens = componentTokens("popover", {
  backdrop: {
    background: { $value: "{color.text.primary}" },
    opacity: { $value: 0.24 },
    zIndex: { $value: "{elevation.backdrop.zIndex}" },
  },
  positioner: {
    zIndex: { $value: "{elevation.floating.zIndex}" },
  },
  popup: {
    background: { $value: "{color.background.base}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{border.default}" },
    radius: { $value: "{radius.surface}" },
    maxWidth: { $value: "{size.80}" },
    padding: { $value: "{spacing.surface.md}" },
    gap: { $value: "{spacing.surface.gap.sm}" },
    shadow: { $value: "{elevation.shadow.floating}" },
  },
  arrow: {
    $type: "dimension",
    size: { $value: "{size.selectionControl.sm}" },
  },
  title: {
    foreground: { $value: "{color.text.primary}" },
    paddingEnd: { $value: "{size.control.lg}" },
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
  trigger: {
    background: { $value: "{color.background.base}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{border.default}" },
    hover: {
      $type: "color",
      background: { $value: "{color.background.subtle}" },
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
