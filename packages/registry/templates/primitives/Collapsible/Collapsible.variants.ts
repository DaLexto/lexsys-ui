/**
 * Collapsible.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const collapsibleVariants = cva(
  "grid rounded-(--lex-collapsible-radius) text-(--lex-collapsible-foreground)",
  {
    variants: {
      variant: {
        surface:
          "border border-(--lex-collapsible-border-color) bg-(--lex-collapsible-background)",
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
    "flex w-full items-center justify-between gap-(--lex-collapsible-trigger-gap) px-(--lex-collapsible-trigger-padding-x) py-(--lex-collapsible-trigger-padding-y) text-left",
    "text-(length:--lex-collapsible-trigger-font-size) font-(--lex-collapsible-trigger-font-weight) leading-(--lex-collapsible-trigger-font-line-height)",
    "transition-colors duration-(--lex-collapsible-transition-duration) ease-(--lex-collapsible-transition-easing)",
    "outline-none hover:bg-(--lex-collapsible-trigger-background-hover) focus-visible:ring-(length:--lex-collapsible-focus-ring-width) focus-visible:ring-inset focus-visible:ring-(--lex-collapsible-focus-ring-color)",
    disabledStateClasses,
    "[&>svg]:size-(--lex-collapsible-trigger-icon-size) [&>svg]:transition-transform data-[panel-open]:[&>svg]:rotate-45",
  ].join(" "),
)

export const collapsiblePanelVariants = cva(
  [
    "overflow-hidden px-(--lex-collapsible-panel-padding-x) pb-(--lex-collapsible-panel-padding-bottom)",
    "text-(length:--lex-collapsible-panel-font-size) leading-(--lex-collapsible-panel-font-line-height) text-(--lex-collapsible-panel-foreground)",
    "transition-[height,opacity] duration-(--lex-collapsible-transition-duration) ease-(--lex-collapsible-transition-easing)",
    "data-[starting-style]:h-0 data-[starting-style]:opacity-0 data-[ending-style]:h-0 data-[ending-style]:opacity-0",
  ].join(" "),
)
