import type { ComponentTokenGroup } from "../types/index.js"

export const fieldsetComponentTokens: ComponentTokenGroup = {
  component: "fieldset",
  background: { value: "{color.surface}" },
  foreground: { value: "{color.surface.foreground}" },
  borderColor: { value: "{color.border}" },
  radius: { value: "{radius.surface}" },
  padding: { value: "{spacing.surface.md}" },
  gap: { value: "{spacing.surface.gap.md}" },
  legend: {
    foreground: { value: "{color.foreground}" },
    margin: {
      bottom: { value: "{spacing.surface.gap.sm}" },
    },
    font: {
      size: { value: "{typography.label.md.fontSize}" },
      weight: { value: "{typography.label.md.fontWeight}" },
      lineHeight: { value: "{typography.label.md.lineHeight}" },
      letterSpacing: { value: "{typography.label.md.letterSpacing}" },
    },
  },
}
