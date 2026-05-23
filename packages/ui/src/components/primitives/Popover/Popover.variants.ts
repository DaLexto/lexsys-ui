/**
 * Popover.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const popoverTriggerVariants = cva(
  [
    "inline-flex h-(--nx-popover-trigger-height) items-center justify-center rounded-(--nx-popover-trigger-radius)",
    "border border-(--nx-popover-trigger-border-color) bg-(--nx-popover-trigger-background) px-(--nx-popover-trigger-padding-x) text-(--nx-popover-trigger-foreground)",
    "text-(length:--nx-popover-trigger-font-size) font-(--nx-popover-trigger-font-weight) leading-(--nx-popover-trigger-font-line-height)",
    "transition-colors duration-(--nx-popover-transition-duration) ease-(--nx-popover-transition-easing)",
    "outline-none hover:bg-(--nx-popover-trigger-hover-background) focus-visible:ring-(length:--nx-popover-focus-ring-width) focus-visible:ring-(--nx-popover-focus-ring-color) focus-visible:ring-offset-(length:--nx-popover-focus-ring-offset) focus-visible:ring-offset-(--nx-popover-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const popoverBackdropVariants = cva(
  [
    "fixed inset-0 z-(--nx-popover-backdrop-z-index) bg-(--nx-popover-backdrop-background) opacity-(--nx-popover-backdrop-opacity)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-(--nx-popover-transition-duration) ease-(--nx-popover-transition-easing)",
  ].join(" "),
)

export const popoverPositionerVariants = cva(
  "z-(--nx-popover-positioner-z-index) outline-none data-[anchor-hidden]:hidden",
)

export const popoverPopupVariants = cva(
  [
    "grid w-[min(calc(100vw-(var(--nx-popover-popup-inset)*2)),var(--nx-popover-popup-max-width))] gap-(--nx-popover-popup-gap) rounded-(--nx-popover-popup-radius) border",
    "border-(--nx-popover-popup-border-color) bg-(--nx-popover-popup-background) p-(--nx-popover-popup-padding) text-(--nx-popover-popup-foreground) shadow-(--nx-popover-popup-shadow)",
    "outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "transition-[opacity,transform] duration-(--nx-popover-transition-duration) ease-(--nx-popover-transition-easing)",
  ].join(" "),
)

export const popoverArrowVariants = cva(
  [
    "size-(--nx-popover-arrow-size) rotate-45 border border-(--nx-popover-popup-border-color) bg-(--nx-popover-popup-background)",
    "data-[side=bottom]:-translate-y-1/2 data-[side=left]:translate-x-1/2 data-[side=right]:-translate-x-1/2 data-[side=top]:translate-y-1/2",
  ].join(" "),
)

export const popoverTitleVariants = cva(
  "pr-(--nx-popover-title-padding-end) text-(length:--nx-popover-title-font-size) font-(--nx-popover-title-font-weight) leading-(--nx-popover-title-font-line-height) text-(--nx-popover-title-foreground)",
)

export const popoverDescriptionVariants = cva(
  "text-(length:--nx-popover-description-font-size) font-(--nx-popover-description-font-weight) leading-(--nx-popover-description-font-line-height) text-(--nx-popover-description-foreground)",
)

export const popoverCloseVariants = cva(
  [
    "absolute right-(--nx-popover-close-inset) top-(--nx-popover-close-inset) inline-flex size-(--nx-popover-close-size) items-center justify-center rounded-(--nx-popover-close-radius)",
    "text-(--nx-popover-close-foreground) outline-none transition-colors duration-(--nx-popover-transition-duration) ease-(--nx-popover-transition-easing)",
    "hover:bg-(--nx-popover-close-hover-background) focus-visible:ring-(length:--nx-popover-focus-ring-width) focus-visible:ring-(--nx-popover-focus-ring-color) focus-visible:ring-offset-(length:--nx-popover-focus-ring-offset) focus-visible:ring-offset-(--nx-popover-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const popoverViewportVariants = cva("grid gap-(--nx-popover-popup-gap)")
