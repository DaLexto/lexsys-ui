import type { ComponentTokenGroup } from "../types/index.js"

export const toggleGroupComponentTokens: ComponentTokenGroup = {
  component: "toggle-group",
  background: { $value: "{color.background.subtle}" },
  borderColor: { $value: "{color.border.default}" },
  radius: { $value: "{radius.control}" },
  padding: { $value: "{spacing.1}" },
  gap: {
    $type: "dimension",
    sm: { $value: "{spacing.1}" },
    md: { $value: "{spacing.1}" },
    lg: { $value: "{spacing.2}" },
  },
}
