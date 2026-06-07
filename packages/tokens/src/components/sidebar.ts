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
    marginX: { $value: "{spacing.control.gap.md}" },
  },
  brand: {
    padding: {
      $type: "dimension",
      x: { $value: "{spacing.control.x.md}" },
      y: { $value: "{spacing.control.x.sm}" },
    },
    borderColor: { $value: "{border.default}" },
  },
  footer: {
    padding: { $value: "{spacing.control.x.xs}" },
    borderColor: { $value: "{border.default}" },
  },
  drawerFooter: {
    padding: { $value: "{spacing.control.x.xs}" },
    borderColor: { $value: "{border.default}" },
  },
  mobileBar: {
    gap: { $value: "{spacing.control.gap.lg}" },
    padding: {
      $type: "dimension",
      x: { $value: "{spacing.control.x.md}" },
      y: { $value: "{spacing.control.x.sm}" },
    },
    background: { $value: "{color.background.base}" },
    borderColor: { $value: "{border.default}" },
  },
  groupLabel: {
    gap: { $value: "{spacing.control.gap.md}" },
    padding: {
      $type: "dimension",
      x: { $value: "{spacing.control.x.sm}" },
      y: { $value: "{spacing.control.y.xs}" },
    },
  },
  groupCollapsibleTrigger: {
    gap: { $value: "{spacing.control.gap.md}" },
  },
  desktop: {
    background: { $value: "{color.background.subtle}" },
    borderColor: { $value: "{border.default}" },
  },
  item: {
    foreground: { $value: "{color.text.secondary}" },
    foregroundActive: { $value: "{color.text.primary}" },
    gap: { $value: "{spacing.control.gap.md}" },
    height: {
      $type: "dimension",
      min: { $value: "{size.control.sm}" },
    },
    adornment: {
      $type: "dimension",
      height: { $value: "{size.control.xs}" },
    },
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
      sizeCollapsed: { $value: "{size.icon.lg}" },
    },
    badge: {
      $type: "dimension",
      maxWidth: { $value: "{size.panel.width.sm}" },
    },
    sub: {
      $type: "dimension",
      indent: { $value: "{spacing.control.x.sm}" },
    },
    shortcut: {
      padding: {
        $type: "dimension",
        x: { $value: "{spacing.control.x.xs}" },
      },
    },
    focus: {
      ring: {
        width: { $value: "{outline.width.inset}" },
        color: { $value: "{border.focus}" },
      },
    },
  },
})
