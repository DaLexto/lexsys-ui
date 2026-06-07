import { componentTokens } from "../types/authoring"

export const settingsPageLayoutComponentTokens = componentTokens(
  "settings-page-layout",
  {
    root: {
      background: { $value: "{color.background.base}" },
      foreground: { $value: "{color.text.primary}" },
    },
    header: {
      padding: {
        $type: "dimension",
        x: { $value: "{spacing.surface.sm}" },
        top: { $value: "{spacing.surface.sm}" },
      },
    },
    body: {
      gap: { $value: "{spacing.surface.sm}" },
      padding: {
        $type: "dimension",
        x: { $value: "{spacing.surface.sm}" },
        bottom: { $value: "{spacing.surface.sm}" },
      },
    },
    nav: {
      gap: { $value: "{spacing.surface.gap.md}" },
      width: { $value: "{size.sidebar.width}" },
    },
    main: {
      gap: { $value: "{spacing.surface.sm}" },
    },
  },
)
