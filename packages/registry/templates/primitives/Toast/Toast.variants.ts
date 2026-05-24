/**
 * Toast.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const toastViewportVariants = cva(
  [
    "fixed z-(--lsys-toast-viewport-z-index) flex max-h-(--lsys-toast-viewport-max-height) w-[min(calc(100vw-(var(--lsys-toast-viewport-inset)*2)),var(--lsys-toast-viewport-width))] flex-col gap-(--lsys-toast-viewport-gap) p-(--lsys-toast-viewport-padding)",
    "data-[expanded]:gap-(--lsys-toast-viewport-gap-expanded)",
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
  "border-(--lsys-toast-border-color) bg-(--lsys-toast-background) text-(--lsys-toast-foreground)",
  "data-[type=success]:border-(--lsys-toast-success-border-color) data-[type=success]:bg-(--lsys-toast-success-background) data-[type=success]:text-(--lsys-toast-success-foreground)",
  "data-[type=info]:border-(--lsys-toast-info-border-color) data-[type=info]:bg-(--lsys-toast-info-background) data-[type=info]:text-(--lsys-toast-info-foreground)",
  "data-[type=destructive]:border-(--lsys-toast-danger-border-color) data-[type=destructive]:bg-(--lsys-toast-danger-background) data-[type=destructive]:text-(--lsys-toast-danger-foreground)",
].join(" ")

export const toastVariants = cva(
  [
    "relative grid gap-(--lsys-toast-gap) rounded-(--lsys-toast-radius) border p-(--lsys-toast-padding) pr-(--lsys-toast-padding-end) shadow-(--lsys-toast-shadow) outline-none",
    toastTypeSurfaceClasses,
    "transition-[opacity,transform] duration-(--lsys-toast-transition-duration) ease-(--lsys-toast-transition-easing)",
    "data-[starting-style]:translate-y-(--lsys-toast-motion-offset-y) data-[starting-style]:opacity-0 data-[ending-style]:translate-y-(--lsys-toast-motion-offset-y) data-[ending-style]:opacity-0 data-[swiping]:transition-none",
    "translate-x-[var(--toast-swipe-movement-x,0px)] translate-y-[var(--toast-swipe-movement-y,0px)]",
  ].join(" "),
)

export const toastContentVariants = cva(
  "grid gap-(--lsys-toast-content-gap) data-[behind]:opacity-(--lsys-toast-content-behind-opacity)",
)

export const toastPositionerVariants = cva(
  "z-(--lsys-toast-viewport-z-index) max-w-[min(var(--available-width,calc(100vw-(var(--lsys-toast-viewport-inset)*2))),var(--lsys-toast-viewport-width))]",
)

export const toastArrowVariants = cva(
  [
    "size-(--lsys-toast-arrow-size) rotate-45 border",
    toastTypeSurfaceClasses,
  ].join(" "),
)

export const toastTitleVariants = cva(
  "text-(length:--lsys-toast-title-font-size) font-(--lsys-toast-title-font-weight) leading-(--lsys-toast-title-font-line-height)",
)

export const toastDescriptionVariants = cva(
  [
    "text-(length:--lsys-toast-description-font-size) font-(--lsys-toast-description-font-weight) leading-(--lsys-toast-description-font-line-height)",
    "text-(--lsys-toast-description-foreground) data-[type=success]:text-(--lsys-toast-success-foreground) data-[type=info]:text-(--lsys-toast-info-foreground) data-[type=destructive]:text-(--lsys-toast-danger-foreground)",
  ].join(" "),
)

export const toastActionVariants = cva(
  [
    "inline-flex h-(--lsys-toast-action-height) items-center justify-center rounded-(--lsys-toast-action-radius) border border-(--lsys-toast-action-border-color) px-(--lsys-toast-action-padding-x)",
    "text-(length:--lsys-toast-action-font-size) font-(--lsys-toast-action-font-weight) leading-(--lsys-toast-action-font-line-height) text-(--lsys-toast-action-foreground)",
    "outline-none transition-colors duration-(--lsys-toast-transition-duration) ease-(--lsys-toast-transition-easing) hover:bg-(--lsys-toast-action-hover-background) focus-visible:ring-(length:--lsys-toast-focus-ring-width) focus-visible:ring-(--lsys-toast-focus-ring-color)",
    disabledStateClasses,
  ].join(" "),
)

export const toastCloseVariants = cva(
  [
    "absolute right-(--lsys-toast-close-inset) top-(--lsys-toast-close-inset) inline-flex size-(--lsys-toast-close-size) items-center justify-center rounded-(--lsys-toast-close-radius)",
    "text-(--lsys-toast-close-foreground) outline-none transition-colors duration-(--lsys-toast-transition-duration) ease-(--lsys-toast-transition-easing) hover:bg-(--lsys-toast-close-hover-background) focus-visible:ring-(length:--lsys-toast-focus-ring-width) focus-visible:ring-(--lsys-toast-focus-ring-color)",
    disabledStateClasses,
  ].join(" "),
)
