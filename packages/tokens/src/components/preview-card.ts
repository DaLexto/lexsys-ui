import { componentTokens } from "../types/authoring";

export const previewCardComponentTokens = componentTokens("preview-card", {
  backdrop: {
    background: { $value: "{color.text.primary}" },
    opacity: { $value: 0.24 },
    zIndex: { $value: "{elevation.backdrop.zIndex}" },
  },
  positioner: {
    zIndex: { $value: "{elevation.floating.zIndex}" },
    sideOffset: { $value: "{spacing.overlay.sideOffset}" },
  },
  popup: {
    background: { $value: "{color.background.base}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{border.default}" },
    radius: { $value: "{radius.surface}" },
    maxWidth: { $value: "{size.panel.width.sm}" },
    padding: { $value: "{spacing.surface.md}" },
    shadow: { $value: "{elevation.shadow.floating.boxShadow}" },
  },
  arrow: {
    $type: "dimension",
    size: { $value: "{size.icon.sm}" },
  },
  trigger: {
    focus: {
      ringColor: { $value: "{border.focus}" },
      ringOffsetColor: { $value: "{color.background.base}" },
      ringWidth: { $value: "{outline.width.focus}" },
      ringOffset: { $value: "{outline.offset.focus}" },
    },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
});
