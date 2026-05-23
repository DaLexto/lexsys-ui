/**
 * Dialog.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const dialogTriggerVariants = cva(
  [
    "inline-flex h-(--nx-dialog-trigger-height) items-center justify-center rounded-(--nx-dialog-trigger-radius)",
    "bg-(--nx-dialog-trigger-background) px-(--nx-dialog-trigger-padding-x) text-(--nx-dialog-trigger-foreground)",
    "text-(length:--nx-dialog-trigger-font-size) font-(--nx-dialog-trigger-font-weight) leading-(--nx-dialog-trigger-font-line-height)",
    "transition-colors duration-(--nx-dialog-transition-duration) ease-(--nx-dialog-transition-easing)",
    "outline-none hover:bg-(--nx-dialog-trigger-hover-background) focus-visible:ring-(length:--nx-dialog-focus-ring-width) focus-visible:ring-(--nx-dialog-focus-ring-color) focus-visible:ring-offset-(length:--nx-dialog-focus-ring-offset) focus-visible:ring-offset-(--nx-dialog-focus-ring-offset-color)",
    "disabled:cursor-not-allowed disabled:opacity-(--nx-opacity-disabled) data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
)
export const dialogBackdropVariants = cva(
  [
    "fixed inset-0 z-(--nx-dialog-backdrop-z-index) bg-(--nx-dialog-backdrop-background) opacity-(--nx-dialog-backdrop-opacity)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-(--nx-dialog-transition-duration) ease-(--nx-dialog-transition-easing)",
  ].join(" "),
)

export const dialogViewportVariants = cva(
  "fixed inset-0 z-(--nx-dialog-viewport-z-index) grid place-items-center overflow-y-auto p-(--nx-dialog-viewport-padding)",
)

export const dialogPopupVariants = cva(
  [
    "grid w-[min(calc(100vw-(var(--nx-dialog-viewport-inset)*2)),var(--nx-dialog-popup-max-width))] gap-(--nx-dialog-popup-gap) rounded-(--nx-dialog-popup-radius) border",
    "border-(--nx-dialog-popup-border-color) bg-(--nx-dialog-popup-background) p-(--nx-dialog-popup-padding) text-(--nx-dialog-popup-foreground) shadow-(--nx-dialog-popup-shadow)",
    "outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "transition-[opacity,transform] duration-(--nx-dialog-transition-duration) ease-(--nx-dialog-transition-easing)",
  ].join(" "),
)

export const dialogTitleVariants = cva(
  "pr-(--nx-dialog-title-padding-end) text-(length:--nx-dialog-title-font-size) font-(--nx-dialog-title-font-weight) leading-(--nx-dialog-title-font-line-height) text-(--nx-dialog-title-foreground)",
)

export const dialogDescriptionVariants = cva(
  "text-(length:--nx-dialog-description-font-size) font-(--nx-dialog-description-font-weight) leading-(--nx-dialog-description-font-line-height) text-(--nx-dialog-description-foreground)",
)

export const dialogCloseVariants = cva(
  [
    "absolute right-(--nx-dialog-close-inset) top-(--nx-dialog-close-inset) inline-flex size-(--nx-dialog-close-size) items-center justify-center rounded-(--nx-dialog-close-radius)",
    "text-(--nx-dialog-close-foreground) outline-none transition-colors duration-(--nx-dialog-transition-duration) ease-(--nx-dialog-transition-easing)",
    "hover:bg-(--nx-dialog-close-hover-background) focus-visible:ring-(length:--nx-dialog-focus-ring-width) focus-visible:ring-(--nx-dialog-focus-ring-color) focus-visible:ring-offset-(length:--nx-dialog-focus-ring-offset) focus-visible:ring-offset-(--nx-dialog-focus-ring-offset-color)",
    "disabled:cursor-not-allowed disabled:opacity-(--nx-opacity-disabled) data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
)
