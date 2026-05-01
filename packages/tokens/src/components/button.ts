import type { ComponentTokenGroup } from "../types/index.js"

export const buttonComponentTokens: ComponentTokenGroup = {
  component: "button",
  radius: { value: "{radius.control}" },
  height: {
    sm: { value: "2rem" },
    md: { value: "2.5rem" },
    lg: { value: "3rem" },
  },
  padding: {
    x: {
      sm: { value: "{spacing.control.x.sm}" },
      md: { value: "{spacing.control.x.md}" },
      lg: { value: "{spacing.control.x.lg}" },
    },
  },
  font: {
    weight: { value: "500" },
  },
  transition: {
    duration: { value: "{motion.duration.control}" },
  },
}
