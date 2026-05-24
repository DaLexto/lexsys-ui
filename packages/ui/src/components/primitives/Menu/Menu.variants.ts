/**
 * Menu.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const menuTriggerVariants = cva(
  [
    "inline-flex min-w-0 items-center justify-center gap-(--lsys-menu-trigger-gap) rounded-(--lsys-menu-trigger-radius) border",
    "h-(--lsys-menu-trigger-height) border-(--lsys-menu-trigger-border-color) bg-(--lsys-menu-trigger-background) px-(--lsys-menu-trigger-padding-x)",
    "text-(length:--lsys-menu-trigger-font-size) font-(--lsys-menu-trigger-font-weight) leading-(--lsys-menu-trigger-font-line-height) text-(--lsys-menu-trigger-foreground)",
    "transition-colors duration-(--lsys-menu-transition-duration) ease-(--lsys-menu-transition-easing)",
    "outline-none data-[popup-open]:border-(--lsys-menu-trigger-open-border-color) data-[popup-open]:bg-(--lsys-menu-trigger-open-background)",
    "data-[focused]:border-(--lsys-menu-focus-border-color) data-[focused]:ring-(length:--lsys-menu-focus-ring-width) data-[focused]:ring-(--lsys-menu-focus-ring-color) data-[focused]:ring-offset-(length:--lsys-menu-focus-ring-offset) data-[focused]:ring-offset-(--lsys-menu-focus-ring-offset-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
)

export const menuBackdropVariants = cva(
  "fixed inset-0 z-(--lsys-menu-backdrop-z-index) bg-(--lsys-menu-backdrop-background) opacity-(--lsys-menu-backdrop-opacity) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
)

export const menuPositionerVariants = cva("z-(--lsys-menu-positioner-z-index)")

export const menuPopupVariants = cva(
  [
    "min-w-[var(--anchor-width)] max-w-(--lsys-menu-popup-max-width) rounded-(--lsys-menu-radius) border",
    "border-(--lsys-menu-popup-border-color) bg-(--lsys-menu-popup-background) text-(--lsys-menu-popup-foreground) shadow-(--lsys-menu-popup-shadow)",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "origin-[var(--transform-origin)] transition-[opacity,transform] duration-(--lsys-menu-transition-duration) ease-(--lsys-menu-transition-easing)",
  ].join(" "),
)

export const menuViewportVariants = cva(
  "grid max-h-(--lsys-menu-viewport-max-height) gap-(--lsys-menu-list-gap) overflow-y-auto p-(--lsys-menu-list-padding)",
)

export const menuItemVariants = cva(
  [
    "relative flex min-w-0 cursor-default select-none items-center gap-(--lsys-menu-item-gap) rounded-(--lsys-menu-item-radius)",
    "px-(--lsys-menu-item-padding-x) py-(--lsys-menu-item-padding-y) text-(length:--lsys-menu-item-font-size) font-(--lsys-menu-item-font-weight) leading-(--lsys-menu-item-font-line-height)",
    "text-(--lsys-menu-item-foreground) outline-none",
    "data-[highlighted]:bg-(--lsys-menu-item-highlight-background) data-[highlighted]:text-(--lsys-menu-item-highlight-foreground)",
    "data-[checked]:bg-(--lsys-menu-item-checked-background) data-[checked]:text-(--lsys-menu-item-checked-foreground)",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
)

export const menuItemTextVariants = cva("min-w-0 flex-1 truncate")

export const menuItemIndicatorVariants = cva(
  "inline-flex size-(--lsys-menu-item-indicator-size) shrink-0 items-center justify-center text-current",
)

export const menuSubmenuTriggerIconVariants = cva(
  "ml-auto inline-flex size-(--lsys-menu-submenu-icon-size) shrink-0 items-center justify-center text-current",
)

export const menuArrowVariants = cva(
  "size-(--lsys-menu-arrow-size) rotate-45 border border-(--lsys-menu-popup-border-color) bg-(--lsys-menu-popup-background)",
)

export const menuGroupVariants = cva("grid gap-(--lsys-menu-group-gap)")

export const menuGroupLabelVariants = cva(
  "px-(--lsys-menu-item-padding-x) py-(--lsys-menu-group-label-padding-y) text-(length:--lsys-menu-group-label-font-size) font-(--lsys-menu-group-label-font-weight) leading-(--lsys-menu-group-label-font-line-height) text-(--lsys-menu-group-label-foreground)",
)

export const menuSeparatorVariants = cva(
  "my-(--lsys-menu-separator-margin-y) h-px bg-(--lsys-menu-separator-background)",
)
