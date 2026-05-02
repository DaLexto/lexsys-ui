import type { ComponentTokenGroup } from "../types"

export const buttonComponentTokens: ComponentTokenGroup = {
  component: "button",
  radius: { value: "{radius.control}" },
  height: {
    xs: { value: "{size.control.xs}" },
    sm: { value: "{size.control.sm}" },
    md: { value: "{size.control.md}" },
    lg: { value: "{size.control.lg}" },
    xl: { value: "{size.control.xl}" },
  },
  padding: {
    x: {
      xs: { value: "{spacing.control.x.xs}" },
      sm: { value: "{spacing.control.x.sm}" },
      md: { value: "{spacing.control.x.md}" },
      lg: { value: "{spacing.control.x.lg}" },
      xl: { value: "{spacing.control.x.xl}" },
    },
  },
  font: {
    weight: { value: "500" },
  },
  transition: {
    duration: { value: "{motion.duration.control}" },
  },
}
