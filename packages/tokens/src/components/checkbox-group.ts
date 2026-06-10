import { componentTokens } from "../types/authoring";

export const checkboxGroupComponentTokens = componentTokens("checkbox-group", {
  gap: { $value: "{spacing.control.gap.md}" },
  label: {
    foreground: { $value: "{color.text.primary}" },
    font: {
      size: { $value: "{typography.label.sm.fontSize}" },
      weight: { $value: "{typography.label.sm.fontWeight}" },
      lineHeight: { $value: "{typography.label.sm.lineHeight}" },
    },
  },
});
