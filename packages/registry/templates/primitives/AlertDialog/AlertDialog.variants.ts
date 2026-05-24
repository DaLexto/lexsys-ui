/**
 * AlertDialog.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const alertDialogTriggerVariants = cva(
  [
    "inline-flex h-(--lsys-alert-dialog-trigger-height) items-center justify-center rounded-(--lsys-alert-dialog-trigger-radius)",
    "bg-(--lsys-alert-dialog-trigger-background) px-(--lsys-alert-dialog-trigger-padding-x) text-(--lsys-alert-dialog-trigger-foreground)",
    "text-(length:--lsys-alert-dialog-trigger-font-size) font-(--lsys-alert-dialog-trigger-font-weight) leading-(--lsys-alert-dialog-trigger-font-line-height)",
    "transition-colors duration-(--lsys-alert-dialog-transition-duration) ease-(--lsys-alert-dialog-transition-easing)",
    "outline-none hover:bg-(--lsys-alert-dialog-trigger-hover-background) focus-visible:ring-(length:--lsys-alert-dialog-focus-ring-width) focus-visible:ring-(--lsys-alert-dialog-focus-ring-color) focus-visible:ring-offset-(length:--lsys-alert-dialog-focus-ring-offset) focus-visible:ring-offset-(--lsys-alert-dialog-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const alertDialogBackdropVariants = cva(
  [
    "fixed inset-0 z-(--lsys-alert-dialog-backdrop-z-index) bg-(--lsys-alert-dialog-backdrop-background) opacity-(--lsys-alert-dialog-backdrop-opacity)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-(--lsys-alert-dialog-transition-duration) ease-(--lsys-alert-dialog-transition-easing)",
  ].join(" "),
)

export const alertDialogViewportVariants = cva(
  "fixed inset-0 z-(--lsys-alert-dialog-viewport-z-index) grid place-items-center overflow-y-auto p-(--lsys-alert-dialog-viewport-padding)",
)

export const alertDialogPopupVariants = cva(
  [
    "grid w-[min(calc(100vw-(var(--lsys-alert-dialog-viewport-inset)*2)),var(--lsys-alert-dialog-popup-max-width))] gap-(--lsys-alert-dialog-popup-gap) rounded-(--lsys-alert-dialog-popup-radius) border",
    "border-(--lsys-alert-dialog-popup-border-color) bg-(--lsys-alert-dialog-popup-background) p-(--lsys-alert-dialog-popup-padding) text-(--lsys-alert-dialog-popup-foreground) shadow-(--lsys-alert-dialog-popup-shadow)",
    "outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "transition-[opacity,transform] duration-(--lsys-alert-dialog-transition-duration) ease-(--lsys-alert-dialog-transition-easing)",
  ].join(" "),
)

export const alertDialogTitleVariants = cva(
  "pr-(--lsys-alert-dialog-title-padding-end) text-(length:--lsys-alert-dialog-title-font-size) font-(--lsys-alert-dialog-title-font-weight) leading-(--lsys-alert-dialog-title-font-line-height) text-(--lsys-alert-dialog-title-foreground)",
)

export const alertDialogDescriptionVariants = cva(
  "text-(length:--lsys-alert-dialog-description-font-size) font-(--lsys-alert-dialog-description-font-weight) leading-(--lsys-alert-dialog-description-font-line-height) text-(--lsys-alert-dialog-description-foreground)",
)

export const alertDialogCloseVariants = cva(
  [
    "absolute right-(--lsys-alert-dialog-close-inset) top-(--lsys-alert-dialog-close-inset) inline-flex size-(--lsys-alert-dialog-close-size) items-center justify-center rounded-(--lsys-alert-dialog-close-radius)",
    "text-(--lsys-alert-dialog-close-foreground) outline-none transition-colors duration-(--lsys-alert-dialog-transition-duration) ease-(--lsys-alert-dialog-transition-easing)",
    "hover:bg-(--lsys-alert-dialog-close-hover-background) focus-visible:ring-(length:--lsys-alert-dialog-focus-ring-width) focus-visible:ring-(--lsys-alert-dialog-focus-ring-color) focus-visible:ring-offset-(length:--lsys-alert-dialog-focus-ring-offset) focus-visible:ring-offset-(--lsys-alert-dialog-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)
