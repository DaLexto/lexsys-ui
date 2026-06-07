/**
 * Sidebar.variants.ts
 *
 * Variant classes for the Sidebar block.
 */

import { disabledStateClasses } from "@/lib/utils"
import type { BadgeVariant } from "@/components/primitives/Badge/Badge.types"
import type { SidebarShellOptions } from "./Sidebar.types"

export const sidebarRootClasses = ({
  collapsed = false,
  collapsible = "none",
  side = "left",
}: SidebarShellOptions = {}): string => {
  const classes = [
    "group/sidebar lex-sidebar w-full shrink-0 md:h-full md:w-auto",
  ]

  if (collapsible !== "none" && collapsed) {
    classes.push("lex-sidebar--collapsed")
  }

  if (collapsible === "offcanvas" && collapsed) {
    classes.push("lex-sidebar--offcanvas")
  }

  if (side === "right") {
    classes.push("lex-sidebar--right")
  }

  return classes.join(" ")
}

export const sidebarCollapsedItemClasses = (): string => {
  return "md:group-data-[collapsed=true]/sidebar:justify-center md:group-data-[collapsed=true]/sidebar:px-2"
}

export const sidebarCollapsedGroupLabelClasses = (): string => {
  return "md:group-data-[collapsed=true]/sidebar:hidden"
}

export const sidebarExpandableClasses = (): string => {
  return [
    "sidebar-expandable transition-[opacity,width] duration-(--lex-sidebar-transition-duration) ease-(--lex-sidebar-transition-easing)",
    "md:group-data-[collapsed=true]/sidebar:hidden",
  ].join(" ")
}

export const sidebarCollapsedBrandClasses = (): string => {
  return "md:group-data-[collapsed=true]/sidebar:justify-center"
}

export const sidebarCollapsedFooterClasses = (): string => {
  return "md:group-data-[collapsed=true]/sidebar:justify-center"
}

export const sidebarDesktopClasses = ({
  collapsed = false,
  collapsible = "none",
  side = "left",
}: SidebarShellOptions = {}): string => {
  const classes = [
    "lex-sidebar__desktop hidden h-full shrink-0 bg-[var(--lex-color-background-subtle)] md:flex md:flex-col",
    "overflow-hidden transition-[width,transform] duration-(--lex-sidebar-transition-duration) ease-(--lex-sidebar-transition-easing) motion-reduce:transition-none",
    side === "right"
      ? "border-s border-[var(--lex-border-default)]"
      : "border-e border-[var(--lex-border-default)]",
  ]

  if (collapsible === "icon" && collapsed) {
    classes.push("w-(--lex-sidebar-width-collapsed)")
  } else if (collapsible === "offcanvas" && collapsed) {
    classes.push(
      "w-(--lex-sidebar-width-default)",
      side === "right"
        ? "translate-x-full rtl:-translate-x-full"
        : "-translate-x-full rtl:translate-x-full",
    )
  } else {
    classes.push("w-(--lex-sidebar-width-default)")
  }

  return classes.join(" ")
}

export const sidebarRailClasses = ({
  side = "left",
}: SidebarShellOptions = {}): string => {
  return [
    "lex-sidebar__rail absolute inset-y-0 hidden w-4 md:block",
    side === "right" ? "-start-2" : "-end-2",
    "cursor-pointer border-0 bg-transparent p-0 outline-none",
    "after:absolute after:inset-y-0 after:w-px after:bg-[var(--lex-border-default)]",
    side === "right" ? "after:start-2" : "after:end-2",
  ].join(" ")
}

export const sidebarMobileHeaderClasses = (): string => {
  return "lex-sidebar__mobile-header flex min-w-0 flex-1 items-center gap-3"
}

export const sidebarBrandClasses = (): string => {
  return "lex-sidebar__brand border-b border-[var(--lex-border-default)] px-[var(--lex-space-4)] py-[var(--lex-space-3)]"
}

export const sidebarNavClasses = (): string => {
  return "lex-sidebar__nav min-h-0 flex-1 p-[var(--lex-space-2)]"
}

export const sidebarInputClasses = (): string => {
  return [
    "lex-sidebar__input w-full",
    "md:group-data-[collapsed=true]/sidebar:hidden",
  ].join(" ")
}

export const sidebarNavListClasses = (): string => {
  return "lex-sidebar__list m-0 flex list-none flex-col gap-[var(--lex-space-1)] p-0"
}

export const sidebarItemClasses = (): string => {
  return [
    "lex-sidebar__row group/sidebar-row relative flex items-center",
    "[&>:first-child]:min-w-0 [&>:first-child]:flex-1",
    "has-[.lex-sidebar__item-action]:[&>:first-child]:pe-8",
  ].join(" ")
}

export const sidebarItemIconClasses = (): string => {
  return [
    "lex-sidebar__item-icon flex size-(--lex-sidebar-item-icon-size) shrink-0 items-center justify-center",
    "[&_svg]:size-full",
  ].join(" ")
}

export const sidebarItemActionClasses = (showOnHover = true): string => {
  const classes = [
    "lex-sidebar__item-action absolute top-1/2 end-1 -translate-y-1/2",
    "md:group-data-[collapsed=true]/sidebar:hidden",
  ]

  if (showOnHover) {
    classes.push(
      "opacity-0 transition-opacity duration-(--lex-sidebar-transition-duration) ease-(--lex-sidebar-transition-easing)",
      "group-hover/sidebar-row:opacity-100 focus-visible:opacity-100",
    )
  }

  return classes.join(" ")
}

export const sidebarItemShortcutClasses = (): string => {
  return [
    "lex-sidebar__item-shortcut ms-auto shrink-0",
    "rounded-(--lex-sidebar-item-radius) border border-[var(--lex-border-default)]",
    "px-(--lex-space-control-x-xs) py-(--lex-space-control-y-xs)",
    "text-(length:--lex-sidebar-item-font-size) font-(--lex-sidebar-item-font-weight)",
    "leading-(--lex-sidebar-item-font-line-height) text-(--lex-sidebar-item-foreground)",
    "md:group-data-[collapsed=true]/sidebar:hidden",
  ].join(" ")
}

export const sidebarGroupActionClasses = (): string => {
  return [
    "lex-sidebar__group-action shrink-0",
    "md:group-data-[collapsed=true]/sidebar:hidden",
  ].join(" ")
}

export const sidebarItemBadgeClasses = (): string => {
  return [
    "lex-sidebar__item-badge shrink-0",
    "max-w-(--lex-sidebar-item-badge-max-width) truncate",
    "md:group-data-[collapsed=true]/sidebar:absolute md:group-data-[collapsed=true]/sidebar:top-1",
    "md:group-data-[collapsed=true]/sidebar:end-1 md:group-data-[collapsed=true]/sidebar:max-w-none",
  ].join(" ")
}

export const sidebarItemBadgeCollapsedClasses = (): string => {
  return [
    "md:group-data-[collapsed=true]/sidebar:h-2 md:group-data-[collapsed=true]/sidebar:min-h-2",
    "md:group-data-[collapsed=true]/sidebar:w-2 md:group-data-[collapsed=true]/sidebar:min-w-2",
    "md:group-data-[collapsed=true]/sidebar:px-0",
    "md:group-data-[collapsed=true]/sidebar:text-[0px] md:group-data-[collapsed=true]/sidebar:leading-(--lex-badge-font-line-height)",
  ].join(" ")
}

export const sidebarItemBadgeLabelClasses = (): string => {
  return "md:group-data-[collapsed=true]/sidebar:sr-only"
}

const sidebarItemBadgeDotVariantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-(--lex-badge-neutral-foreground)",
  primary: "bg-(--lex-badge-primary-background)",
  success: "bg-(--lex-color-feedback-success-foreground)",
  warning: "bg-(--lex-color-feedback-warning-foreground)",
  danger: "bg-(--lex-badge-danger-background)",
}

export const sidebarItemBadgeDotClasses = (
  variant: BadgeVariant = "neutral",
): string => {
  return [
    "size-2 rounded-full border-0 p-0",
    sidebarItemBadgeDotVariantClasses[variant],
  ].join(" ")
}

export const sidebarSubListClasses = (): string => {
  return [
    "lex-sidebar__sub-list m-0 flex list-none flex-col gap-[var(--lex-space-1)] p-0",
    "ms-[calc(var(--lex-sidebar-item-padding-x)+(var(--lex-sidebar-item-icon-size)/2))]",
    "border-s border-[var(--lex-border-default)] ps-(--lex-sidebar-item-sub-indent)",
    "md:group-data-[collapsed=true]/sidebar:hidden",
  ].join(" ")
}

export const sidebarSubNavItemClasses = (
  active?: boolean,
  disabled?: boolean,
): string => {
  const base = sidebarNavItemClasses(active, disabled)

  return [
    base,
    "ps-[calc(var(--lex-sidebar-item-padding-x)+var(--lex-sidebar-item-sub-indent))]",
  ].join(" ")
}

const sidebarNavItemActiveAccentClasses = (): string => {
  return [
    "before:absolute before:inset-y-1 before:w-(--lex-sidebar-item-accent-width)",
    "before:rounded-full before:bg-(--lex-sidebar-item-accent-color) before:content-['']",
    "before:start-0 group-data-[side=right]/sidebar:before:start-auto",
    "group-data-[side=right]/sidebar:before:end-0",
  ].join(" ")
}

export const sidebarNavItemClasses = (
  active?: boolean,
  disabled?: boolean,
): string => {
  const base = [
    "lex-sidebar__item",
    "relative flex min-w-0 flex-1 items-center gap-(--lex-sidebar-item-gap)",
    "rounded-(--lex-sidebar-item-radius)",
    "px-(--lex-sidebar-item-padding-x) py-(--lex-sidebar-item-padding-y)",
    "text-(length:--lex-sidebar-item-font-size) font-(--lex-sidebar-item-font-weight)",
    "leading-(--lex-sidebar-item-font-line-height)",
    "no-underline outline-none transition-colors duration-(--lex-sidebar-transition-duration) ease-(--lex-sidebar-transition-easing)",
    "focus-visible:ring-(length:--lex-sidebar-item-focus-ring-width) focus-visible:ring-(--lex-sidebar-item-focus-ring-color)",
    "focus-visible:ring-offset-(length:--lex-sidebar-item-focus-ring-offset) focus-visible:ring-offset-(--lex-sidebar-item-focus-ring-offset-color)",
  ].join(" ")

  if (disabled) {
    return [
      base,
      disabledStateClasses,
      "cursor-not-allowed text-(--lex-color-text-disabled)",
      "hover:bg-transparent hover:text-(--lex-color-text-disabled)",
      "data-[disabled]:text-(--lex-color-text-disabled)",
    ].join(" ")
  }

  if (active) {
    return [
      base,
      "lex-sidebar__item--active",
      "bg-(--lex-sidebar-item-background-active) text-(--lex-sidebar-item-foreground-active)",
      "font-(--lex-sidebar-item-font-weight-active)",
      sidebarNavItemActiveAccentClasses(),
      "hover:bg-(--lex-sidebar-item-background-active) hover:text-(--lex-sidebar-item-foreground-active)",
    ].join(" ")
  }

  return [
    base,
    "text-(--lex-sidebar-item-foreground)",
    "hover:bg-(--lex-sidebar-item-background-hover) hover:text-(--lex-color-text-primary)",
  ].join(" ")
}

export const sidebarItemSkeletonClasses = (indent = false): string => {
  const classes = [
    "lex-sidebar__item-skeleton flex w-full min-w-0 flex-1 items-center gap-(--lex-sidebar-item-gap)",
    "rounded-(--lex-sidebar-item-radius)",
    "px-(--lex-sidebar-item-padding-x) py-(--lex-sidebar-item-padding-y)",
    sidebarCollapsedItemClasses(),
  ]

  if (indent) {
    classes.push(
      "ps-[calc(var(--lex-sidebar-item-padding-x)+var(--lex-sidebar-item-sub-indent))]",
    )
  }

  return classes.join(" ")
}

export const sidebarItemSkeletonIconClasses = (): string => {
  return [
    "lex-sidebar__item-skeleton-icon size-(--lex-sidebar-item-icon-size) shrink-0",
    "rounded-(--lex-sidebar-item-radius) animate-pulse bg-(--lex-color-background-subtle)",
  ].join(" ")
}

export const sidebarItemSkeletonLabelClasses = (): string => {
  return [
    "lex-sidebar__item-skeleton-label h-[1em] min-w-0 flex-1",
    "rounded-(--lex-sidebar-item-radius) animate-pulse bg-(--lex-color-background-subtle)",
    "md:group-data-[collapsed=true]/sidebar:hidden",
  ].join(" ")
}

export const sidebarMainClasses = (): string => {
  return "lex-sidebar__drawer-content flex h-full min-h-0 flex-col"
}

export const sidebarDrawerFooterClasses = (): string => {
  return "lex-sidebar__drawer-footer border-t border-[var(--lex-border-default)] p-[var(--lex-space-2)]"
}

export const sidebarFooterClasses = (): string => {
  return "lex-sidebar__footer border-t border-[var(--lex-border-default)] p-[var(--lex-space-2)]"
}

export const sidebarGroupClasses = (): string => {
  return "lex-sidebar__group flex flex-col gap-[var(--lex-space-1)]"
}

export const sidebarGroupLabelClasses = (): string => {
  return [
    "lex-sidebar__group-label flex items-center justify-between gap-[var(--lex-space-2)]",
    "px-[var(--lex-space-3)] py-[var(--lex-space-1)]",
    "text-(length:--lex-menu-group-label-font-size) font-(--lex-menu-group-label-font-weight)",
    "leading-(--lex-menu-group-label-font-line-height) text-(--lex-menu-group-label-foreground)",
  ].join(" ")
}

export const sidebarGroupContentClasses = (): string => {
  return "lex-sidebar__group-content flex flex-col gap-[var(--lex-space-1)]"
}

export const sidebarGroupCollapsibleClasses = (): string => {
  return "group/sidebar-group-collapsible lex-sidebar__group-collapsible"
}

export const sidebarGroupCollapsibleTriggerClasses = (): string => {
  return [
    "lex-sidebar__group-collapsible-trigger",
    "flex min-w-0 flex-1 items-center gap-[var(--lex-space-2)] text-left outline-none",
    "text-(length:--lex-menu-group-label-font-size) font-(--lex-menu-group-label-font-weight)",
    "leading-(--lex-menu-group-label-font-line-height) text-(--lex-menu-group-label-foreground)",
    "transition-colors duration-(--lex-sidebar-transition-duration) ease-(--lex-sidebar-transition-easing)",
    "hover:text-(--lex-menu-group-label-foreground)",
    "focus-visible:ring-(length:--lex-focus-ring-width) focus-visible:ring-inset focus-visible:ring-(--lex-focus-ring-color)",
    "[&>svg]:ms-auto [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:transition-transform",
    "group-data-[panel-open]/sidebar-group-collapsible:[&>svg]:rotate-180",
  ].join(" ")
}

export const sidebarGroupCollapsiblePanelClasses = (): string => {
  return "lex-sidebar__group-collapsible-panel p-0"
}
