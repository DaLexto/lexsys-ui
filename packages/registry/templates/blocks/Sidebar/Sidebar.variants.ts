/**
 * Sidebar.variants.ts
 *
 * Variant classes for the Sidebar block.
 */

export const sidebarRootVariants = (): string => {
  return "nx-sidebar"
}

export const sidebarDesktopVariants = (): string => {
  return "nx-sidebar__desktop hidden h-full w-[var(--nx-size-sidebar-width,16rem)] shrink-0 border-r border-[var(--nx-border-default)] bg-[var(--nx-color-background-subtle)] md:flex md:flex-col"
}

export const sidebarMobileTriggerVariants = (): string => {
  return "nx-sidebar__mobile-trigger md:hidden"
}

export const sidebarBrandVariants = (): string => {
  return "nx-sidebar__brand border-b border-[var(--nx-border-default)] px-[var(--nx-space-4)] py-[var(--nx-space-3)]"
}

export const sidebarNavVariants = (): string => {
  return "nx-sidebar__nav flex-1 p-[var(--nx-space-2)]"
}

export const sidebarMenuItemVariants = (active?: boolean): string => {
  if (active) {
    return [
      "nx-sidebar__item nx-sidebar__item--active",
      "bg-[var(--nx-menu-item-checked-background)] text-[var(--nx-menu-item-checked-foreground)]",
      "hover:bg-[var(--nx-action-primary-hover)] hover:text-[var(--nx-menu-item-checked-foreground)]",
    ].join(" ")
  }

  return [
    "nx-sidebar__item",
    "transition-colors",
    "hover:bg-[var(--nx-action-secondary-hover)] hover:text-[var(--nx-color-text-primary)]",
    "data-[highlighted]:bg-[var(--nx-action-secondary-hover)] data-[highlighted]:text-[var(--nx-color-text-primary)]",
  ].join(" ")
}

export const sidebarMainVariants = (): string => {
  return "nx-sidebar__drawer-content flex h-full flex-col"
}
