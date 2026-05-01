import type { SemanticTokenGroup } from "../types/index.js"

export const motionSemantics: SemanticTokenGroup = {
  name: "motion",
  duration: {
    control: { value: "{motion.duration.fast}" },
    surface: { value: "{motion.duration.fast}" },
  },
}
