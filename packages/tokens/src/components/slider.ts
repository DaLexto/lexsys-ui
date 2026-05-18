import type { ComponentTokenGroup } from "../types"

export const sliderComponentTokens: ComponentTokenGroup = {
  component: "slider",
  gap: { $value: "{spacing.control.gap.md}" },
  control: {
    $type: "dimension",
    paddingY: { $value: "{spacing.control.y.sm}" },
  },
  track: {
    background: { $value: "{color.background.subtle}" },
    radius: { $value: "{radius.pill}" },
    height: { $value: "{size.track.md}" },
  },
  indicator: {
    $type: "color",
    background: { $value: "{action.primary.base}" },
  },
  thumb: {
    background: { $value: "{color.background.base}" },
    borderColor: { $value: "{action.primary.base}" },
    radius: { $value: "{radius.pill}" },
    size: { $value: "{size.thumb.md}" },
  },
  focus: {
    ringColor: { $value: "{color.border.focus}" },
    ringOffsetColor: { $value: "{color.background.base}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
}
