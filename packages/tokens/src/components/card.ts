import type { ComponentTokenGroup } from "../types/index.js"

export const cardComponentTokens: ComponentTokenGroup = {
  component: "card",
  tokens: [
    { name: "card-background", value: "var(--nx-color-surface)" },
    { name: "card-foreground", value: "var(--nx-color-surface-foreground)" },
    { name: "card-border-color", value: "var(--nx-color-border)" },
    { name: "card-radius", value: "var(--nx-radius-surface)" },
    { name: "card-padding", value: "var(--nx-space-surface-md)" },
    { name: "card-gap-sm", value: "var(--nx-space-surface-gap-sm)" },
    { name: "card-gap-md", value: "var(--nx-space-surface-gap-md)" },
    {
      name: "card-header-padding-bottom",
      value: "var(--nx-space-surface-sm)",
    },
    { name: "card-transition-duration", value: "var(--nx-duration-surface)" },
  ],
}
