import { semanticTokens } from "../types/authoring"

export const motionSemantics = semanticTokens("motion", {
  duration: {
    $type: "duration",
    control: { $value: "{motion.duration.fast}" },
    surface: { $value: "{motion.duration.normal}" },
    overlayEnter: { $value: "{motion.duration.slow}" },
    overlayExit: { $value: "{motion.duration.fast}" },
    layout: { $value: "{motion.duration.slow}" },
  },
  easing: {
    $type: "cubicBezier",
    control: { $value: "{motion.easing.standard}" },
    surface: { $value: "{motion.easing.standard}" },
    easeIn: { $value: "{motion.easing.enter}" },
    easeOut: { $value: "{motion.easing.exit}" },
    layout: { $value: "{motion.easing.standard}" },
  },
  offset: {
    $type: "dimension",
    entry: {
      y: { $value: "{spacing.2}" },
    },
    slide: {
      panel: { $value: "{size.64}" },
    },
  },
})
