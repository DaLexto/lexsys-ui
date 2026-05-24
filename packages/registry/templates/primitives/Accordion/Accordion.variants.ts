/**
 * Accordion.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const accordionVariants = cva(
  "grid overflow-hidden rounded-(--lsys-accordion-radius) border border-(--lsys-accordion-border-color) bg-(--lsys-accordion-background) text-(--lsys-accordion-foreground)",
)

export const accordionItemVariants = cva(
  "border-b border-(--lsys-accordion-item-border-color) last:border-b-0",
)

export const accordionHeaderVariants = cva("flex")

export const accordionTriggerVariants = cva(
  [
    "flex w-full items-center justify-between px-(--lsys-accordion-trigger-padding-x) py-(--lsys-accordion-trigger-padding-y) text-left",
    "text-(length:--lsys-accordion-trigger-font-size) font-(--lsys-accordion-trigger-font-weight) leading-(--lsys-accordion-trigger-font-line-height) text-(--lsys-accordion-foreground)",
    "transition-colors duration-(--lsys-accordion-transition-duration) ease-(--lsys-accordion-transition-easing)",
    "outline-none hover:bg-(--lsys-accordion-trigger-background-hover) focus-visible:ring-(length:--lsys-accordion-focus-ring-width) focus-visible:ring-inset focus-visible:ring-(--lsys-accordion-focus-ring-color)",
    disabledStateClasses,
  ].join(" "),
)

export const accordionPanelVariants = cva(
  "px-(--lsys-accordion-panel-padding-x) pb-(--lsys-accordion-panel-padding-bottom) text-(length:--lsys-accordion-panel-font-size) leading-(--lsys-accordion-panel-font-line-height) text-(--lsys-accordion-panel-foreground)",
)
