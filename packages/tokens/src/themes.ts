import type { ThemeDefinition } from "./types.js"

export const themes: ThemeDefinition[] = [
  {
    name: "light",
    selector: ":root",
    colorScheme: "light",
    tokens: {
      "color-background": "var(--nx-color-white)",
      "color-foreground": "var(--nx-color-neutral-950)",
      "color-muted": "var(--nx-color-neutral-100)",
      "color-muted-foreground": "var(--nx-color-neutral-500)",
      "color-surface": "var(--nx-color-white)",
      "color-surface-foreground": "var(--nx-color-neutral-950)",
      "color-border": "var(--nx-color-neutral-200)",
      "color-ring": "var(--nx-color-blue-600)",
      "color-primary": "var(--nx-color-blue-600)",
      "color-primary-foreground": "var(--nx-color-white)",
      "color-primary-hover": "var(--nx-color-blue-700)",
      "color-destructive": "var(--nx-color-red-600)",
      "color-destructive-foreground": "var(--nx-color-white)",
    },
  },
  {
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
  },
]
