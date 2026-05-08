/**
 * Collapsible.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const collapsibleVariants = cva(
  "grid rounded-[var(--nx-collapsible-radius)] text-[var(--nx-collapsible-foreground)]",
  {
    variants: {
      variant: {
        surface:
          "border border-[var(--nx-collapsible-border-color)] bg-[var(--nx-collapsible-background)]",
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
    "flex w-full items-center justify-between gap-[var(--nx-collapsible-trigger-gap)] px-[var(--nx-collapsible-trigger-padding-x)] py-[var(--nx-collapsible-trigger-padding-y)] text-left",
    "text-[length:var(--nx-collapsible-trigger-font-size)] font-[var(--nx-collapsible-trigger-font-weight)] leading-[var(--nx-collapsible-trigger-font-line-height)]",
    "transition-colors duration-[var(--nx-collapsible-transition-duration)] ease-[var(--nx-collapsible-transition-easing)]",
    "outline-none hover:bg-[var(--nx-collapsible-trigger-background-hover)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--nx-collapsible-focus-ring-color)]",
    "disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-[var(--nx-collapsible-trigger-icon-size)] [&>svg]:transition-transform data-[panel-open]:[&>svg]:rotate-45",
  ].join(" "),
)

export const collapsiblePanelVariants = cva(
  [
    "overflow-hidden px-[var(--nx-collapsible-panel-padding-x)] pb-[var(--nx-collapsible-panel-padding-bottom)]",
    "text-[length:var(--nx-collapsible-panel-font-size)] leading-[var(--nx-collapsible-panel-font-line-height)] text-[var(--nx-collapsible-panel-foreground)]",
    "transition-[height,opacity] duration-[var(--nx-collapsible-transition-duration)] ease-[var(--nx-collapsible-transition-easing)]",
    "data-[starting-style]:h-0 data-[starting-style]:opacity-0 data-[ending-style]:h-0 data-[ending-style]:opacity-0",
  ].join(" "),
)
