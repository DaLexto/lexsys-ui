import type { SemanticTokenGroup } from "../types/index.js"

export const motionSemantics: SemanticTokenGroup = {
  name: "motion",
  tokens: [
    { name: "duration-control", value: "var(--nx-duration-fast)" },
    { name: "duration-surface", value: "var(--nx-duration-fast)" },
  ],
}
