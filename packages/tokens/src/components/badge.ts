import type { ComponentTokenGroup } from "../types/index.js"

export const badgeComponentTokens: ComponentTokenGroup = {
  component: "badge",
  radius: { value: "{radius.control}" },
  height: {
    sm: { value: "1.5rem" },
    md: { value: "1.75rem" },
  },
  padding: {
    x: {
      sm: { value: "{spacing.control.x.xs}" },
      md: { value: "{spacing.control.x.sm}" },
    },
  },
  font: {
    size: {
      sm: { value: "{typography.label.xs.fontSize}" },
      md: { value: "{typography.label.sm.fontSize}" },
    },
    weight: { value: "{typography.label.sm.fontWeight}" },
  },
  transition: {
    duration: { value: "{motion.duration.control}" },
    easing: { value: "{motion.easing.control}" },
  },
  outline: {
    background: { value: "transparent" },
  },
  neutral: {
    background: { value: "{color.muted}" },
    foreground: { value: "{color.foreground}" },
    borderColor: { value: "{color.border}" },
  },
  primary: {
    background: { value: "{color.primary}" },
    foreground: { value: "{color.primary.foreground}" },
    borderColor: { value: "{color.primary}" },
  },
  destructive: {
    background: { value: "{color.destructive}" },
    foreground: { value: "{color.destructive.foreground}" },
    borderColor: { value: "{color.destructive}" },
  },
}
