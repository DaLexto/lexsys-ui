/**
 * Sidebar.variants.ts
 *
 * Variant classes for the Sidebar block.
 */

export const sidebarRootVariants = (): string => {
  return "nx-sidebar"
}

export const sidebarDesktopVariants = (): string => {
  return "nx-sidebar__desktop hidden h-full w-[var(--nx-size-sidebar-width,16rem)] shrink-0 border-r border-[var(--nx-color-border-subtle)] bg-[var(--nx-color-background-surface)] md:flex md:flex-col"
}

export const sidebarMobileTriggerVariants = (): string => {
  return "nx-sidebar__mobile-trigger md:hidden"
}

export const sidebarBrandVariants = (): string => {
  return "nx-sidebar__brand border-b border-[var(--nx-color-border-subtle)] px-[var(--nx-space-4)] py-[var(--nx-space-3)]"
}

export const sidebarNavVariants = (): string => {
  return "nx-sidebar__nav flex-1 p-[var(--nx-space-2)]"
}

export const sidebarMenuItemVariants = (active?: boolean): string => {
  return active
    ? "nx-sidebar__item nx-sidebar__item--active"
    : "nx-sidebar__item"
}

export const sidebarMainVariants = (): string => {
  return "nx-sidebar__drawer-content flex h-full flex-col"
}
