/**
 * Sidebar.variants.ts
 *
 * Variant classes for the Sidebar block.
 */

export const sidebarRootVariants = (): string => {
  return "lsys-sidebar w-full shrink-0 md:h-full md:w-auto"
}

export const sidebarDesktopVariants = (): string => {
  return "lsys-sidebar__desktop hidden h-full w-[var(--lsys-size-sidebar-width,16rem)] shrink-0 border-r border-[var(--lsys-border-default)] bg-[var(--lsys-color-background-subtle)] md:flex md:flex-col"
}

export const sidebarMobileTriggerVariants = (): string => {
  return "lsys-sidebar__mobile-trigger sticky top-0 z-(--lsys-z-index-local) border-b border-[var(--lsys-border-default)] bg-[var(--lsys-color-background-base)] p-[var(--lsys-space-2)] md:hidden"
}

export const sidebarMobileHeaderVariants = (): string => {
  return "lsys-sidebar__mobile-header min-w-0 flex-1"
}

export const sidebarBrandVariants = (): string => {
  return "lsys-sidebar__brand border-b border-[var(--lsys-border-default)] px-[var(--lsys-space-4)] py-[var(--lsys-space-3)]"
}

export const sidebarNavVariants = (): string => {
  return "lsys-sidebar__nav min-h-0 flex-1 p-[var(--lsys-space-2)]"
}

export const sidebarNavListVariants = (): string => {
  return "lsys-sidebar__list m-0 flex list-none flex-col gap-[var(--lsys-space-1)] p-0"
}

export const sidebarNavItemVariants = (active?: boolean): string => {
  const base = [
    "lsys-sidebar__item",
    "flex w-full items-center rounded-(--lsys-menu-item-radius)",
    "px-(--lsys-menu-item-padding-x) py-(--lsys-menu-item-padding-y)",
    "text-(length:--lsys-menu-item-font-size) font-(--lsys-menu-item-font-weight)",
    "leading-(--lsys-menu-item-font-line-height) text-(--lsys-menu-item-foreground)",
    "no-underline outline-none transition-colors",
    "focus-visible:ring-(length:--lsys-menu-item-focus-ring-width) focus-visible:ring-(--lsys-menu-item-focus-ring-color)",
    "focus-visible:ring-offset-(length:--lsys-menu-item-focus-ring-offset) focus-visible:ring-offset-(--lsys-menu-item-focus-ring-offset-color)",
  ].join(" ")

  if (active) {
    return [
      base,
      "lsys-sidebar__item--active",
      "bg-(--lsys-menu-item-checked-background) text-(--lsys-menu-item-checked-foreground)",
      "hover:bg-(--lsys-action-primary-hover) hover:text-(--lsys-menu-item-checked-foreground)",
    ].join(" ")
  }

  return [
    base,
    "hover:bg-(--lsys-action-secondary-hover) hover:text-(--lsys-color-text-primary)",
  ].join(" ")
}

export const sidebarMainVariants = (): string => {
  return "lsys-sidebar__drawer-content flex h-full min-h-0 flex-col"
}

export const sidebarDrawerFooterVariants = (): string => {
  return "lsys-sidebar__drawer-footer border-t border-[var(--lsys-border-default)] p-[var(--lsys-space-2)]"
}
