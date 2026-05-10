import type { ComponentTokenGroup } from "../types/index.js"

export const switchComponentTokens: ComponentTokenGroup = {
  component: "switch",
  background: { value: "{color.background.subtle}" },
  checked: {
    background: { value: "{color.action.primary.base}" },
  },
  radius: { value: "{radius.pill}" },
  padding: { value: "{spacing.1}" },
  width: {
    sm: { value: "{size.switch.width.sm}" },
    md: { value: "{size.switch.width.md}" },
    lg: { value: "{size.switch.width.lg}" },
  },
  height: {
    sm: { value: "{size.switch.height.sm}" },
    md: { value: "{size.switch.height.md}" },
    lg: { value: "{size.switch.height.lg}" },
  },
  thumb: {
    background: { value: "{color.background.base}" },
    radius: { value: "{radius.pill}" },
    size: {
      sm: { value: "{size.switch.thumb.sm}" },
      md: { value: "{size.switch.thumb.md}" },
      lg: { value: "{size.switch.thumb.lg}" },
    },
    translate: {
      sm: { value: "{size.switch.thumbTranslate.sm}" },
      md: { value: "{size.switch.thumbTranslate.md}" },
      lg: { value: "{size.switch.thumbTranslate.lg}" },
    },
  },
  focus: {
    ringColor: { value: "{color.border.focus}" },
    ringOffsetColor: { value: "{color.background.base}" },
  },
  transition: {
    duration: { value: "{motion.duration.control}" },
    easing: { value: "{motion.easing.control}" },
  },
}
