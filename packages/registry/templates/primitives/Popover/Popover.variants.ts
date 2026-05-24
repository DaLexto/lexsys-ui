/**
 * Popover.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const popoverTriggerVariants = cva(
  [
    "inline-flex h-(--lsys-popover-trigger-height) items-center justify-center rounded-(--lsys-popover-trigger-radius)",
    "border border-(--lsys-popover-trigger-border-color) bg-(--lsys-popover-trigger-background) px-(--lsys-popover-trigger-padding-x) text-(--lsys-popover-trigger-foreground)",
    "text-(length:--lsys-popover-trigger-font-size) font-(--lsys-popover-trigger-font-weight) leading-(--lsys-popover-trigger-font-line-height)",
    "transition-colors duration-(--lsys-popover-transition-duration) ease-(--lsys-popover-transition-easing)",
    "outline-none hover:bg-(--lsys-popover-trigger-hover-background) focus-visible:ring-(length:--lsys-popover-focus-ring-width) focus-visible:ring-(--lsys-popover-focus-ring-color) focus-visible:ring-offset-(length:--lsys-popover-focus-ring-offset) focus-visible:ring-offset-(--lsys-popover-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const popoverBackdropVariants = cva(
  [
    "fixed inset-0 z-(--lsys-popover-backdrop-z-index) bg-(--lsys-popover-backdrop-background) opacity-(--lsys-popover-backdrop-opacity)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-(--lsys-popover-transition-duration) ease-(--lsys-popover-transition-easing)",
  ].join(" "),
)

export const popoverPositionerVariants = cva(
  "z-(--lsys-popover-positioner-z-index) outline-none data-[anchor-hidden]:hidden",
)

export const popoverPopupVariants = cva(
  [
    "grid w-[min(calc(100vw-(var(--lsys-popover-popup-inset)*2)),var(--lsys-popover-popup-max-width))] gap-(--lsys-popover-popup-gap) rounded-(--lsys-popover-popup-radius) border",
    "border-(--lsys-popover-popup-border-color) bg-(--lsys-popover-popup-background) p-(--lsys-popover-popup-padding) text-(--lsys-popover-popup-foreground) shadow-(--lsys-popover-popup-shadow)",
    "outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "transition-[opacity,transform] duration-(--lsys-popover-transition-duration) ease-(--lsys-popover-transition-easing)",
  ].join(" "),
)

export const popoverArrowVariants = cva(
  [
    "size-(--lsys-popover-arrow-size) rotate-45 border border-(--lsys-popover-popup-border-color) bg-(--lsys-popover-popup-background)",
    "data-[side=bottom]:-translate-y-1/2 data-[side=left]:translate-x-1/2 data-[side=right]:-translate-x-1/2 data-[side=top]:translate-y-1/2",
  ].join(" "),
)

export const popoverTitleVariants = cva(
  "pr-(--lsys-popover-title-padding-end) text-(length:--lsys-popover-title-font-size) font-(--lsys-popover-title-font-weight) leading-(--lsys-popover-title-font-line-height) text-(--lsys-popover-title-foreground)",
)

export const popoverDescriptionVariants = cva(
  "text-(length:--lsys-popover-description-font-size) font-(--lsys-popover-description-font-weight) leading-(--lsys-popover-description-font-line-height) text-(--lsys-popover-description-foreground)",
)

export const popoverCloseVariants = cva(
  [
    "absolute right-(--lsys-popover-close-inset) top-(--lsys-popover-close-inset) inline-flex size-(--lsys-popover-close-size) items-center justify-center rounded-(--lsys-popover-close-radius)",
    "text-(--lsys-popover-close-foreground) outline-none transition-colors duration-(--lsys-popover-transition-duration) ease-(--lsys-popover-transition-easing)",
    "hover:bg-(--lsys-popover-close-hover-background) focus-visible:ring-(length:--lsys-popover-focus-ring-width) focus-visible:ring-(--lsys-popover-focus-ring-color) focus-visible:ring-offset-(length:--lsys-popover-focus-ring-offset) focus-visible:ring-offset-(--lsys-popover-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const popoverViewportVariants = cva(
  "grid gap-(--lsys-popover-popup-gap)",
)
