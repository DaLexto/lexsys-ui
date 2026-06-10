import { componentTokens } from "../types/authoring";

export const commandPaletteComponentTokens = componentTokens(
  "command-palette",
  {
    root: {
      gap: { $value: "{spacing.control.gap.md}" },
    },
    list: {
      maxHeight: { $value: "{size.commandPalette.list.maxHeight}" },
    },
    groupLabel: {
      padding: {
        $type: "dimension",
        x: { $value: "{spacing.control.x.sm}" },
        y: { $value: "{spacing.control.y.xs}" },
      },
    },
    item: {
      gap: { $value: "{spacing.control.gap.sm}" },
      padding: {
        $type: "dimension",
        x: { $value: "{spacing.control.x.sm}" },
        y: { $value: "{spacing.control.y.sm}" },
      },
      radius: { $value: "{radius.control}" },
      foreground: { $value: "{color.text.primary}" },
      hoverBackground: { $value: "{action.secondary.hover}" },
    },
    itemDescription: {
      foreground: { $value: "{color.text.secondary}" },
    },
    empty: {
      padding: {
        $type: "dimension",
        x: { $value: "{spacing.control.x.sm}" },
        y: { $value: "{spacing.surface.sm}" },
      },
    },
  },
);
