/**
 * Dialog.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const dialogTriggerVariants = cva(
  [
    "inline-flex h-(--lex-dialog-trigger-height) items-center justify-center rounded-(--lex-dialog-trigger-radius)",
    "bg-(--lex-dialog-trigger-background) px-(--lex-dialog-trigger-padding-x) text-(--lex-dialog-trigger-foreground)",
    "text-(length:--lex-dialog-trigger-font-size) font-(--lex-dialog-trigger-font-weight) leading-(--lex-dialog-trigger-font-line-height)",
    "transition-colors duration-(--lex-dialog-transition-duration) ease-(--lex-dialog-transition-easing)",
    "outline-none hover:bg-(--lex-dialog-trigger-hover-background) focus-visible:ring-(length:--lex-dialog-focus-ring-width) focus-visible:ring-(--lex-dialog-focus-ring-color) focus-visible:ring-offset-(length:--lex-dialog-focus-ring-offset) focus-visible:ring-offset-(--lex-dialog-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)
export const dialogBackdropVariants = cva(
  [
    "fixed inset-0 z-(--lex-dialog-backdrop-z-index) bg-(--lex-dialog-backdrop-background) opacity-(--lex-dialog-backdrop-opacity)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-(--lex-dialog-transition-duration) ease-(--lex-dialog-transition-easing)",
  ].join(" "),
)

export const dialogViewportVariants = cva(
  "fixed inset-0 z-(--lex-dialog-viewport-z-index) grid place-items-center overflow-y-auto p-(--lex-dialog-viewport-padding)",
)

export const dialogPopupVariants = cva(
  [
    "grid w-[min(calc(100vw-(var(--lex-dialog-viewport-inset)*2)),var(--lex-dialog-popup-max-width))] gap-(--lex-dialog-popup-gap) rounded-(--lex-dialog-popup-radius) border",
    "border-(--lex-dialog-popup-border-color) bg-(--lex-dialog-popup-background) p-(--lex-dialog-popup-padding) text-(--lex-dialog-popup-foreground) shadow-(--lex-dialog-popup-shadow)",
    "outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "transition-[opacity,transform] duration-(--lex-dialog-transition-duration) ease-(--lex-dialog-transition-easing)",
  ].join(" "),
)

export const dialogTitleVariants = cva(
  "pr-(--lex-dialog-title-padding-end) text-(length:--lex-dialog-title-font-size) font-(--lex-dialog-title-font-weight) leading-(--lex-dialog-title-font-line-height) text-(--lex-dialog-title-foreground)",
)

export const dialogDescriptionVariants = cva(
  "text-(length:--lex-dialog-description-font-size) font-(--lex-dialog-description-font-weight) leading-(--lex-dialog-description-font-line-height) text-(--lex-dialog-description-foreground)",
)

export const dialogCloseVariants = cva(
  [
    "absolute right-(--lex-dialog-close-inset) top-(--lex-dialog-close-inset) inline-flex size-(--lex-dialog-close-size) items-center justify-center rounded-(--lex-dialog-close-radius)",
    "text-(--lex-dialog-close-foreground) outline-none transition-colors duration-(--lex-dialog-transition-duration) ease-(--lex-dialog-transition-easing)",
    "hover:bg-(--lex-dialog-close-hover-background) focus-visible:ring-(length:--lex-dialog-focus-ring-width) focus-visible:ring-(--lex-dialog-focus-ring-color) focus-visible:ring-offset-(length:--lex-dialog-focus-ring-offset) focus-visible:ring-offset-(--lex-dialog-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)
