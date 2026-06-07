import { componentTokens } from "../types/authoring"

export const sidebarComponentTokens = componentTokens("sidebar", {
  width: {
    $type: "dimension",
    default: { $value: "{size.sidebar.width}" },
    collapsed: { $value: "{size.sidebar.widthCollapsed}" },
  },
  transition: {
    duration: { $value: "{motion.duration.layout}" },
    easing: { $value: "{motion.easing.layout}" },
  },
  nav: {
    padding: { $value: "{spacing.control.x.sm}" },
  },
  list: {
    gap: { $value: "{spacing.control.gap.md}" },
  },
  group: {
    gap: { $value: "{spacing.control.gap.md}" },
  },
  separator: {
    marginY: { $value: "{spacing.control.gap.md}" },
  },
  item: {
    foreground: { $value: "{color.text.secondary}" },
    foregroundActive: { $value: "{color.text.primary}" },
    gap: { $value: "{spacing.control.gap.md}" },
    radius: { $value: "{radius.control}" },
    padding: {
      $type: "dimension",
      x: { $value: "{spacing.control.x.md}" },
      y: { $value: "{spacing.control.y.sm}" },
    },
    font: {
      size: { $value: "{typography.control.sm.fontSize}" },
      weight: { $value: "{typography.control.md.fontWeight}" },
      weightActive: { $value: "{typography.label.sm.fontWeight}" },
      lineHeight: { $value: "{typography.control.sm.lineHeight}" },
    },
    background: {
      $type: "color",
      hover: { $value: "{action.secondary.hover}" },
      active: { $value: "{color.background.base}" },
    },
    accent: {
      $type: "dimension",
      width: { $value: "{outline.width.focus}" },
      color: { $value: "{action.primary.base}" },
    },
    icon: {
      $type: "dimension",
      size: { $value: "{size.icon.md}" },
    },
    badge: {
      $type: "dimension",
      maxWidth: { $value: "{size.panel.width.sm}" },
    },
    sub: {
      $type: "dimension",
      indent: { $value: "{spacing.control.x.sm}" },
    },
    focus: {
      ring: {
        width: { $value: "{outline.width.focus}" },
        color: { $value: "{border.focus}" },
        offset: { $value: "{outline.offset.focus}" },
        offsetColor: { $value: "{color.background.base}" },
      },
    },
  },
})
