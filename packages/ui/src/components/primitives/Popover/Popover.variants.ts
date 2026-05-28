/**
 * Popover.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const popoverTriggerVariants = cva(
  [
    "inline-flex h-(--lex-popover-trigger-height) items-center justify-center rounded-(--lex-popover-trigger-radius)",
    "border border-(--lex-popover-trigger-border-color) bg-(--lex-popover-trigger-background) px-(--lex-popover-trigger-padding-x) text-(--lex-popover-trigger-foreground)",
    "text-(length:--lex-popover-trigger-font-size) font-(--lex-popover-trigger-font-weight) leading-(--lex-popover-trigger-font-line-height)",
    "transition-colors duration-(--lex-popover-transition-duration) ease-(--lex-popover-transition-easing)",
    "outline-none hover:bg-(--lex-popover-trigger-hover-background) focus-visible:ring-(length:--lex-popover-focus-ring-width) focus-visible:ring-(--lex-popover-focus-ring-color) focus-visible:ring-offset-(length:--lex-popover-focus-ring-offset) focus-visible:ring-offset-(--lex-popover-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const popoverBackdropVariants = cva(
  [
    "fixed inset-0 z-(--lex-popover-backdrop-z-index) bg-(--lex-popover-backdrop-background) opacity-(--lex-popover-backdrop-opacity)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-(--lex-popover-transition-duration) ease-(--lex-popover-transition-easing)",
  ].join(" "),
)

export const popoverPositionerVariants = cva(
  "z-(--lex-popover-positioner-z-index) outline-none data-[anchor-hidden]:hidden",
)

export const popoverPopupVariants = cva(
  [
    "grid w-[min(calc(100vw-(var(--lex-popover-popup-inset)*2)),var(--lex-popover-popup-max-width))] gap-(--lex-popover-popup-gap) rounded-(--lex-popover-popup-radius) border",
    "border-(--lex-popover-popup-border-color) bg-(--lex-popover-popup-background) p-(--lex-popover-popup-padding) text-(--lex-popover-popup-foreground) shadow-(--lex-popover-popup-shadow)",
    "outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "transition-[opacity,transform] duration-(--lex-popover-transition-duration) ease-(--lex-popover-transition-easing)",
  ].join(" "),
)

export const popoverArrowVariants = cva(
  [
    "size-(--lex-popover-arrow-size) rotate-45 border border-(--lex-popover-popup-border-color) bg-(--lex-popover-popup-background)",
    "data-[side=bottom]:-translate-y-1/2 data-[side=left]:translate-x-1/2 data-[side=right]:-translate-x-1/2 data-[side=top]:translate-y-1/2",
  ].join(" "),
)

export const popoverTitleVariants = cva(
  "pr-(--lex-popover-title-padding-end) text-(length:--lex-popover-title-font-size) font-(--lex-popover-title-font-weight) leading-(--lex-popover-title-font-line-height) text-(--lex-popover-title-foreground)",
)

export const popoverDescriptionVariants = cva(
  "text-(length:--lex-popover-description-font-size) font-(--lex-popover-description-font-weight) leading-(--lex-popover-description-font-line-height) text-(--lex-popover-description-foreground)",
)

export const popoverCloseVariants = cva(
  [
    "absolute right-(--lex-popover-close-inset) top-(--lex-popover-close-inset) inline-flex size-(--lex-popover-close-size) items-center justify-center rounded-(--lex-popover-close-radius)",
    "text-(--lex-popover-close-foreground) outline-none transition-colors duration-(--lex-popover-transition-duration) ease-(--lex-popover-transition-easing)",
    "hover:bg-(--lex-popover-close-hover-background) focus-visible:ring-(length:--lex-popover-focus-ring-width) focus-visible:ring-(--lex-popover-focus-ring-color) focus-visible:ring-offset-(length:--lex-popover-focus-ring-offset) focus-visible:ring-offset-(--lex-popover-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const popoverViewportVariants = cva("grid gap-(--lex-popover-popup-gap)")
