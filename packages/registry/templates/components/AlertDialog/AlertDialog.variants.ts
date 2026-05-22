/**
 * AlertDialog.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const alertDialogTriggerVariants = cva(
  [
    "inline-flex h-[var(--nx-alert-dialog-trigger-height)] items-center justify-center rounded-[var(--nx-alert-dialog-trigger-radius)]",
    "bg-[var(--nx-alert-dialog-trigger-background)] px-[var(--nx-alert-dialog-trigger-padding-x)] text-[var(--nx-alert-dialog-trigger-foreground)]",
    "text-[length:var(--nx-alert-dialog-trigger-font-size)] font-[var(--nx-alert-dialog-trigger-font-weight)] leading-[var(--nx-alert-dialog-trigger-font-line-height)]",
    "transition-colors duration-[var(--nx-alert-dialog-transition-duration)] ease-[var(--nx-alert-dialog-transition-easing)]",
    "outline-none hover:bg-[var(--nx-alert-dialog-trigger-hover-background)] focus-visible:ring-[length:var(--nx-alert-dialog-focus-ring-width)] focus-visible:ring-[var(--nx-alert-dialog-focus-ring-color)] focus-visible:ring-offset-[length:var(--nx-alert-dialog-focus-ring-offset)] focus-visible:ring-offset-[var(--nx-alert-dialog-focus-ring-offset-color)]",
    "disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
)

export const alertDialogBackdropVariants = cva(
  [
    "fixed inset-0 z-[var(--nx-alert-dialog-backdrop-z-index)] bg-[var(--nx-alert-dialog-backdrop-background)] opacity-[var(--nx-alert-dialog-backdrop-opacity)]",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-[var(--nx-alert-dialog-transition-duration)] ease-[var(--nx-alert-dialog-transition-easing)]",
  ].join(" "),
)

export const alertDialogViewportVariants = cva(
  "fixed inset-0 z-[var(--nx-alert-dialog-viewport-z-index)] grid place-items-center overflow-y-auto p-[var(--nx-alert-dialog-viewport-padding)]",
)

export const alertDialogPopupVariants = cva(
  [
    "grid w-[min(calc(100vw-2rem),var(--nx-alert-dialog-popup-max-width))] gap-[var(--nx-alert-dialog-popup-gap)] rounded-[var(--nx-alert-dialog-popup-radius)] border",
    "border-[var(--nx-alert-dialog-popup-border-color)] bg-[var(--nx-alert-dialog-popup-background)] p-[var(--nx-alert-dialog-popup-padding)] text-[var(--nx-alert-dialog-popup-foreground)] shadow-[var(--nx-alert-dialog-popup-shadow)]",
    "outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "transition-[opacity,transform] duration-[var(--nx-alert-dialog-transition-duration)] ease-[var(--nx-alert-dialog-transition-easing)]",
  ].join(" "),
)

export const alertDialogTitleVariants = cva(
  "pr-[var(--nx-alert-dialog-title-padding-end)] text-[length:var(--nx-alert-dialog-title-font-size)] font-[var(--nx-alert-dialog-title-font-weight)] leading-[var(--nx-alert-dialog-title-font-line-height)] text-[var(--nx-alert-dialog-title-foreground)]",
)

export const alertDialogDescriptionVariants = cva(
  "text-[length:var(--nx-alert-dialog-description-font-size)] font-[var(--nx-alert-dialog-description-font-weight)] leading-[var(--nx-alert-dialog-description-font-line-height)] text-[var(--nx-alert-dialog-description-foreground)]",
)

export const alertDialogCloseVariants = cva(
  [
    "absolute right-[var(--nx-alert-dialog-close-inset)] top-[var(--nx-alert-dialog-close-inset)] inline-flex size-[var(--nx-alert-dialog-close-size)] items-center justify-center rounded-[var(--nx-alert-dialog-close-radius)]",
    "text-[var(--nx-alert-dialog-close-foreground)] outline-none transition-colors duration-[var(--nx-alert-dialog-transition-duration)] ease-[var(--nx-alert-dialog-transition-easing)]",
    "hover:bg-[var(--nx-alert-dialog-close-hover-background)] focus-visible:ring-[length:var(--nx-alert-dialog-focus-ring-width)] focus-visible:ring-[var(--nx-alert-dialog-focus-ring-color)] focus-visible:ring-offset-[length:var(--nx-alert-dialog-focus-ring-offset)] focus-visible:ring-offset-[var(--nx-alert-dialog-focus-ring-offset-color)]",
    "disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
)
