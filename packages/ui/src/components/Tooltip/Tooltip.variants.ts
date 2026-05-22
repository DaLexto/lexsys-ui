/**
 * Tooltip.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const tooltipTriggerVariants = cva("inline-flex")

export const tooltipPositionerVariants = cva(
  "z-[var(--nx-tooltip-positioner-z-index)]",
)

export const tooltipPopupVariants = cva(
  [
    "rounded-[var(--nx-tooltip-radius)] border border-[var(--nx-tooltip-border-color)] bg-[var(--nx-tooltip-background)] px-[var(--nx-tooltip-padding-x)] py-[var(--nx-tooltip-padding-y)] text-[var(--nx-tooltip-foreground)] shadow-[var(--nx-tooltip-shadow)]",
    "text-[length:var(--nx-tooltip-font-size)] font-[var(--nx-tooltip-font-weight)] leading-[var(--nx-tooltip-font-line-height)]",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-[var(--nx-tooltip-transition-duration)] ease-[var(--nx-tooltip-transition-easing)]",
  ].join(" "),
)

export const tooltipArrowVariants = cva("fill-[var(--nx-tooltip-background)]")
