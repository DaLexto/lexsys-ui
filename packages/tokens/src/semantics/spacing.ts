import type { SemanticTokenGroup } from "../types/index.js"

export const spacingSemantics: SemanticTokenGroup = {
  name: "spacing",
  tokens: [
    { name: "space-control-x-xs", value: "var(--nx-space-2)" },
    { name: "space-control-x-sm", value: "var(--nx-space-3)" },
    { name: "space-control-x-md", value: "var(--nx-space-4)" },
    { name: "space-control-x-lg", value: "var(--nx-space-6)" },
    { name: "space-surface-sm", value: "var(--nx-space-4)" },
    { name: "space-surface-md", value: "var(--nx-space-6)" },
    { name: "space-surface-gap-sm", value: "var(--nx-space-1)" },
    { name: "space-surface-gap-md", value: "var(--nx-space-3)" },
  ],
}
