import { componentTokens } from "../types/authoring"

export const tableComponentTokens = componentTokens("table", {
  background: { $value: "{color.background.surface}" },
  foreground: { $value: "{color.text.primary}" },
  borderColor: { $value: "{border.default}" },
  caption: {
    foreground: { $value: "{color.text.secondary}" },
    font: {
      size: { $value: "{typography.body.sm.fontSize}" },
      lineHeight: { $value: "{typography.body.sm.lineHeight}" },
    },
  },
  head: {
    background: { $value: "{color.background.subtle}" },
    foreground: { $value: "{color.text.primary}" },
    font: {
      size: { $value: "{typography.body.sm.fontSize}" },
      weight: { $value: "{typography.body.sm.fontWeight}" },
      lineHeight: { $value: "{typography.body.sm.lineHeight}" },
    },
  },
  cell: {
    font: {
      size: { $value: "{typography.body.sm.fontSize}" },
      lineHeight: { $value: "{typography.body.sm.lineHeight}" },
    },
    padding: {
      $type: "dimension",
      x: { $value: "{spacing.surface.md}" },
      y: { $value: "{spacing.surface.sm}" },
    },
  },
  row: {
    striped: {
      background: { $value: "{color.background.subtle}" },
    },
  },
  footer: {
    background: { $value: "{color.background.subtle}" },
    foreground: { $value: "{color.text.secondary}" },
  },
})
