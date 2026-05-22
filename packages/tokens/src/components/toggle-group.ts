import { componentTokens } from "../types/authoring"

export const toggleGroupComponentTokens = componentTokens("toggle-group", {
  background: { $value: "{color.background.subtle}" },
  borderColor: { $value: "{border.default}" },
  radius: { $value: "{radius.control}" },
  padding: { $value: "{spacing.control.y.xs}" },
  gap: {
    $type: "dimension",
    sm: { $value: "{spacing.control.gap.sm}" },
    md: { $value: "{spacing.control.gap.sm}" },
    lg: { $value: "{spacing.control.gap.md}" },
  },

})
