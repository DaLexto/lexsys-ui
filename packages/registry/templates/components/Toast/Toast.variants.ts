/**
 * Toast.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const toastViewportVariants = cva(
  [
    "fixed z-(--nx-toast-viewport-z-index) flex max-h-(--nx-toast-viewport-max-height) w-[min(calc(100vw-(var(--nx-toast-viewport-inset)*2)),var(--nx-toast-viewport-width))] flex-col gap-(--nx-toast-viewport-gap) p-(--nx-toast-viewport-padding)",
    "data-[expanded]:gap-(--nx-toast-viewport-gap-expanded)",
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
  "border-(--nx-toast-border-color) bg-(--nx-toast-background) text-(--nx-toast-foreground)",
  "data-[type=success]:border-(--nx-toast-success-border-color) data-[type=success]:bg-(--nx-toast-success-background) data-[type=success]:text-(--nx-toast-success-foreground)",
  "data-[type=info]:border-(--nx-toast-info-border-color) data-[type=info]:bg-(--nx-toast-info-background) data-[type=info]:text-(--nx-toast-info-foreground)",
  "data-[type=destructive]:border-(--nx-toast-danger-border-color) data-[type=destructive]:bg-(--nx-toast-danger-background) data-[type=destructive]:text-(--nx-toast-danger-foreground)",
].join(" ")

export const toastVariants = cva(
  [
    "relative grid gap-(--nx-toast-gap) rounded-(--nx-toast-radius) border p-(--nx-toast-padding) pr-(--nx-toast-padding-end) shadow-(--nx-toast-shadow) outline-none",
    toastTypeSurfaceClasses,
    "transition-[opacity,transform] duration-(--nx-toast-transition-duration) ease-(--nx-toast-transition-easing)",
    "data-[starting-style]:translate-y-(--nx-toast-motion-offset-y) data-[starting-style]:opacity-0 data-[ending-style]:translate-y-(--nx-toast-motion-offset-y) data-[ending-style]:opacity-0 data-[swiping]:transition-none",
    "translate-x-[var(--toast-swipe-movement-x,0px)] translate-y-[var(--toast-swipe-movement-y,0px)]",
  ].join(" "),
)

export const toastContentVariants = cva(
  "grid gap-(--nx-toast-content-gap) data-[behind]:opacity-(--nx-toast-content-behind-opacity)",
)

export const toastPositionerVariants = cva(
  "z-(--nx-toast-viewport-z-index) max-w-[min(var(--available-width,calc(100vw-(var(--nx-toast-viewport-inset)*2))),var(--nx-toast-viewport-width))]",
)

export const toastArrowVariants = cva(
  [
    "size-(--nx-toast-arrow-size) rotate-45 border",
    toastTypeSurfaceClasses,
  ].join(" "),
)

export const toastTitleVariants = cva(
  "text-(length:--nx-toast-title-font-size) font-(--nx-toast-title-font-weight) leading-(--nx-toast-title-font-line-height)",
)

export const toastDescriptionVariants = cva(
  [
    "text-(length:--nx-toast-description-font-size) font-(--nx-toast-description-font-weight) leading-(--nx-toast-description-font-line-height)",
    "text-(--nx-toast-description-foreground) data-[type=success]:text-(--nx-toast-success-foreground) data-[type=info]:text-(--nx-toast-info-foreground) data-[type=destructive]:text-(--nx-toast-danger-foreground)",
  ].join(" "),
)

export const toastActionVariants = cva(
  [
    "inline-flex h-(--nx-toast-action-height) items-center justify-center rounded-(--nx-toast-action-radius) border border-(--nx-toast-action-border-color) px-(--nx-toast-action-padding-x)",
    "text-(length:--nx-toast-action-font-size) font-(--nx-toast-action-font-weight) leading-(--nx-toast-action-font-line-height) text-(--nx-toast-action-foreground)",
    "outline-none transition-colors duration-(--nx-toast-transition-duration) ease-(--nx-toast-transition-easing) hover:bg-(--nx-toast-action-hover-background) focus-visible:ring-(length:--nx-toast-focus-ring-width) focus-visible:ring-(--nx-toast-focus-ring-color)",
    disabledStateClasses,
  ].join(" "),
)

export const toastCloseVariants = cva(
  [
    "absolute right-(--nx-toast-close-inset) top-(--nx-toast-close-inset) inline-flex size-(--nx-toast-close-size) items-center justify-center rounded-(--nx-toast-close-radius)",
    "text-(--nx-toast-close-foreground) outline-none transition-colors duration-(--nx-toast-transition-duration) ease-(--nx-toast-transition-easing) hover:bg-(--nx-toast-close-hover-background) focus-visible:ring-(length:--nx-toast-focus-ring-width) focus-visible:ring-(--nx-toast-focus-ring-color)",
    disabledStateClasses,
  ].join(" "),
)
