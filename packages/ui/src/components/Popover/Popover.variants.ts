/**
 * Popover.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const popoverTriggerVariants = cva(
  [
    "inline-flex h-[var(--nx-popover-trigger-height)] items-center justify-center rounded-[var(--nx-popover-trigger-radius)]",
    "border border-[var(--nx-popover-trigger-border-color)] bg-[var(--nx-popover-trigger-background)] px-[var(--nx-popover-trigger-padding-x)] text-[var(--nx-popover-trigger-foreground)]",
    "text-[length:var(--nx-popover-trigger-font-size)] font-[var(--nx-popover-trigger-font-weight)] leading-[var(--nx-popover-trigger-font-line-height)]",
    "transition-colors duration-[var(--nx-popover-transition-duration)] ease-[var(--nx-popover-transition-easing)]",
    "outline-none hover:bg-[var(--nx-popover-trigger-hover-background)] focus-visible:ring-2 focus-visible:ring-[var(--nx-popover-focus-ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nx-popover-focus-ring-offset-color)]",
    "disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
)

export const popoverBackdropVariants = cva(
  [
    "fixed inset-0 z-[var(--nx-popover-backdrop-z-index)] bg-[var(--nx-popover-backdrop-background)] opacity-[var(--nx-popover-backdrop-opacity)]",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-[var(--nx-popover-transition-duration)] ease-[var(--nx-popover-transition-easing)]",
  ].join(" "),
)

export const popoverPositionerVariants = cva(
  "z-[var(--nx-popover-positioner-z-index)] outline-none data-[anchor-hidden]:hidden",
)

export const popoverPopupVariants = cva(
  [
    "grid w-[min(calc(100vw-2rem),var(--nx-popover-popup-max-width))] gap-[var(--nx-popover-popup-gap)] rounded-[var(--nx-popover-popup-radius)] border",
    "border-[var(--nx-popover-popup-border-color)] bg-[var(--nx-popover-popup-background)] p-[var(--nx-popover-popup-padding)] text-[var(--nx-popover-popup-foreground)] shadow-[var(--nx-popover-popup-shadow)]",
    "outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "transition-[opacity,transform] duration-[var(--nx-popover-transition-duration)] ease-[var(--nx-popover-transition-easing)]",
  ].join(" "),
)

export const popoverArrowVariants = cva(
  [
    "size-[var(--nx-popover-arrow-size)] rotate-45 border border-[var(--nx-popover-popup-border-color)] bg-[var(--nx-popover-popup-background)]",
    "data-[side=bottom]:-translate-y-1/2 data-[side=left]:translate-x-1/2 data-[side=right]:-translate-x-1/2 data-[side=top]:translate-y-1/2",
  ].join(" "),
)

export const popoverTitleVariants = cva(
  "pr-[var(--nx-popover-title-padding-end)] text-[length:var(--nx-popover-title-font-size)] font-[var(--nx-popover-title-font-weight)] leading-[var(--nx-popover-title-font-line-height)] text-[var(--nx-popover-title-foreground)]",
)

export const popoverDescriptionVariants = cva(
  "text-[length:var(--nx-popover-description-font-size)] font-[var(--nx-popover-description-font-weight)] leading-[var(--nx-popover-description-font-line-height)] text-[var(--nx-popover-description-foreground)]",
)

export const popoverCloseVariants = cva(
  [
    "absolute right-[var(--nx-popover-close-inset)] top-[var(--nx-popover-close-inset)] inline-flex size-[var(--nx-popover-close-size)] items-center justify-center rounded-[var(--nx-popover-close-radius)]",
    "text-[var(--nx-popover-close-foreground)] outline-none transition-colors duration-[var(--nx-popover-transition-duration)] ease-[var(--nx-popover-transition-easing)]",
    "hover:bg-[var(--nx-popover-close-hover-background)] focus-visible:ring-2 focus-visible:ring-[var(--nx-popover-focus-ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nx-popover-focus-ring-offset-color)]",
    "disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
)

export const popoverViewportVariants = cva(
  "grid gap-[var(--nx-popover-popup-gap)]",
)
