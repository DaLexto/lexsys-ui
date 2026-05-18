import type { SemanticTokenGroup } from "../types"

export const motionSemantics: SemanticTokenGroup = {
  name: "motion",
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
}
