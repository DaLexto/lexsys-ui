import { componentTokens } from "../types/authoring";

export const dashboardShellComponentTokens = componentTokens(
  "dashboard-shell",
  {
    root: {
      background: { $value: "{color.background.base}" },
      foreground: { $value: "{color.text.primary}" },
    },
    main: {
      background: { $value: "{color.background.base}" },
    },
    header: {
      padding: {
        $type: "dimension",
        x: { $value: "{spacing.control.x.md}" },
        y: { $value: "{spacing.control.x.sm}" },
      },
      background: { $value: "{color.background.base}" },
      borderColor: { $value: "{border.default}" },
    },
    content: {
      padding: { $value: "{spacing.surface.sm}" },
      background: { $value: "{color.background.base}" },
    },
  },
);
