import type { ComponentTokenGroup } from "./types.js"

export const componentTokens: ComponentTokenGroup[] = [
  {
    component: "button",
    tokens: [
      { name: "button-radius", value: "var(--nx-radius-control)" },
      { name: "button-height-sm", value: "2rem" },
      { name: "button-height-md", value: "2.5rem" },
      { name: "button-height-lg", value: "3rem" },
      { name: "button-padding-x-sm", value: "var(--nx-space-control-x-sm)" },
      { name: "button-padding-x-md", value: "var(--nx-space-control-x-md)" },
      { name: "button-padding-x-lg", value: "var(--nx-space-control-x-lg)" },
      { name: "button-font-weight", value: "500" },
      {
        name: "button-transition-duration",
        value: "var(--nx-duration-control)",
      },
    ],
  },
  {
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
  },
]
