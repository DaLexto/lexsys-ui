/**
 * Accordion.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../utils/cn"

export const accordionVariants = cva(
  "grid overflow-hidden rounded-(--nx-accordion-radius) border border-(--nx-accordion-border-color) bg-(--nx-accordion-background) text-(--nx-accordion-foreground)",
)

export const accordionItemVariants = cva(
  "border-b border-(--nx-accordion-item-border-color) last:border-b-0",
)

export const accordionHeaderVariants = cva("flex")

export const accordionTriggerVariants = cva(
  [
    "flex w-full items-center justify-between px-(--nx-accordion-trigger-padding-x) py-(--nx-accordion-trigger-padding-y) text-left",
    "text-(length:--nx-accordion-trigger-font-size) font-(--nx-accordion-trigger-font-weight) leading-(--nx-accordion-trigger-font-line-height) text-(--nx-accordion-foreground)",
    "transition-colors duration-(--nx-accordion-transition-duration) ease-(--nx-accordion-transition-easing)",
    "outline-none hover:bg-(--nx-accordion-trigger-background-hover) focus-visible:ring-(length:--nx-accordion-focus-ring-width) focus-visible:ring-inset focus-visible:ring-(--nx-accordion-focus-ring-color)",
    disabledStateClasses,
  ].join(" "),
)

export const accordionPanelVariants = cva(
  "px-(--nx-accordion-panel-padding-x) pb-(--nx-accordion-panel-padding-bottom) text-(length:--nx-accordion-panel-font-size) leading-(--nx-accordion-panel-font-line-height) text-(--nx-accordion-panel-foreground)",
)
