import { componentTokens } from "../types/authoring";

export const statsCardComponentTokens = componentTokens("stats-card", {
  value: {
    foreground: { $value: "{color.text.primary}" },
    font: {
      size: { $value: "{typography.heading.md.fontSize}" },
      weight: { $value: "{typography.heading.md.fontWeight}" },
      lineHeight: { $value: "{typography.heading.md.lineHeight}" },
    },
  },
  trend: {
    foreground: { $value: "{color.text.secondary}" },
    font: {
      size: { $value: "{typography.body.xs.fontSize}" },
      lineHeight: { $value: "{typography.body.xs.lineHeight}" },
    },
  },
});
