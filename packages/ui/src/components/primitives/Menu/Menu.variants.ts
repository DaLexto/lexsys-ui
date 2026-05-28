/**
 * Menu.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const menuTriggerVariants = cva(
  [
    "inline-flex min-w-0 items-center justify-center gap-(--lex-menu-trigger-gap) rounded-(--lex-menu-trigger-radius) border",
    "h-(--lex-menu-trigger-height) border-(--lex-menu-trigger-border-color) bg-(--lex-menu-trigger-background) px-(--lex-menu-trigger-padding-x)",
    "text-(length:--lex-menu-trigger-font-size) font-(--lex-menu-trigger-font-weight) leading-(--lex-menu-trigger-font-line-height) text-(--lex-menu-trigger-foreground)",
    "transition-colors duration-(--lex-menu-transition-duration) ease-(--lex-menu-transition-easing)",
    "outline-none data-[popup-open]:border-(--lex-menu-trigger-open-border-color) data-[popup-open]:bg-(--lex-menu-trigger-open-background)",
    "data-[focused]:border-(--lex-menu-focus-border-color) data-[focused]:ring-(length:--lex-menu-focus-ring-width) data-[focused]:ring-(--lex-menu-focus-ring-color) data-[focused]:ring-offset-(length:--lex-menu-focus-ring-offset) data-[focused]:ring-offset-(--lex-menu-focus-ring-offset-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lex-opacity-disabled)",
  ].join(" "),
)

export const menuBackdropVariants = cva(
  "fixed inset-0 z-(--lex-menu-backdrop-z-index) bg-(--lex-menu-backdrop-background) opacity-(--lex-menu-backdrop-opacity) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
)

export const menuPositionerVariants = cva("z-(--lex-menu-positioner-z-index)")

export const menuPopupVariants = cva(
  [
    "min-w-[var(--anchor-width)] max-w-(--lex-menu-popup-max-width) rounded-(--lex-menu-radius) border",
    "border-(--lex-menu-popup-border-color) bg-(--lex-menu-popup-background) text-(--lex-menu-popup-foreground) shadow-(--lex-menu-popup-shadow)",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "origin-[var(--transform-origin)] transition-[opacity,transform] duration-(--lex-menu-transition-duration) ease-(--lex-menu-transition-easing)",
  ].join(" "),
)

export const menuViewportVariants = cva(
  "grid max-h-(--lex-menu-viewport-max-height) gap-(--lex-menu-list-gap) overflow-y-auto p-(--lex-menu-list-padding)",
)

export const menuItemVariants = cva(
  [
    "relative flex min-w-0 cursor-default select-none items-center gap-(--lex-menu-item-gap) rounded-(--lex-menu-item-radius)",
    "px-(--lex-menu-item-padding-x) py-(--lex-menu-item-padding-y) text-(length:--lex-menu-item-font-size) font-(--lex-menu-item-font-weight) leading-(--lex-menu-item-font-line-height)",
    "text-(--lex-menu-item-foreground) outline-none",
    "data-[highlighted]:bg-(--lex-menu-item-highlight-background) data-[highlighted]:text-(--lex-menu-item-highlight-foreground)",
    "data-[checked]:bg-(--lex-menu-item-checked-background) data-[checked]:text-(--lex-menu-item-checked-foreground)",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--lex-opacity-disabled)",
  ].join(" "),
)

export const menuItemTextVariants = cva("min-w-0 flex-1 truncate")

export const menuItemIndicatorVariants = cva(
  "inline-flex size-(--lex-menu-item-indicator-size) shrink-0 items-center justify-center text-current",
)

export const menuSubmenuTriggerIconVariants = cva(
  "ml-auto inline-flex size-(--lex-menu-submenu-icon-size) shrink-0 items-center justify-center text-current",
)

export const menuArrowVariants = cva(
  "size-(--lex-menu-arrow-size) rotate-45 border border-(--lex-menu-popup-border-color) bg-(--lex-menu-popup-background)",
)

export const menuGroupVariants = cva("grid gap-(--lex-menu-group-gap)")

export const menuGroupLabelVariants = cva(
  "px-(--lex-menu-item-padding-x) py-(--lex-menu-group-label-padding-y) text-(length:--lex-menu-group-label-font-size) font-(--lex-menu-group-label-font-weight) leading-(--lex-menu-group-label-font-line-height) text-(--lex-menu-group-label-foreground)",
)

export const menuSeparatorVariants = cva(
  "my-(--lex-menu-separator-margin-y) h-px bg-(--lex-menu-separator-background)",
)
