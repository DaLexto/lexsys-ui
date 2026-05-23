import { componentTokens } from "../types/authoring"

export const toastComponentTokens = componentTokens("toast", {
  viewport: {
    $type: "dimension",
    width: { $value: "{size.panel.width.md}" },
    maxHeight: { $value: "{size.overlay.viewport.maxHeight}" },
    inset: { $value: "{spacing.surface.sm}" },
    gap: { $value: "{spacing.surface.gap.sm}" },
    gapExpanded: { $value: "{spacing.surface.gap.md}" },
    padding: { $value: "{spacing.surface.sm}" },
    zIndex: { $value: "{elevation.toast.zIndex}" },
  },
  background: { $value: "{color.background.base}" },
  foreground: { $value: "{color.text.primary}" },
  borderColor: { $value: "{border.default}" },
  shadow: { $value: "{elevation.shadow.raised.boxShadow}" },
  success: {
    $type: "color",
    borderColor: { $value: "{color.feedback.success.foreground}" },
  },
  danger: {
    $type: "color",
    borderColor: { $value: "{color.feedback.danger.foreground}" },
  },
  radius: { $value: "{radius.surface}" },
  padding: { $value: "{spacing.surface.md}" },
  paddingEnd: { $value: "{size.control.lg}" },
  gap: { $value: "{spacing.surface.gap.sm}" },
  content: {
    gap: { $value: "{spacing.surface.gap.sm}" },
    behindOpacity: { $value: 0.72 },
  },
  arrow: {
    $type: "dimension",
    size: { $value: "{size.selectionControl.sm}" },
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
    borderColor: { $value: "{border.default}" },
    hover: {
      $type: "color",
      background: { $value: "{color.background.subtle}" },
    },
    height: { $value: "{size.control.sm}" },
    radius: { $value: "{radius.control}" },
    padding: {
      $type: "dimension",
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
      $type: "color",
      background: { $value: "{color.background.subtle}" },
    },
    size: { $value: "{size.control.sm}" },
    inset: { $value: "{spacing.control.x.sm}" },
    radius: { $value: "{radius.control}" },
  },
  focus: {
    $type: "dimension",
    ringColor: { $value: "{border.focus}" },
    ringWidth: { $value: "{outline.width.inset}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
})
