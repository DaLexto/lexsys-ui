import { componentTokens } from "../types/authoring";

export const datePickerComponentTokens = componentTokens("date-picker", {
  calendar: {
    background: { $value: "{color.background.base}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{border.default}" },
    radius: { $value: "{radius.surface}" },
    padding: { $value: "{spacing.surface.md}" },
    gap: { $value: "{spacing.surface.gap.sm}" },
    width: { $value: "{size.panel.width.sm}" },
    grid: {
      gap: { $value: "{spacing.surface.gap.sm}" },
    },
  },
  header: {
    foreground: { $value: "{color.text.primary}" },
    font: {
      size: { $value: "{typography.heading.xs.fontSize}" },
      weight: { $value: "{typography.heading.xs.fontWeight}" },
      lineHeight: { $value: "{typography.heading.xs.lineHeight}" },
    },
  },
  weekday: {
    foreground: { $value: "{color.text.secondary}" },
    font: {
      size: { $value: "{typography.label.xs.fontSize}" },
      weight: { $value: "{typography.label.xs.fontWeight}" },
      lineHeight: { $value: 1 },
    },
  },
  day: {
    size: { $value: "{size.control.md}" },
    radius: { $value: "{radius.selection}" },
    background: { $value: "transparent" },
    foreground: { $value: "{color.text.primary}" },
    hover: {
      $type: "color",
      background: { $value: "{color.background.subtle}" },
    },
    selectedBackground: { $value: "{action.primary.base}" },
    selectedForeground: { $value: "{color.text.inverse}" },
    outsideForeground: { $value: "{color.text.secondary}" },
    todayBorderColor: { $value: "{border.focus}" },
    font: {
      size: { $value: "{typography.control.sm.fontSize}" },
      weight: { $value: "{typography.control.sm.fontWeight}" },
      lineHeight: { $value: 1 },
    },
  },
  nav: {
    size: { $value: "{size.control.sm}" },
    foreground: { $value: "{color.text.secondary}" },
    hover: {
      $type: "color",
      background: { $value: "{color.background.subtle}" },
      foreground: { $value: "{color.text.primary}" },
    },
    radius: { $value: "{radius.control}" },
  },
  focus: {
    ringColor: { $value: "{border.focus}" },
    ringOffsetColor: { $value: "{color.background.base}" },
    ringWidth: { $value: "{outline.width.focus}" },
    ringOffset: { $value: "{outline.offset.focus}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
  trigger: {
    input: {
      embedded: {
        height: { $value: "{size.control.sm}" },
        background: { $value: "transparent" },
        padding: {
          $type: "dimension",
          x: { $value: "{spacing.control.x.sm}" },
        },
      },
    },
  },
});
