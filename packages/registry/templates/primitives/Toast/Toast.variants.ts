/**
 * Toast.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const toastViewportVariants = cva(
  [
    "fixed z-(--lex-toast-viewport-z-index) flex max-h-(--lex-toast-viewport-max-height) w-[min(calc(100vw-(var(--lex-toast-viewport-inset)*2)),var(--lex-toast-viewport-width))] flex-col gap-(--lex-toast-viewport-gap) p-(--lex-toast-viewport-padding)",
    "data-[expanded]:gap-(--lex-toast-viewport-gap-expanded)",
  ].join(" "),
  {
    variants: {
      placement: {
        "top-right": "right-0 top-0",
        "top-left": "left-0 top-0",
        "bottom-right": "bottom-0 right-0",
        "bottom-left": "bottom-0 left-0",
      },
    },
    defaultVariants: {
      placement: "bottom-right",
    },
  },
)

const toastTypeSurfaceClasses = [
  "border-(--lex-toast-border-color) bg-(--lex-toast-background) text-(--lex-toast-foreground)",
  "data-[type=success]:border-(--lex-toast-success-border-color) data-[type=success]:bg-(--lex-toast-success-background) data-[type=success]:text-(--lex-toast-success-foreground)",
  "data-[type=info]:border-(--lex-toast-info-border-color) data-[type=info]:bg-(--lex-toast-info-background) data-[type=info]:text-(--lex-toast-info-foreground)",
  "data-[type=destructive]:border-(--lex-toast-danger-border-color) data-[type=destructive]:bg-(--lex-toast-danger-background) data-[type=destructive]:text-(--lex-toast-danger-foreground)",
].join(" ")

export const toastVariants = cva(
  [
    "relative grid gap-(--lex-toast-gap) rounded-(--lex-toast-radius) border p-(--lex-toast-padding) pr-(--lex-toast-padding-end) shadow-(--lex-toast-shadow) outline-none",
    toastTypeSurfaceClasses,
    "transition-[opacity,transform] duration-(--lex-toast-transition-duration) ease-(--lex-toast-transition-easing)",
    "data-[starting-style]:translate-y-(--lex-toast-motion-offset-y) data-[starting-style]:opacity-0 data-[ending-style]:translate-y-(--lex-toast-motion-offset-y) data-[ending-style]:opacity-0 data-[swiping]:transition-none",
    "translate-x-[var(--toast-swipe-movement-x,0px)] translate-y-[var(--toast-swipe-movement-y,0px)]",
  ].join(" "),
)

export const toastContentVariants = cva(
  "grid gap-(--lex-toast-content-gap) data-[behind]:opacity-(--lex-toast-content-behind-opacity)",
)

export const toastPositionerVariants = cva(
  "z-(--lex-toast-viewport-z-index) max-w-[min(var(--available-width,calc(100vw-(var(--lex-toast-viewport-inset)*2))),var(--lex-toast-viewport-width))]",
)

export const toastArrowVariants = cva(
  [
    "size-(--lex-toast-arrow-size) rotate-45 border",
    toastTypeSurfaceClasses,
  ].join(" "),
)

export const toastTitleVariants = cva(
  "text-(length:--lex-toast-title-font-size) font-(--lex-toast-title-font-weight) leading-(--lex-toast-title-font-line-height)",
)

export const toastDescriptionVariants = cva(
  [
    "text-(length:--lex-toast-description-font-size) font-(--lex-toast-description-font-weight) leading-(--lex-toast-description-font-line-height)",
    "text-(--lex-toast-description-foreground) data-[type=success]:text-(--lex-toast-success-foreground) data-[type=info]:text-(--lex-toast-info-foreground) data-[type=destructive]:text-(--lex-toast-danger-foreground)",
  ].join(" "),
)

export const toastActionVariants = cva(
  [
    "inline-flex h-(--lex-toast-action-height) items-center justify-center rounded-(--lex-toast-action-radius) border border-(--lex-toast-action-border-color) px-(--lex-toast-action-padding-x)",
    "text-(length:--lex-toast-action-font-size) font-(--lex-toast-action-font-weight) leading-(--lex-toast-action-font-line-height) text-(--lex-toast-action-foreground)",
    "outline-none transition-colors duration-(--lex-toast-transition-duration) ease-(--lex-toast-transition-easing) hover:bg-(--lex-toast-action-hover-background) focus-visible:ring-(length:--lex-toast-focus-ring-width) focus-visible:ring-(--lex-toast-focus-ring-color)",
    disabledStateClasses,
  ].join(" "),
)

export const toastCloseVariants = cva(
  [
    "absolute right-(--lex-toast-close-inset) top-(--lex-toast-close-inset) inline-flex size-(--lex-toast-close-size) items-center justify-center rounded-(--lex-toast-close-radius)",
    "text-(--lex-toast-close-foreground) outline-none transition-colors duration-(--lex-toast-transition-duration) ease-(--lex-toast-transition-easing) hover:bg-(--lex-toast-close-hover-background) focus-visible:ring-(length:--lex-toast-focus-ring-width) focus-visible:ring-(--lex-toast-focus-ring-color)",
    disabledStateClasses,
  ].join(" "),
)
