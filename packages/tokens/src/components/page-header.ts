import { componentTokens } from "../types/authoring"

export const pageHeaderComponentTokens = componentTokens("page-header", {
  root: {
    gap: { $value: "{spacing.surface.sm}" },
    padding: {
      $type: "dimension",
      bottom: { $value: "{spacing.surface.sm}" },
    },
    borderColor: { $value: "{border.default}" },
  },
  top: {
    gap: { $value: "{spacing.surface.gap.md}" },
  },
  heading: {
    gap: { $value: "{spacing.surface.gap.sm}" },
  },
  actions: {
    gap: { $value: "{spacing.control.gap.md}" },
  },
})
