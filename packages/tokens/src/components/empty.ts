import { componentTokens } from "../types/authoring"

export const emptyComponentTokens = componentTokens("empty", {
  padding: { $value: "{spacing.surface.md}" },
  gap: { $value: "{spacing.surface.gap.md}" },
  header: {
    gap: { $value: "{spacing.surface.gap.sm}" },
  },
  media: {
    $type: "dimension",
    size: { $value: "{size.control.2xl}" },
    foreground: { $value: "{color.text.disabled}" },
  },
  title: {
    foreground: { $value: "{color.text.primary}" },
    font: {
      size: { $value: "{typography.heading.sm.fontSize}" },
      weight: { $value: "{typography.heading.sm.fontWeight}" },
      lineHeight: { $value: "{typography.heading.sm.lineHeight}" },
    },
  },
  description: {
    foreground: { $value: "{color.text.secondary}" },
    font: {
      size: { $value: "{typography.body.sm.fontSize}" },
      lineHeight: { $value: "{typography.body.sm.lineHeight}" },
    },
  },
})
