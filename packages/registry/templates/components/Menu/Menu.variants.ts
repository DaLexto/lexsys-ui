/**
 * Menu.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const menuTriggerVariants = cva(
  [
    "inline-flex min-w-0 items-center justify-center gap-(--nx-menu-trigger-gap) rounded-(--nx-menu-trigger-radius) border",
    "h-(--nx-menu-trigger-height) border-(--nx-menu-trigger-border-color) bg-(--nx-menu-trigger-background) px-(--nx-menu-trigger-padding-x)",
    "text-(length:--nx-menu-trigger-font-size) font-(--nx-menu-trigger-font-weight) leading-(--nx-menu-trigger-font-line-height) text-(--nx-menu-trigger-foreground)",
    "transition-colors duration-(--nx-menu-transition-duration) ease-(--nx-menu-transition-easing)",
    "outline-none data-[popup-open]:border-(--nx-menu-trigger-open-border-color) data-[popup-open]:bg-(--nx-menu-trigger-open-background)",
    "data-[focused]:border-(--nx-menu-focus-border-color) data-[focused]:ring-(length:--nx-menu-focus-ring-width) data-[focused]:ring-(--nx-menu-focus-ring-color) data-[focused]:ring-offset-(length:--nx-menu-focus-ring-offset) data-[focused]:ring-offset-(--nx-menu-focus-ring-offset-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
)

export const menuBackdropVariants = cva(
  "fixed inset-0 z-(--nx-menu-backdrop-z-index) bg-(--nx-menu-backdrop-background) opacity-20 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
)

export const menuPositionerVariants = cva("z-(--nx-menu-positioner-z-index)")

export const menuPopupVariants = cva(
  [
    "min-w-[var(--anchor-width)] max-w-(--nx-menu-popup-max-width) rounded-(--nx-menu-radius) border",
    "border-(--nx-menu-popup-border-color) bg-(--nx-menu-popup-background) text-(--nx-menu-popup-foreground) shadow-(--nx-menu-popup-shadow)",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "origin-[var(--transform-origin)] transition-[opacity,transform] duration-(--nx-menu-transition-duration) ease-(--nx-menu-transition-easing)",
  ].join(" "),
)

export const menuViewportVariants = cva(
  "grid max-h-(--nx-menu-viewport-max-height) gap-(--nx-menu-list-gap) overflow-y-auto p-(--nx-menu-list-padding)",
)

export const menuItemVariants = cva(
  [
    "relative flex min-w-0 cursor-default select-none items-center gap-(--nx-menu-item-gap) rounded-(--nx-menu-item-radius)",
    "px-(--nx-menu-item-padding-x) py-(--nx-menu-item-padding-y) text-(length:--nx-menu-item-font-size) font-(--nx-menu-item-font-weight) leading-(--nx-menu-item-font-line-height)",
    "text-(--nx-menu-item-foreground) outline-none",
    "data-[highlighted]:bg-(--nx-menu-item-highlight-background) data-[highlighted]:text-(--nx-menu-item-highlight-foreground)",
    "data-[checked]:bg-(--nx-menu-item-checked-background) data-[checked]:text-(--nx-menu-item-checked-foreground)",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
)

export const menuItemTextVariants = cva("min-w-0 flex-1 truncate")

export const menuItemIndicatorVariants = cva(
  "inline-flex size-(--nx-menu-item-indicator-size) shrink-0 items-center justify-center text-current",
)

export const menuSubmenuTriggerIconVariants = cva(
  "ml-auto inline-flex size-(--nx-menu-submenu-icon-size) shrink-0 items-center justify-center text-current",
)

export const menuArrowVariants = cva(
  "size-(--nx-menu-arrow-size) rotate-45 border border-(--nx-menu-popup-border-color) bg-(--nx-menu-popup-background)",
)

export const menuGroupVariants = cva("grid gap-(--nx-menu-group-gap)")

export const menuGroupLabelVariants = cva(
  "px-(--nx-menu-item-padding-x) py-(--nx-menu-group-label-padding-y) text-(length:--nx-menu-group-label-font-size) font-(--nx-menu-group-label-font-weight) leading-(--nx-menu-group-label-font-line-height) text-(--nx-menu-group-label-foreground)",
)

export const menuSeparatorVariants = cva(
  "my-(--nx-menu-separator-margin-y) h-px bg-(--nx-menu-separator-background)",
)
