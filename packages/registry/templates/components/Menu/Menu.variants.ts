/**
 * Menu.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const menuTriggerVariants = cva(
  [
    "inline-flex min-w-0 items-center justify-center gap-[var(--nx-menu-trigger-gap)] rounded-[var(--nx-menu-trigger-radius)] border",
    "h-[var(--nx-menu-trigger-height)] border-[var(--nx-menu-trigger-border-color)] bg-[var(--nx-menu-trigger-background)] px-[var(--nx-menu-trigger-padding-x)]",
    "text-[length:var(--nx-menu-trigger-font-size)] font-[var(--nx-menu-trigger-font-weight)] leading-[var(--nx-menu-trigger-font-line-height)] text-[var(--nx-menu-trigger-foreground)]",
    "transition-colors duration-[var(--nx-menu-transition-duration)] ease-[var(--nx-menu-transition-easing)]",
    "outline-none data-[popup-open]:border-[var(--nx-menu-trigger-open-border-color)] data-[popup-open]:bg-[var(--nx-menu-trigger-open-background)]",
    "data-[focused]:border-[var(--nx-menu-focus-border-color)] data-[focused]:ring-[length:var(--nx-menu-focus-ring-width)] data-[focused]:ring-[var(--nx-menu-focus-ring-color)] data-[focused]:ring-offset-[length:var(--nx-menu-focus-ring-offset)] data-[focused]:ring-offset-[var(--nx-menu-focus-ring-offset-color)]",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
)

export const menuBackdropVariants = cva(
  "fixed inset-0 z-[var(--nx-menu-backdrop-z-index)] bg-[var(--nx-menu-backdrop-background)] opacity-20 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
)

export const menuPositionerVariants = cva(
  "z-[var(--nx-menu-positioner-z-index)]",
)

export const menuPopupVariants = cva(
  [
    "min-w-[var(--nx-menu-popup-min-width)] max-w-[var(--nx-menu-popup-max-width)] rounded-[var(--nx-menu-radius)] border",
    "border-[var(--nx-menu-popup-border-color)] bg-[var(--nx-menu-popup-background)] text-[var(--nx-menu-popup-foreground)] shadow-[var(--nx-menu-popup-shadow)]",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "origin-[var(--transform-origin)] transition-[opacity,transform] duration-[var(--nx-menu-transition-duration)] ease-[var(--nx-menu-transition-easing)]",
  ].join(" "),
)

export const menuViewportVariants = cva(
  "grid max-h-[var(--nx-menu-viewport-max-height)] gap-[var(--nx-menu-list-gap)] overflow-y-auto p-[var(--nx-menu-list-padding)]",
)

export const menuItemVariants = cva(
  [
    "relative flex min-w-0 cursor-default select-none items-center gap-[var(--nx-menu-item-gap)] rounded-[var(--nx-menu-item-radius)]",
    "px-[var(--nx-menu-item-padding-x)] py-[var(--nx-menu-item-padding-y)] text-[length:var(--nx-menu-item-font-size)] font-[var(--nx-menu-item-font-weight)] leading-[var(--nx-menu-item-font-line-height)]",
    "text-[var(--nx-menu-item-foreground)] outline-none",
    "data-[highlighted]:bg-[var(--nx-menu-item-highlight-background)] data-[highlighted]:text-[var(--nx-menu-item-highlight-foreground)]",
    "data-[checked]:bg-[var(--nx-menu-item-checked-background)] data-[checked]:text-[var(--nx-menu-item-checked-foreground)]",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ].join(" "),
)

export const menuItemTextVariants = cva("min-w-0 flex-1 truncate")

export const menuItemIndicatorVariants = cva(
  "inline-flex size-[var(--nx-menu-item-indicator-size)] shrink-0 items-center justify-center text-current",
)

export const menuSubmenuTriggerIconVariants = cva(
  "ml-auto inline-flex size-[var(--nx-menu-submenu-icon-size)] shrink-0 items-center justify-center text-current",
)

export const menuArrowVariants = cva(
  "size-[var(--nx-menu-arrow-size)] rotate-45 border border-[var(--nx-menu-popup-border-color)] bg-[var(--nx-menu-popup-background)]",
)

export const menuGroupVariants = cva("grid gap-[var(--nx-menu-group-gap)]")

export const menuGroupLabelVariants = cva(
  "px-[var(--nx-menu-item-padding-x)] py-[var(--nx-menu-group-label-padding-y)] text-[length:var(--nx-menu-group-label-font-size)] font-[var(--nx-menu-group-label-font-weight)] leading-[var(--nx-menu-group-label-font-line-height)] text-[var(--nx-menu-group-label-foreground)]",
)

export const menuSeparatorVariants = cva(
  "my-[var(--nx-menu-separator-margin-y)] h-px bg-[var(--nx-menu-separator-background)]",
)
