import { componentTokens } from "../types/authoring"

export const contextMenuComponentTokens = componentTokens("context-menu", {
  radius: { $value: "{radius.surface}" },
  popup: {
    background: { $value: "{color.background.base}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{border.default}" },
    shadow: { $value: "{elevation.shadow.floating.boxShadow}" },
  },
  positioner: {
    zIndex: { $value: "{elevation.floating.zIndex}" },
    sideOffset: { $value: "{spacing.overlay.sideOffset}" },
  },
  list: {
    gap: { $value: "{spacing.control.gap.sm}" },
    padding: { $value: "{spacing.control.y.xs}" },
  },
  item: {
    foreground: { $value: "{color.text.primary}" },
    radius: { $value: "{radius.control}" },
    padding: {
      $type: "dimension",
      x: { $value: "{spacing.control.x.sm}" },
      y: { $value: "{spacing.control.y.xs}" },
    },
    highlight: {
      $type: "color",
      background: { $value: "{color.background.subtle}" },
      foreground: { $value: "{color.text.primary}" },
    },
    focus: {
      ring: {
        width: { $value: "{outline.width.focus}" },
        color: { $value: "{border.focus}" },
        offset: { $value: "{outline.offset.focus}" },
        offsetColor: { $value: "{color.background.base}" },
      },
    },
  },
  separator: {
    background: { $value: "{border.default}" },
    margin: {
      $type: "dimension",
      y: { $value: "{spacing.control.y.xs}" },
    },
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
