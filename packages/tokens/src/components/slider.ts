import type { ComponentTokenGroup } from "../types/index.js"

export const sliderComponentTokens: ComponentTokenGroup = {
  component: "slider",
  gap: { $value: "{spacing.control.gap.md}" },
  control: {
    paddingY: { $value: "{spacing.control.y.sm}" },
  },
  track: {
    background: { $value: "{color.background.subtle}" },
    radius: { $value: "{radius.pill}" },
    height: { $value: "{size.track.md}" },
  },
  indicator: {
    background: { $value: "{color.action.primary.base}" },
  },
  thumb: {
    background: { $value: "{color.background.base}" },
    borderColor: { $value: "{color.action.primary.base}" },
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
