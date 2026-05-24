/**
 * Sidebar.variants.ts
 *
 * Variant classes for the Sidebar block.
 */

export const sidebarRootVariants = (): string => {
  return "nx-sidebar w-full shrink-0 md:h-full md:w-auto"
}

export const sidebarDesktopVariants = (): string => {
  return "nx-sidebar__desktop hidden h-full w-[var(--nx-size-sidebar-width,16rem)] shrink-0 border-r border-[var(--nx-border-default)] bg-[var(--nx-color-background-subtle)] md:flex md:flex-col"
}

export const sidebarMobileTriggerVariants = (): string => {
  return "nx-sidebar__mobile-trigger flex items-center gap-[var(--nx-space-2)] border-b border-[var(--nx-border-default)] p-[var(--nx-space-2)] md:hidden"
}

export const sidebarMobileHeaderVariants = (): string => {
  return "nx-sidebar__mobile-header min-w-0 flex-1"
}

export const sidebarBrandVariants = (): string => {
  return "nx-sidebar__brand border-b border-[var(--nx-border-default)] px-[var(--nx-space-4)] py-[var(--nx-space-3)]"
}

export const sidebarNavVariants = (): string => {
  return "nx-sidebar__nav min-h-0 flex-1 p-[var(--nx-space-2)]"
}

export const sidebarNavListVariants = (): string => {
  return "nx-sidebar__list m-0 flex list-none flex-col gap-[var(--nx-space-1)] p-0"
}

export const sidebarNavItemVariants = (active?: boolean): string => {
  const base = [
    "nx-sidebar__item",
    "flex w-full items-center rounded-(--nx-menu-item-radius)",
    "px-(--nx-menu-item-padding-x) py-(--nx-menu-item-padding-y)",
    "text-(length:--nx-menu-item-font-size) font-(--nx-menu-item-font-weight)",
    "leading-(--nx-menu-item-font-line-height) text-(--nx-menu-item-foreground)",
    "no-underline outline-none transition-colors",
    "focus-visible:ring-(length:--nx-menu-item-focus-ring-width) focus-visible:ring-(--nx-menu-item-focus-ring-color)",
    "focus-visible:ring-offset-(length:--nx-menu-item-focus-ring-offset) focus-visible:ring-offset-(--nx-menu-item-focus-ring-offset-color)",
  ].join(" ")

  if (active) {
    return [
      base,
      "nx-sidebar__item--active",
      "bg-(--nx-menu-item-checked-background) text-(--nx-menu-item-checked-foreground)",
      "hover:bg-(--nx-action-primary-hover) hover:text-(--nx-menu-item-checked-foreground)",
    ].join(" ")
  }

  return [
    base,
    "hover:bg-(--nx-action-secondary-hover) hover:text-(--nx-color-text-primary)",
  ].join(" ")
}

export const sidebarMainVariants = (): string => {
  return "nx-sidebar__drawer-content flex h-full min-h-0 flex-col"
}

export const sidebarDrawerFooterVariants = (): string => {
  return "nx-sidebar__drawer-footer border-t border-[var(--nx-border-default)] p-[var(--nx-space-2)]"
}
