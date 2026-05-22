/**
 * Collapsible.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const collapsibleVariants = cva(
  "grid rounded-(--nx-collapsible-radius) text-(--nx-collapsible-foreground)",
  {
    variants: {
      variant: {
        surface:
          "border border-(--nx-collapsible-border-color) bg-(--nx-collapsible-background)",
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
    "flex w-full items-center justify-between gap-(--nx-collapsible-trigger-gap) px-(--nx-collapsible-trigger-padding-x) py-(--nx-collapsible-trigger-padding-y) text-left",
    "text-(length:--nx-collapsible-trigger-font-size) font-(--nx-collapsible-trigger-font-weight) leading-(--nx-collapsible-trigger-font-line-height)",
    "transition-colors duration-(--nx-collapsible-transition-duration) ease-(--nx-collapsible-transition-easing)",
    "outline-none hover:bg-(--nx-collapsible-trigger-background-hover) focus-visible:ring-(length:--nx-collapsible-focus-ring-width) focus-visible:ring-inset focus-visible:ring-(--nx-collapsible-focus-ring-color)",
    "disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-(--nx-collapsible-trigger-icon-size) [&>svg]:transition-transform data-[panel-open]:[&>svg]:rotate-45",
  ].join(" "),
)

export const collapsiblePanelVariants = cva(
  [
    "overflow-hidden px-(--nx-collapsible-panel-padding-x) pb-(--nx-collapsible-panel-padding-bottom)",
    "text-(length:--nx-collapsible-panel-font-size) leading-(--nx-collapsible-panel-font-line-height) text-(--nx-collapsible-panel-foreground)",
    "transition-[height,opacity] duration-(--nx-collapsible-transition-duration) ease-(--nx-collapsible-transition-easing)",
    "data-[starting-style]:h-0 data-[starting-style]:opacity-0 data-[ending-style]:h-0 data-[ending-style]:opacity-0",
  ].join(" "),
)
