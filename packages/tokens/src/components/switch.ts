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
    sm: { $value: "{size.9}" },
    md: { $value: "{size.11}" },
    lg: { $value: "{size.13}" },
  },
  height: {
    $type: "dimension",
    sm: { $value: "{size.5}" },
    md: { $value: "{size.6}" },
    lg: { $value: "{size.7}" },
  },
  thumb: {
    background: { $value: "{color.background.base}" },
    radius: { $value: "{radius.pill}" },
    size: {
      $type: "dimension",
      sm: { $value: "{size.4}" },
      md: { $value: "{size.5}" },
      lg: { $value: "{size.6}" },
    },
    translate: {
      $type: "dimension",
      sm: { $value: "{size.4}" },
      md: { $value: "{size.5}" },
      lg: { $value: "{size.6}" },
    },
  },
  focus: {
    ringColor: { $value: "{border.focus}" },
    ringOffsetColor: { $value: "{color.background.base}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
})
