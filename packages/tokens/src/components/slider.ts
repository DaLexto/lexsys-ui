import type { ComponentTokenGroup } from "../types/index.js"

export const sliderComponentTokens: ComponentTokenGroup = {
  component: "slider",
  gap: { value: "{spacing.control.gap.md}" },
  control: {
    paddingY: { value: "{spacing.control.y.sm}" },
  },
  track: {
    background: { value: "{color.muted}" },
    radius: { value: "{radius.pill}" },
    height: { value: "{size.track.md}" },
  },
  indicator: {
    background: { value: "{color.primary}" },
  },
  thumb: {
    background: { value: "{color.background}" },
    borderColor: { value: "{color.primary}" },
    radius: { value: "{radius.pill}" },
    size: { value: "{size.thumb.md}" },
  },
  focus: {
    ringColor: { value: "{color.ring}" },
    ringOffsetColor: { value: "{color.background}" },
  },
  transition: {
    duration: { value: "{motion.duration.control}" },
    easing: { value: "{motion.easing.control}" },
  },
}
