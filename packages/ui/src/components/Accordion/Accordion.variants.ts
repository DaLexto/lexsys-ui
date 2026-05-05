/**
 * Accordion.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const accordionVariants = cva(
  "grid overflow-hidden rounded-[var(--nx-radius-surface)] border border-nx-border bg-nx-surface",
)

export const accordionItemVariants = cva(
  "border-b border-nx-border last:border-b-0",
)

export const accordionHeaderVariants = cva("flex")

export const accordionTriggerVariants = cva(
  [
    "flex w-full items-center justify-between px-4 py-3 text-left",
    "text-[length:var(--nx-typography-label-sm-font-size)] font-[var(--nx-typography-label-sm-font-weight)] leading-[var(--nx-typography-label-sm-line-height)] text-nx-foreground",
    "transition-colors duration-[var(--nx-duration-control)] ease-[var(--nx-easing-standard)]",
    "outline-none hover:bg-nx-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-nx-ring",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
)

export const accordionPanelVariants = cva(
  "px-4 pb-4 text-[length:var(--nx-typography-body-sm-font-size)] leading-[var(--nx-typography-body-sm-line-height)] text-nx-muted-foreground",
)
