/**
 * Toast.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const toastViewportVariants = cva(
  [
    "fixed z-[var(--nx-toast-viewport-z-index)] flex max-h-dvh w-[min(calc(100vw-2rem),var(--nx-toast-viewport-width))] flex-col gap-[var(--nx-toast-viewport-gap)] p-[var(--nx-toast-viewport-padding)]",
    "data-[expanded]:gap-[var(--nx-toast-viewport-gap-expanded)]",
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

export const toastVariants = cva(
  [
    "relative grid gap-[var(--nx-toast-gap)] rounded-[var(--nx-toast-radius)] border bg-[var(--nx-toast-background)] p-[var(--nx-toast-padding)] pr-[var(--nx-toast-padding-end)] text-[var(--nx-toast-foreground)] shadow-[var(--nx-toast-shadow)] outline-none",
    "transition-[opacity,transform] duration-[var(--nx-toast-transition-duration)] ease-[var(--nx-toast-transition-easing)]",
    "data-[starting-style]:translate-y-2 data-[starting-style]:opacity-0 data-[ending-style]:translate-y-2 data-[ending-style]:opacity-0 data-[swiping]:transition-none",
    "translate-x-[var(--toast-swipe-movement-x,0px)] translate-y-[var(--toast-swipe-movement-y,0px)]",
    "border-[var(--nx-toast-border-color)] data-[type=success]:border-[var(--nx-toast-success-border-color)] data-[type=destructive]:border-[var(--nx-toast-destructive-border-color)]",
  ].join(" "),
)

export const toastContentVariants = cva(
  "grid gap-[var(--nx-toast-content-gap)] data-[behind]:opacity-[var(--nx-toast-content-behind-opacity)]",
)

export const toastPositionerVariants = cva(
  "z-[var(--nx-toast-viewport-z-index)] max-w-[min(var(--available-width,calc(100vw-2rem)),var(--nx-toast-viewport-width))]",
)

export const toastArrowVariants = cva(
  "size-[var(--nx-toast-arrow-size)] rotate-45 border border-[var(--nx-toast-border-color)] bg-[var(--nx-toast-background)]",
)

export const toastTitleVariants = cva(
  "text-[length:var(--nx-toast-title-font-size)] font-[var(--nx-toast-title-font-weight)] leading-[var(--nx-toast-title-font-line-height)] text-[var(--nx-toast-title-foreground)]",
)

export const toastDescriptionVariants = cva(
  "text-[length:var(--nx-toast-description-font-size)] font-[var(--nx-toast-description-font-weight)] leading-[var(--nx-toast-description-font-line-height)] text-[var(--nx-toast-description-foreground)]",
)

export const toastActionVariants = cva(
  [
    "inline-flex h-[var(--nx-toast-action-height)] items-center justify-center rounded-[var(--nx-toast-action-radius)] border border-[var(--nx-toast-action-border-color)] px-[var(--nx-toast-action-padding-x)]",
    "text-[length:var(--nx-toast-action-font-size)] font-[var(--nx-toast-action-font-weight)] leading-[var(--nx-toast-action-font-line-height)] text-[var(--nx-toast-action-foreground)]",
    "outline-none transition-colors duration-[var(--nx-toast-transition-duration)] ease-[var(--nx-toast-transition-easing)] hover:bg-[var(--nx-toast-action-hover-background)] focus-visible:ring-[length:var(--nx-toast-focus-ring-width)] focus-visible:ring-[var(--nx-toast-focus-ring-color)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
)

export const toastCloseVariants = cva(
  [
    "absolute right-[var(--nx-toast-close-inset)] top-[var(--nx-toast-close-inset)] inline-flex size-[var(--nx-toast-close-size)] items-center justify-center rounded-[var(--nx-toast-close-radius)]",
    "text-[var(--nx-toast-close-foreground)] outline-none transition-colors duration-[var(--nx-toast-transition-duration)] ease-[var(--nx-toast-transition-easing)] hover:bg-[var(--nx-toast-close-hover-background)] focus-visible:ring-[length:var(--nx-toast-focus-ring-width)] focus-visible:ring-[var(--nx-toast-focus-ring-color)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
)
