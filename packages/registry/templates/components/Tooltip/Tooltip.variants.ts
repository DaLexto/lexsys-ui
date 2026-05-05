/**
 * Tooltip.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const tooltipTriggerVariants = cva("inline-flex")

export const tooltipPositionerVariants = cva("z-50")

export const tooltipPopupVariants = cva(
  [
    "rounded-[var(--nx-radius-control)] border border-nx-border bg-nx-foreground px-2.5 py-1.5 text-nx-background shadow-md",
    "text-[length:var(--nx-typography-label-xs-font-size)] font-[var(--nx-typography-label-xs-font-weight)] leading-[var(--nx-typography-label-xs-line-height)]",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-[var(--nx-duration-control)] ease-[var(--nx-easing-standard)]",
  ].join(" "),
)

export const tooltipArrowVariants = cva("fill-nx-foreground")
