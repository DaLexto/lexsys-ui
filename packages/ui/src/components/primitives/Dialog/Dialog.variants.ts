/**
 * Dialog.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const dialogTriggerVariants = cva(
  [
    "inline-flex h-(--lsys-dialog-trigger-height) items-center justify-center rounded-(--lsys-dialog-trigger-radius)",
    "bg-(--lsys-dialog-trigger-background) px-(--lsys-dialog-trigger-padding-x) text-(--lsys-dialog-trigger-foreground)",
    "text-(length:--lsys-dialog-trigger-font-size) font-(--lsys-dialog-trigger-font-weight) leading-(--lsys-dialog-trigger-font-line-height)",
    "transition-colors duration-(--lsys-dialog-transition-duration) ease-(--lsys-dialog-transition-easing)",
    "outline-none hover:bg-(--lsys-dialog-trigger-hover-background) focus-visible:ring-(length:--lsys-dialog-focus-ring-width) focus-visible:ring-(--lsys-dialog-focus-ring-color) focus-visible:ring-offset-(length:--lsys-dialog-focus-ring-offset) focus-visible:ring-offset-(--lsys-dialog-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)
export const dialogBackdropVariants = cva(
  [
    "fixed inset-0 z-(--lsys-dialog-backdrop-z-index) bg-(--lsys-dialog-backdrop-background) opacity-(--lsys-dialog-backdrop-opacity)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-(--lsys-dialog-transition-duration) ease-(--lsys-dialog-transition-easing)",
  ].join(" "),
)

export const dialogViewportVariants = cva(
  "fixed inset-0 z-(--lsys-dialog-viewport-z-index) grid place-items-center overflow-y-auto p-(--lsys-dialog-viewport-padding)",
)

export const dialogPopupVariants = cva(
  [
    "grid w-[min(calc(100vw-(var(--lsys-dialog-viewport-inset)*2)),var(--lsys-dialog-popup-max-width))] gap-(--lsys-dialog-popup-gap) rounded-(--lsys-dialog-popup-radius) border",
    "border-(--lsys-dialog-popup-border-color) bg-(--lsys-dialog-popup-background) p-(--lsys-dialog-popup-padding) text-(--lsys-dialog-popup-foreground) shadow-(--lsys-dialog-popup-shadow)",
    "outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "transition-[opacity,transform] duration-(--lsys-dialog-transition-duration) ease-(--lsys-dialog-transition-easing)",
  ].join(" "),
)

export const dialogTitleVariants = cva(
  "pr-(--lsys-dialog-title-padding-end) text-(length:--lsys-dialog-title-font-size) font-(--lsys-dialog-title-font-weight) leading-(--lsys-dialog-title-font-line-height) text-(--lsys-dialog-title-foreground)",
)

export const dialogDescriptionVariants = cva(
  "text-(length:--lsys-dialog-description-font-size) font-(--lsys-dialog-description-font-weight) leading-(--lsys-dialog-description-font-line-height) text-(--lsys-dialog-description-foreground)",
)

export const dialogCloseVariants = cva(
  [
    "absolute right-(--lsys-dialog-close-inset) top-(--lsys-dialog-close-inset) inline-flex size-(--lsys-dialog-close-size) items-center justify-center rounded-(--lsys-dialog-close-radius)",
    "text-(--lsys-dialog-close-foreground) outline-none transition-colors duration-(--lsys-dialog-transition-duration) ease-(--lsys-dialog-transition-easing)",
    "hover:bg-(--lsys-dialog-close-hover-background) focus-visible:ring-(length:--lsys-dialog-focus-ring-width) focus-visible:ring-(--lsys-dialog-focus-ring-color) focus-visible:ring-offset-(length:--lsys-dialog-focus-ring-offset) focus-visible:ring-offset-(--lsys-dialog-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)
