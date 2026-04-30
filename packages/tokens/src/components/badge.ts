import type { ComponentTokenGroup } from "../types/index.js"

export const badgeComponentTokens: ComponentTokenGroup = {
  component: "badge",
  tokens: [
    { name: "badge-radius", value: "var(--nx-radius-control)" },
    { name: "badge-height-sm", value: "1.5rem" },
    { name: "badge-height-md", value: "1.75rem" },
    { name: "badge-padding-x-sm", value: "var(--nx-space-control-x-xs)" },
    { name: "badge-padding-x-md", value: "var(--nx-space-control-x-sm)" },
    { name: "badge-font-size-sm", value: "0.75rem" },
    { name: "badge-font-size-md", value: "0.8125rem" },
    { name: "badge-font-weight", value: "500" },
    {
      name: "badge-transition-duration",
      value: "var(--nx-duration-control)",
    },
    { name: "badge-outline-background", value: "transparent" },
    { name: "badge-neutral-background", value: "var(--nx-color-muted)" },
    { name: "badge-neutral-foreground", value: "var(--nx-color-foreground)" },
    { name: "badge-neutral-border-color", value: "var(--nx-color-border)" },
    { name: "badge-primary-background", value: "var(--nx-color-primary)" },
    {
      name: "badge-primary-foreground",
      value: "var(--nx-color-primary-foreground)",
    },
    { name: "badge-primary-border-color", value: "var(--nx-color-primary)" },
    {
      name: "badge-destructive-background",
      value: "var(--nx-color-destructive)",
    },
    {
      name: "badge-destructive-foreground",
      value: "var(--nx-color-destructive-foreground)",
    },
    {
      name: "badge-destructive-border-color",
      value: "var(--nx-color-destructive)",
    },
  ],
}
