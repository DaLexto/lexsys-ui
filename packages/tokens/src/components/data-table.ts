import { componentTokens } from "../types/authoring";

export const dataTableComponentTokens = componentTokens("data-table", {
  root: {
    gap: { $value: "{spacing.surface.sm}" },
  },
  footer: {
    gap: { $value: "{spacing.surface.gap.md}" },
  },
});
