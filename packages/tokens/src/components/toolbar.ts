import { componentTokens } from "../types/authoring"

export const toolbarComponentTokens = componentTokens("toolbar", {
  radius: { $value: "{radius.control}" },
  root: {
    gap: { $value: "{spacing.control.gap.sm}" },
    background: { $value: "{color.background.subtle}" },
    foreground: { $value: "{color.text.primary}" },
    borderColor: { $value: "{border.default}" },
    padding: { $value: "{spacing.control.x.sm}" },
  },
  group: {
    gap: { $value: "{spacing.control.gap.sm}" },
  },
  button: {
    height: { $value: "{size.control.sm}" },
    radius: { $value: "{radius.control}" },
    padding: {
      $type: "dimension",
      x: { $value: "{spacing.control.x.sm}" },
    },
    foreground: { $value: "{color.text.primary}" },
    hoverBackground: { $value: "{color.background.surface}" },
    font: {
      size: { $value: "{typography.control.sm.fontSize}" },
      weight: { $value: "{typography.control.md.fontWeight}" },
      lineHeight: { $value: "{typography.control.sm.lineHeight}" },
    },
    focus: {
      ringColor: { $value: "{border.focus}" },
      ringOffsetColor: { $value: "{color.background.base}" },
      ringWidth: { $value: "{outline.width.focus}" },
      ringOffset: { $value: "{outline.offset.focus}" },
    },
  },
  link: {
    height: { $value: "{size.control.sm}" },
    radius: { $value: "{radius.control}" },
    padding: {
      $type: "dimension",
      x: { $value: "{spacing.control.x.sm}" },
    },
    foreground: { $value: "{color.text.primary}" },
    hoverBackground: { $value: "{color.background.surface}" },
    font: {
      size: { $value: "{typography.control.sm.fontSize}" },
      weight: { $value: "{typography.control.md.fontWeight}" },
      lineHeight: { $value: "{typography.control.sm.lineHeight}" },
    },
    focus: {
      ringColor: { $value: "{border.focus}" },
      ringOffsetColor: { $value: "{color.background.base}" },
      ringWidth: { $value: "{outline.width.focus}" },
      ringOffset: { $value: "{outline.offset.focus}" },
    },
  },
  input: {
    height: { $value: "{size.control.sm}" },
    radius: { $value: "{radius.control}" },
    padding: {
      $type: "dimension",
      x: { $value: "{spacing.control.x.sm}" },
    },
    background: { $value: "{color.background.base}" },
    foreground: { $value: "{color.text.primary}" },
    placeholder: {
      $type: "color",
      color: { $value: "{color.text.secondary}" },
    },
    borderColor: { $value: "{border.default}" },
    font: {
      family: { $value: "{typography.control.md.fontFamily}" },
      size: { $value: "{typography.control.sm.fontSize}" },
      weight: { $value: "{typography.control.md.fontWeight}" },
      lineHeight: { $value: "{typography.control.sm.lineHeight}" },
    },
    focus: {
      borderColor: { $value: "{border.focus}" },
      ringColor: { $value: "{border.focus}" },
      ringOffsetColor: { $value: "{color.background.base}" },
      ringWidth: { $value: "{outline.width.focus}" },
      ringOffset: { $value: "{outline.offset.focus}" },
    },
  },
  transition: {
    duration: { $value: "{motion.duration.control}" },
    easing: { $value: "{motion.easing.control}" },
  },
})
