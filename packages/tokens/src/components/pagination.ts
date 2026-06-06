import { componentTokens } from "../types/authoring"

export const paginationComponentTokens = componentTokens("pagination", {
  gap: { $value: "{spacing.control.gap.sm}" },
  link: {
    background: { $value: "{color.background.base}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{border.default}" },
    hover: {
      $type: "color",
      background: { $value: "{color.background.subtle}" },
    },
    activeBackground: { $value: "{action.primary.base}" },
    activeForeground: { $value: "{color.text.inverse}" },
    radius: { $value: "{radius.control}" },
    height: {
      $type: "dimension",
      sm: { $value: "{size.control.sm}" },
      md: { $value: "{size.control.md}" },
    },
    padding: {
      $type: "dimension",
      x: {
        sm: { $value: "{spacing.control.x.sm}" },
        md: { $value: "{spacing.control.x.md}" },
      },
    },
    font: {
      size: {
        $type: "fontSize",
        sm: { $value: "{typography.control.sm.fontSize}" },
        md: { $value: "{typography.control.md.fontSize}" },
      },
      weight: { $value: "{typography.control.md.fontWeight}" },
      lineHeight: { $value: "{typography.control.md.lineHeight}" },
    },
  },
  ellipsis: {
    foreground: { $value: "{color.text.secondary}" },
    size: { $value: "{size.control.sm}" },
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
})
