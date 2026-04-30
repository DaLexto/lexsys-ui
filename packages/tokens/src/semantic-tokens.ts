import type { SemanticTokenGroup } from "./types.js"

export const semanticTokens: SemanticTokenGroup[] = [
  {
    name: "radius",
    tokens: [
      { name: "radius-control", value: "var(--nx-radius-md)" },
      { name: "radius-surface", value: "var(--nx-radius-lg)" },
    ],
  },
  {
    name: "spacing",
    tokens: [
      { name: "space-control-x-sm", value: "var(--nx-space-3)" },
      { name: "space-control-x-md", value: "var(--nx-space-4)" },
      { name: "space-control-x-lg", value: "var(--nx-space-6)" },
      { name: "space-surface-sm", value: "var(--nx-space-4)" },
      { name: "space-surface-md", value: "var(--nx-space-6)" },
      { name: "space-surface-gap-sm", value: "var(--nx-space-1)" },
      { name: "space-surface-gap-md", value: "var(--nx-space-3)" },
    ],
  },
  {
    name: "motion",
    tokens: [
      { name: "duration-control", value: "var(--nx-duration-fast)" },
      { name: "duration-surface", value: "var(--nx-duration-fast)" },
    ],
  },
]
