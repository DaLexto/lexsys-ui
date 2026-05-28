/**
 * Tooltip.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const tooltipTriggerVariants = cva("inline-flex")

export const tooltipPositionerVariants = cva(
  "z-(--lex-tooltip-positioner-z-index)",
)

export const tooltipPopupVariants = cva(
  [
    "rounded-(--lex-tooltip-radius) border border-(--lex-tooltip-border-color) bg-(--lex-tooltip-background) px-(--lex-tooltip-padding-x) py-(--lex-tooltip-padding-y) text-(--lex-tooltip-foreground) shadow-(--lex-tooltip-shadow)",
    "text-(length:--lex-tooltip-font-size) font-(--lex-tooltip-font-weight) leading-(--lex-tooltip-font-line-height)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-(--lex-tooltip-transition-duration) ease-(--lex-tooltip-transition-easing)",
  ].join(" "),
)

export const tooltipArrowVariants = cva("fill-(--lex-tooltip-background)")
