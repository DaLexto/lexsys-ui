import type { ThemeDefinition } from "../types/index.js"

export const lightTheme: ThemeDefinition = {
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
}
