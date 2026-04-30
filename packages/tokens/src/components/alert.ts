import type { ComponentTokenGroup } from "../types/index.js"

export const alertComponentTokens: ComponentTokenGroup = {
  component: "alert",
  tokens: [
    { name: "alert-radius", value: "var(--nx-radius-surface)" },
    { name: "alert-padding", value: "var(--nx-space-surface-sm)" },
    { name: "alert-gap", value: "var(--nx-space-surface-gap-sm)" },
    {
      name: "alert-transition-duration",
      value: "var(--nx-duration-surface)",
    },
    { name: "alert-neutral-background", value: "var(--nx-color-surface)" },
    { name: "alert-neutral-foreground", value: "var(--nx-color-foreground)" },
    { name: "alert-neutral-border-color", value: "var(--nx-color-border)" },
    { name: "alert-primary-background", value: "var(--nx-color-muted)" },
    { name: "alert-primary-foreground", value: "var(--nx-color-primary)" },
    { name: "alert-primary-border-color", value: "var(--nx-color-primary)" },
    {
      name: "alert-destructive-background",
      value: "var(--nx-color-muted)",
    },
    {
      name: "alert-destructive-foreground",
      value: "var(--nx-color-destructive)",
    },
    {
      name: "alert-destructive-border-color",
      value: "var(--nx-color-destructive)",
    },
  ],
}
