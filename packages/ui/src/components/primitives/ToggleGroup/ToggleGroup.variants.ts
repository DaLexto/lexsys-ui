/**
 * ToggleGroup.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const toggleGroupVariants = cva(
  [
    "inline-flex rounded-(--lsys-toggle-group-radius) border border-(--lsys-toggle-group-border-color)",
    "bg-(--lsys-toggle-group-background) p-(--lsys-toggle-group-padding)",
    "[&_[data-toggle]]:border-0 [&_[data-toggle]]:shadow-none",
  ].join(" "),
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      size: {
        sm: "gap-(--lsys-toggle-group-gap-sm)",
        md: "gap-(--lsys-toggle-group-gap-md)",
        lg: "gap-(--lsys-toggle-group-gap-lg)",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
    },
  },
)
