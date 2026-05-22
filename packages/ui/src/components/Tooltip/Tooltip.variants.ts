/**
 * Tooltip.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const tooltipTriggerVariants = cva("inline-flex")

export const tooltipPositionerVariants = cva(
  "z-(--nx-tooltip-positioner-z-index)",
)

export const tooltipPopupVariants = cva(
  [
    "rounded-(--nx-tooltip-radius) border border-(--nx-tooltip-border-color) bg-(--nx-tooltip-background) px-(--nx-tooltip-padding-x) py-(--nx-tooltip-padding-y) text-(--nx-tooltip-foreground) shadow-(--nx-tooltip-shadow)",
    "text-(length:--nx-tooltip-font-size) font-(--nx-tooltip-font-weight) leading-(--nx-tooltip-font-line-height)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-(--nx-tooltip-transition-duration) ease-(--nx-tooltip-transition-easing)",
  ].join(" "),
)

export const tooltipArrowVariants = cva("fill-(--nx-tooltip-background)")
