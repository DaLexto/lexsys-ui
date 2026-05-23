import { componentTokens } from "../types/authoring"

export const tooltipComponentTokens = componentTokens("tooltip", {
  positioner: {
    zIndex: { $value: "{elevation.tooltip.zIndex}" },
    sideOffset: { $value: "{spacing.overlay.sideOffset}" },
  },
  background: { $value: "{color.text.primary}" },
  foreground: { $value: "{color.background.base}" },
  borderColor: { $value: "{border.default}" },
  radius: { $value: "{radius.control}" },
  shadow: { $value: "{elevation.shadow.floating.boxShadow}" },
  padding: {
    $type: "dimension",
    x: { $value: "{spacing.control.x.xs}" },
    y: { $value: "{spacing.control.y.xs}" },
  },
  font: {
    size: { $value: "{typography.label.xs.fontSize}" },
    weight: { $value: "{typography.label.xs.fontWeight}" },
    lineHeight: { $value: "{typography.label.xs.lineHeight}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
})
