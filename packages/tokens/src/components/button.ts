import type { ComponentTokenGroup } from "../types/index.js"

export const buttonComponentTokens: ComponentTokenGroup = {
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
}
