/**
 * AlertDialog.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const alertDialogTriggerVariants = cva(
  [
    "inline-flex h-(--lex-alert-dialog-trigger-height) items-center justify-center rounded-(--lex-alert-dialog-trigger-radius)",
    "bg-(--lex-alert-dialog-trigger-background) px-(--lex-alert-dialog-trigger-padding-x) text-(--lex-alert-dialog-trigger-foreground)",
    "text-(length:--lex-alert-dialog-trigger-font-size) font-(--lex-alert-dialog-trigger-font-weight) leading-(--lex-alert-dialog-trigger-font-line-height)",
    "transition-colors duration-(--lex-alert-dialog-transition-duration) ease-(--lex-alert-dialog-transition-easing)",
    "outline-none hover:bg-(--lex-alert-dialog-trigger-hover-background) focus-visible:ring-(length:--lex-alert-dialog-focus-ring-width) focus-visible:ring-(--lex-alert-dialog-focus-ring-color) focus-visible:ring-offset-(length:--lex-alert-dialog-focus-ring-offset) focus-visible:ring-offset-(--lex-alert-dialog-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const alertDialogBackdropVariants = cva(
  [
    "fixed inset-0 z-(--lex-alert-dialog-backdrop-z-index) bg-(--lex-alert-dialog-backdrop-background) opacity-(--lex-alert-dialog-backdrop-opacity)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-(--lex-alert-dialog-transition-duration) ease-(--lex-alert-dialog-transition-easing)",
  ].join(" "),
)

export const alertDialogViewportVariants = cva(
  "fixed inset-0 z-(--lex-alert-dialog-viewport-z-index) grid place-items-center overflow-y-auto p-(--lex-alert-dialog-viewport-padding)",
)

export const alertDialogPopupVariants = cva(
  [
    "grid w-[min(calc(100vw-(var(--lex-alert-dialog-viewport-inset)*2)),var(--lex-alert-dialog-popup-max-width))] gap-(--lex-alert-dialog-popup-gap) rounded-(--lex-alert-dialog-popup-radius) border",
    "border-(--lex-alert-dialog-popup-border-color) bg-(--lex-alert-dialog-popup-background) p-(--lex-alert-dialog-popup-padding) text-(--lex-alert-dialog-popup-foreground) shadow-(--lex-alert-dialog-popup-shadow)",
    "outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "transition-[opacity,transform] duration-(--lex-alert-dialog-transition-duration) ease-(--lex-alert-dialog-transition-easing)",
  ].join(" "),
)

export const alertDialogTitleVariants = cva(
  "pr-(--lex-alert-dialog-title-padding-end) text-(length:--lex-alert-dialog-title-font-size) font-(--lex-alert-dialog-title-font-weight) leading-(--lex-alert-dialog-title-font-line-height) text-(--lex-alert-dialog-title-foreground)",
)

export const alertDialogDescriptionVariants = cva(
  "text-(length:--lex-alert-dialog-description-font-size) font-(--lex-alert-dialog-description-font-weight) leading-(--lex-alert-dialog-description-font-line-height) text-(--lex-alert-dialog-description-foreground)",
)

export const alertDialogCloseVariants = cva(
  [
    "absolute right-(--lex-alert-dialog-close-inset) top-(--lex-alert-dialog-close-inset) inline-flex size-(--lex-alert-dialog-close-size) items-center justify-center rounded-(--lex-alert-dialog-close-radius)",
    "text-(--lex-alert-dialog-close-foreground) outline-none transition-colors duration-(--lex-alert-dialog-transition-duration) ease-(--lex-alert-dialog-transition-easing)",
    "hover:bg-(--lex-alert-dialog-close-hover-background) focus-visible:ring-(length:--lex-alert-dialog-focus-ring-width) focus-visible:ring-(--lex-alert-dialog-focus-ring-color) focus-visible:ring-offset-(length:--lex-alert-dialog-focus-ring-offset) focus-visible:ring-offset-(--lex-alert-dialog-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)
