import { componentTokens } from "../types/authoring";

export const navigationMenuComponentTokens = componentTokens(
  "navigation-menu",
  {
    radius: { $value: "{radius.surface}" },
    trigger: {
      background: { $value: "{color.background.surface}" },
      foreground: { $value: "{color.text.primary}" },
      borderColor: { $value: "{border.default}" },
      hoverBackground: { $value: "{color.background.subtle}" },
    },
    list: {
      gap: { $value: "{spacing.control.gap.sm}" },
      padding: { $value: "{spacing.control.y.xs}" },
    },
    item: {
      foreground: { $value: "{color.text.primary}" },
      highlight: {
        $type: "color",
        background: { $value: "{color.background.subtle}" },
        foreground: { $value: "{color.text.primary}" },
      },
      active: {
        $type: "color",
        background: { $value: "{action.primary.base}" },
        foreground: { $value: "{color.text.inverse}" },
      },
    },
    popup: {
      background: { $value: "{color.background.base}" },
      foreground: { $value: "{color.text.primary}" },
      borderColor: { $value: "{border.default}" },
      shadow: { $value: "{elevation.shadow.floating.boxShadow}" },
    },
    viewport: {
      maxHeight: { $value: "{size.overlay.list.maxHeight}" },
    },
    focus: {
      ringColor: { $value: "{border.focus}" },
      ringOffsetColor: { $value: "{color.background.base}" },
      ringWidth: { $value: "{outline.width.focus}" },
      ringOffset: { $value: "{outline.offset.focus}" },
    },
    transition: {
      duration: { $value: "{motion.duration.surface}" },
      easing: { $value: "{motion.easing.control}" },
    },
  },
);
