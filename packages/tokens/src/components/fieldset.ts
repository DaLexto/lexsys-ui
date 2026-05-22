import type { ComponentTokenGroup } from "../types"

export const fieldsetComponentTokens: ComponentTokenGroup = {
  component: "fieldset",
  background: { $value: "{color.background.surface}" },
  foreground: { $value: "{color.text.primary}" },
  borderColor: { $value: "{color.border.default}" },
  radius: { $value: "{radius.surface}" },
  padding: { $value: "{spacing.surface.md}" },
  gap: { $value: "{spacing.surface.gap.md}" },
  legend: {
    foreground: { $value: "{color.text.primary}" },
    margin: {
      $type: "dimension",
      bottom: { $value: "{spacing.surface.gap.sm}" },
    },
    font: {
      size: { $value: "{typography.label.md.fontSize}" },
      weight: { $value: "{typography.label.md.fontWeight}" },
      lineHeight: { $value: "{typography.label.md.lineHeight}" },
      letterSpacing: { $value: "{typography.label.md.letterSpacing}" },
    },
  },
}
