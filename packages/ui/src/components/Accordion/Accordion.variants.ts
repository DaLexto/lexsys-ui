/**
 * Accordion.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const accordionVariants = cva(
  "grid overflow-hidden rounded-[var(--nx-accordion-radius)] border border-[var(--nx-accordion-border-color)] bg-[var(--nx-accordion-background)] text-[var(--nx-accordion-foreground)]",
)

export const accordionItemVariants = cva(
  "border-b border-[var(--nx-accordion-item-border-color)] last:border-b-0",
)

export const accordionHeaderVariants = cva("flex")

export const accordionTriggerVariants = cva(
  [
    "flex w-full items-center justify-between px-[var(--nx-accordion-trigger-padding-x)] py-[var(--nx-accordion-trigger-padding-y)] text-left",
    "text-[length:var(--nx-accordion-trigger-font-size)] font-[var(--nx-accordion-trigger-font-weight)] leading-[var(--nx-accordion-trigger-font-line-height)] text-[var(--nx-accordion-foreground)]",
    "transition-colors duration-[var(--nx-accordion-transition-duration)] ease-[var(--nx-accordion-transition-easing)]",
    "outline-none hover:bg-[var(--nx-accordion-trigger-background-hover)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--nx-accordion-focus-ring-color)]",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
)

export const accordionPanelVariants = cva(
  "px-[var(--nx-accordion-panel-padding-x)] pb-[var(--nx-accordion-panel-padding-bottom)] text-[length:var(--nx-accordion-panel-font-size)] leading-[var(--nx-accordion-panel-font-line-height)] text-[var(--nx-accordion-panel-foreground)]",
)
