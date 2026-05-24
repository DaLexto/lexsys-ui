/**
 * Collapsible.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const collapsibleVariants = cva(
  "grid rounded-(--lsys-collapsible-radius) text-(--lsys-collapsible-foreground)",
  {
    variants: {
      variant: {
        surface:
          "border border-(--lsys-collapsible-border-color) bg-(--lsys-collapsible-background)",
        plain: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "surface",
    },
  },
)

export const collapsibleTriggerVariants = cva(
  [
    "flex w-full items-center justify-between gap-(--lsys-collapsible-trigger-gap) px-(--lsys-collapsible-trigger-padding-x) py-(--lsys-collapsible-trigger-padding-y) text-left",
    "text-(length:--lsys-collapsible-trigger-font-size) font-(--lsys-collapsible-trigger-font-weight) leading-(--lsys-collapsible-trigger-font-line-height)",
    "transition-colors duration-(--lsys-collapsible-transition-duration) ease-(--lsys-collapsible-transition-easing)",
    "outline-none hover:bg-(--lsys-collapsible-trigger-background-hover) focus-visible:ring-(length:--lsys-collapsible-focus-ring-width) focus-visible:ring-inset focus-visible:ring-(--lsys-collapsible-focus-ring-color)",
    disabledStateClasses,
    "[&>svg]:size-(--lsys-collapsible-trigger-icon-size) [&>svg]:transition-transform data-[panel-open]:[&>svg]:rotate-45",
  ].join(" "),
)

export const collapsiblePanelVariants = cva(
  [
    "overflow-hidden px-(--lsys-collapsible-panel-padding-x) pb-(--lsys-collapsible-panel-padding-bottom)",
    "text-(length:--lsys-collapsible-panel-font-size) leading-(--lsys-collapsible-panel-font-line-height) text-(--lsys-collapsible-panel-foreground)",
    "transition-[height,opacity] duration-(--lsys-collapsible-transition-duration) ease-(--lsys-collapsible-transition-easing)",
    "data-[starting-style]:h-0 data-[starting-style]:opacity-0 data-[ending-style]:h-0 data-[ending-style]:opacity-0",
  ].join(" "),
)
