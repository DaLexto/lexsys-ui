import type { ThemeDefinition } from "../types/index.js"

export const darkTheme: ThemeDefinition = {
  name: "dark",
  selector: ".dark",
  colorScheme: "dark",
  tokens: {
    "color-background": "var(--nx-color-neutral-950)",
    "color-foreground": "var(--nx-color-neutral-50)",
    "color-muted": "var(--nx-color-neutral-900)",
    "color-muted-foreground": "var(--nx-color-neutral-300)",
    "color-surface": "var(--nx-color-neutral-900)",
    "color-surface-foreground": "var(--nx-color-neutral-50)",
    "color-border": "var(--nx-color-neutral-700)",
    "color-ring": "var(--nx-color-blue-500)",
    "color-primary": "var(--nx-color-blue-500)",
    "color-primary-foreground": "var(--nx-color-white)",
    "color-primary-hover": "var(--nx-color-blue-600)",
    "color-destructive": "var(--nx-color-red-500)",
    "color-destructive-foreground": "var(--nx-color-white)",
  },
}
