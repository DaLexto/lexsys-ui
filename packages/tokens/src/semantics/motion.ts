import { semanticTokens } from "../types/authoring"

export const motionSemantics = semanticTokens("motion", {
  duration: {
    $type: "duration",
    control: { $value: "{motion.duration.fast}" },
    surface: { $value: "{motion.duration.fast}" },
  },
  easing: {
    $type: "cubicBezier",
    control: { $value: "{motion.easing.standard}" },
    surface: { $value: "{motion.easing.standard}" },
  },
  offset: {
    $type: "dimension",
    entry: {
      y: { $value: "{spacing.2}" },
    },
  },
})
