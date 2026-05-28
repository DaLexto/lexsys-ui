/**
 * Accordion.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const accordionVariants = cva(
  "grid overflow-hidden rounded-(--lex-accordion-radius) border border-(--lex-accordion-border-color) bg-(--lex-accordion-background) text-(--lex-accordion-foreground)",
)

export const accordionItemVariants = cva(
  "border-b border-(--lex-accordion-item-border-color) last:border-b-0",
)

export const accordionHeaderVariants = cva("flex")

export const accordionTriggerVariants = cva(
  [
    "flex w-full items-center justify-between px-(--lex-accordion-trigger-padding-x) py-(--lex-accordion-trigger-padding-y) text-left",
    "text-(length:--lex-accordion-trigger-font-size) font-(--lex-accordion-trigger-font-weight) leading-(--lex-accordion-trigger-font-line-height) text-(--lex-accordion-foreground)",
    "transition-colors duration-(--lex-accordion-transition-duration) ease-(--lex-accordion-transition-easing)",
    "outline-none hover:bg-(--lex-accordion-trigger-background-hover) focus-visible:ring-(length:--lex-accordion-focus-ring-width) focus-visible:ring-inset focus-visible:ring-(--lex-accordion-focus-ring-color)",
    disabledStateClasses,
  ].join(" "),
)

export const accordionPanelVariants = cva(
  "px-(--lex-accordion-panel-padding-x) pb-(--lex-accordion-panel-padding-bottom) text-(length:--lex-accordion-panel-font-size) leading-(--lex-accordion-panel-font-line-height) text-(--lex-accordion-panel-foreground)",
)
