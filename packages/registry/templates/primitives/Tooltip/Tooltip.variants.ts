/**
 * Tooltip.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const tooltipTriggerVariants = cva("inline-flex")

export const tooltipPositionerVariants = cva(
  "z-(--lsys-tooltip-positioner-z-index)",
)

export const tooltipPopupVariants = cva(
  [
    "rounded-(--lsys-tooltip-radius) border border-(--lsys-tooltip-border-color) bg-(--lsys-tooltip-background) px-(--lsys-tooltip-padding-x) py-(--lsys-tooltip-padding-y) text-(--lsys-tooltip-foreground) shadow-(--lsys-tooltip-shadow)",
    "text-(length:--lsys-tooltip-font-size) font-(--lsys-tooltip-font-weight) leading-(--lsys-tooltip-font-line-height)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-(--lsys-tooltip-transition-duration) ease-(--lsys-tooltip-transition-easing)",
  ].join(" "),
)

export const tooltipArrowVariants = cva("fill-(--lsys-tooltip-background)")
