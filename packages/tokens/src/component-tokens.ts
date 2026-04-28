import type { ComponentTokenGroup } from "./types.js"

export const componentTokens: ComponentTokenGroup[] = [
  {
    component: "button",
    tokens: [
      { name: "button-radius", value: "var(--nx-radius-md)" },
      { name: "button-height-sm", value: "2rem" },
      { name: "button-height-md", value: "2.5rem" },
      { name: "button-height-lg", value: "3rem" },
      { name: "button-padding-x-sm", value: "var(--nx-space-3)" },
      { name: "button-padding-x-md", value: "var(--nx-space-4)" },
      { name: "button-padding-x-lg", value: "var(--nx-space-6)" },
      { name: "button-font-weight", value: "500" },
      { name: "button-transition-duration", value: "var(--nx-duration-fast)" },
    ],
  },
]
