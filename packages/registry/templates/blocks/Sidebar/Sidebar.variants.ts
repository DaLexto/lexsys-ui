/**
 * Sidebar.variants.ts
 *
 * Variant classes for the Sidebar block.
 */

export const sidebarRootClasses = (): string => {
  return "lex-sidebar w-full shrink-0 md:h-full md:w-auto"
}

export const sidebarDesktopClasses = (): string => {
  return "lex-sidebar__desktop hidden h-full w-[var(--lex-size-sidebar-width,16rem)] shrink-0 border-r border-[var(--lex-border-default)] bg-[var(--lex-color-background-subtle)] md:flex md:flex-col"
}

export const sidebarMobileHeaderClasses = (): string => {
  return "lex-sidebar__mobile-header min-w-0 flex-1"
}

export const sidebarBrandClasses = (): string => {
  return "lex-sidebar__brand border-b border-[var(--lex-border-default)] px-[var(--lex-space-4)] py-[var(--lex-space-3)]"
}

export const sidebarNavClasses = (): string => {
  return "lex-sidebar__nav min-h-0 flex-1 p-[var(--lex-space-2)]"
}

export const sidebarNavListClasses = (): string => {
  return "lex-sidebar__list m-0 flex list-none flex-col gap-[var(--lex-space-1)] p-0"
}

export const sidebarNavItemClasses = (active?: boolean): string => {
  const base = [
    "lex-sidebar__item",
    "flex w-full items-center rounded-(--lex-menu-item-radius)",
    "px-(--lex-menu-item-padding-x) py-(--lex-menu-item-padding-y)",
    "text-(length:--lex-menu-item-font-size) font-(--lex-menu-item-font-weight)",
    "leading-(--lex-menu-item-font-line-height) text-(--lex-menu-item-foreground)",
    "no-underline outline-none transition-colors",
    "focus-visible:ring-(length:--lex-menu-item-focus-ring-width) focus-visible:ring-(--lex-menu-item-focus-ring-color)",
    "focus-visible:ring-offset-(length:--lex-menu-item-focus-ring-offset) focus-visible:ring-offset-(--lex-menu-item-focus-ring-offset-color)",
  ].join(" ")

  if (active) {
    return [
      base,
      "lex-sidebar__item--active",
      "bg-(--lex-menu-item-checked-background) text-(--lex-menu-item-checked-foreground)",
      "hover:bg-(--lex-action-primary-hover) hover:text-(--lex-menu-item-checked-foreground)",
    ].join(" ")
  }

  return [
    base,
    "hover:bg-(--lex-action-secondary-hover) hover:text-(--lex-color-text-primary)",
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
  return "lex-sidebar__group-label px-[var(--lex-space-3)] py-[var(--lex-space-1)] text-(length:--lex-menu-group-label-font-size) font-(--lex-menu-group-label-font-weight) leading-(--lex-menu-group-label-font-line-height) text-(--lex-menu-group-label-foreground)"
}

export const sidebarGroupContentClasses = (): string => {
  return "lex-sidebar__group-content flex flex-col gap-[var(--lex-space-1)]"
}
