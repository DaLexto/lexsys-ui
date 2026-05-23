/**
 * ToggleGroup.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const toggleGroupVariants = cva(
  [
    "inline-flex rounded-(--nx-toggle-group-radius) border border-(--nx-toggle-group-border-color)",
    "bg-(--nx-toggle-group-background) p-(--nx-toggle-group-padding)",
    "[&_[data-toggle]]:border-0 [&_[data-toggle]]:shadow-none",
  ].join(" "),
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      size: {
        sm: "gap-(--nx-toggle-group-gap-sm)",
        md: "gap-(--nx-toggle-group-gap-md)",
        lg: "gap-(--nx-toggle-group-gap-lg)",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
    },
  },
)
