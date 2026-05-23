/**
 * AlertDialog.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../utils/cn"

export const alertDialogTriggerVariants = cva(
  [
    "inline-flex h-(--nx-alert-dialog-trigger-height) items-center justify-center rounded-(--nx-alert-dialog-trigger-radius)",
    "bg-(--nx-alert-dialog-trigger-background) px-(--nx-alert-dialog-trigger-padding-x) text-(--nx-alert-dialog-trigger-foreground)",
    "text-(length:--nx-alert-dialog-trigger-font-size) font-(--nx-alert-dialog-trigger-font-weight) leading-(--nx-alert-dialog-trigger-font-line-height)",
    "transition-colors duration-(--nx-alert-dialog-transition-duration) ease-(--nx-alert-dialog-transition-easing)",
    "outline-none hover:bg-(--nx-alert-dialog-trigger-hover-background) focus-visible:ring-(length:--nx-alert-dialog-focus-ring-width) focus-visible:ring-(--nx-alert-dialog-focus-ring-color) focus-visible:ring-offset-(length:--nx-alert-dialog-focus-ring-offset) focus-visible:ring-offset-(--nx-alert-dialog-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const alertDialogBackdropVariants = cva(
  [
    "fixed inset-0 z-(--nx-alert-dialog-backdrop-z-index) bg-(--nx-alert-dialog-backdrop-background) opacity-(--nx-alert-dialog-backdrop-opacity)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-(--nx-alert-dialog-transition-duration) ease-(--nx-alert-dialog-transition-easing)",
  ].join(" "),
)

export const alertDialogViewportVariants = cva(
  "fixed inset-0 z-(--nx-alert-dialog-viewport-z-index) grid place-items-center overflow-y-auto p-(--nx-alert-dialog-viewport-padding)",
)

export const alertDialogPopupVariants = cva(
  [
    "grid w-[min(calc(100vw-(var(--nx-alert-dialog-viewport-inset)*2)),var(--nx-alert-dialog-popup-max-width))] gap-(--nx-alert-dialog-popup-gap) rounded-(--nx-alert-dialog-popup-radius) border",
    "border-(--nx-alert-dialog-popup-border-color) bg-(--nx-alert-dialog-popup-background) p-(--nx-alert-dialog-popup-padding) text-(--nx-alert-dialog-popup-foreground) shadow-(--nx-alert-dialog-popup-shadow)",
    "outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "transition-[opacity,transform] duration-(--nx-alert-dialog-transition-duration) ease-(--nx-alert-dialog-transition-easing)",
  ].join(" "),
)

export const alertDialogTitleVariants = cva(
  "pr-(--nx-alert-dialog-title-padding-end) text-(length:--nx-alert-dialog-title-font-size) font-(--nx-alert-dialog-title-font-weight) leading-(--nx-alert-dialog-title-font-line-height) text-(--nx-alert-dialog-title-foreground)",
)

export const alertDialogDescriptionVariants = cva(
  "text-(length:--nx-alert-dialog-description-font-size) font-(--nx-alert-dialog-description-font-weight) leading-(--nx-alert-dialog-description-font-line-height) text-(--nx-alert-dialog-description-foreground)",
)

export const alertDialogCloseVariants = cva(
  [
    "absolute right-(--nx-alert-dialog-close-inset) top-(--nx-alert-dialog-close-inset) inline-flex size-(--nx-alert-dialog-close-size) items-center justify-center rounded-(--nx-alert-dialog-close-radius)",
    "text-(--nx-alert-dialog-close-foreground) outline-none transition-colors duration-(--nx-alert-dialog-transition-duration) ease-(--nx-alert-dialog-transition-easing)",
    "hover:bg-(--nx-alert-dialog-close-hover-background) focus-visible:ring-(length:--nx-alert-dialog-focus-ring-width) focus-visible:ring-(--nx-alert-dialog-focus-ring-color) focus-visible:ring-offset-(length:--nx-alert-dialog-focus-ring-offset) focus-visible:ring-offset-(--nx-alert-dialog-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)
