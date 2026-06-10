import { componentTokens } from "../types/authoring";

export const breadcrumbComponentTokens = componentTokens("breadcrumb", {
  list: {
    gap: { $value: "{spacing.control.gap.sm}" },
  },
  item: {
    gap: { $value: "{spacing.control.gap.sm}" },
  },
  link: {
    foreground: { $value: "{color.text.secondary}" },
    hover: {
      $type: "color",
      foreground: { $value: "{color.text.primary}" },
    },
    font: {
      size: { $value: "{typography.body.sm.fontSize}" },
      weight: { $value: "{typography.body.sm.fontWeight}" },
      lineHeight: { $value: "{typography.body.sm.lineHeight}" },
    },
  },
  page: {
    foreground: { $value: "{color.text.primary}" },
    font: {
      size: { $value: "{typography.body.sm.fontSize}" },
      weight: { $value: "{typography.label.sm.fontWeight}" },
      lineHeight: { $value: "{typography.body.sm.lineHeight}" },
    },
  },
  separator: {
    foreground: { $value: "{color.text.secondary}" },
    size: { $value: "{size.control.sm}" },
  },
  ellipsis: {
    foreground: { $value: "{color.text.secondary}" },
    size: { $value: "{size.control.sm}" },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
});
