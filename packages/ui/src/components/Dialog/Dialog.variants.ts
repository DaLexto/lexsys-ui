/**
 * Dialog.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const dialogTriggerVariants = cva(
  [
    "inline-flex h-[var(--nx-dialog-trigger-height)] items-center justify-center rounded-[var(--nx-dialog-trigger-radius)]",
    "bg-[var(--nx-dialog-trigger-background)] px-[var(--nx-dialog-trigger-padding-x)] text-[var(--nx-dialog-trigger-foreground)]",
    "text-[length:var(--nx-dialog-trigger-font-size)] font-[var(--nx-dialog-trigger-font-weight)] leading-[var(--nx-dialog-trigger-font-line-height)]",
    "transition-colors duration-[var(--nx-dialog-transition-duration)] ease-[var(--nx-dialog-transition-easing)]",
    "outline-none hover:bg-[var(--nx-dialog-trigger-hover-background)] focus-visible:ring-2 focus-visible:ring-[var(--nx-dialog-focus-ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nx-dialog-focus-ring-offset-color)]",
    "disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
)

export const dialogBackdropVariants = cva(
  [
    "fixed inset-0 z-40 bg-[var(--nx-dialog-backdrop-background)] opacity-[var(--nx-dialog-backdrop-opacity)]",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-[var(--nx-dialog-transition-duration)] ease-[var(--nx-dialog-transition-easing)]",
  ].join(" "),
)

export const dialogViewportVariants = cva(
  "fixed inset-0 z-50 grid place-items-center overflow-y-auto p-[var(--nx-dialog-viewport-padding)]",
)

export const dialogPopupVariants = cva(
  [
    "grid w-[min(calc(100vw-2rem),var(--nx-dialog-popup-max-width))] gap-[var(--nx-dialog-popup-gap)] rounded-[var(--nx-dialog-popup-radius)] border",
    "border-[var(--nx-dialog-popup-border-color)] bg-[var(--nx-dialog-popup-background)] p-[var(--nx-dialog-popup-padding)] text-[var(--nx-dialog-popup-foreground)] shadow-lg",
    "outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "transition-[opacity,transform] duration-[var(--nx-dialog-transition-duration)] ease-[var(--nx-dialog-transition-easing)]",
  ].join(" "),
)

export const dialogTitleVariants = cva(
  "pr-[var(--nx-dialog-title-padding-end)] text-[length:var(--nx-dialog-title-font-size)] font-[var(--nx-dialog-title-font-weight)] leading-[var(--nx-dialog-title-font-line-height)] text-[var(--nx-dialog-title-foreground)]",
)

export const dialogDescriptionVariants = cva(
  "text-[length:var(--nx-dialog-description-font-size)] font-[var(--nx-dialog-description-font-weight)] leading-[var(--nx-dialog-description-font-line-height)] text-[var(--nx-dialog-description-foreground)]",
)

export const dialogCloseVariants = cva(
  [
    "absolute right-[var(--nx-dialog-close-inset)] top-[var(--nx-dialog-close-inset)] inline-flex size-[var(--nx-dialog-close-size)] items-center justify-center rounded-[var(--nx-dialog-close-radius)]",
    "text-[var(--nx-dialog-close-foreground)] outline-none transition-colors duration-[var(--nx-dialog-transition-duration)] ease-[var(--nx-dialog-transition-easing)]",
    "hover:bg-[var(--nx-dialog-close-hover-background)] focus-visible:ring-2 focus-visible:ring-[var(--nx-dialog-focus-ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nx-dialog-focus-ring-offset-color)]",
    "disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
)
