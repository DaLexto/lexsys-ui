import { componentTokens } from "../types/authoring"

export const switchComponentTokens = componentTokens("switch", {
  background: { $value: "{color.background.subtle}" },
  checked: {
    $type: "color",
    background: { $value: "{action.primary.base}" },
  },
  radius: { $value: "{radius.pill}" },
  padding: { $value: "{spacing.control.y.xs}" },
  width: {
    $type: "dimension",
    sm: { $value: "{size.switchTrack.width.sm}" },
    md: { $value: "{size.switchTrack.width.md}" },
    lg: { $value: "{size.switchTrack.width.lg}" },
  },
  height: {
    $type: "dimension",
    sm: { $value: "{size.switchTrack.height.sm}" },
    md: { $value: "{size.switchTrack.height.md}" },
    lg: { $value: "{size.switchTrack.height.lg}" },
  },
  thumb: {
    background: { $value: "{color.background.base}" },
    radius: { $value: "{radius.pill}" },
    size: {
      $type: "dimension",
      sm: { $value: "{size.thumb.sm}" },
      md: { $value: "{size.thumb.md}" },
      lg: { $value: "{size.thumb.lg}" },
    },
    translate: {
      $type: "dimension",
      sm: { $value: "{size.thumb.sm}" },
      md: { $value: "{size.thumb.md}" },
      lg: { $value: "{size.thumb.lg}" },
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
