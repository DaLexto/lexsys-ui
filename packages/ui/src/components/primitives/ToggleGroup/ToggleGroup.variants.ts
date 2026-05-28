/**
 * ToggleGroup.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const toggleGroupVariants = cva(
  [
    "inline-flex rounded-(--lex-toggle-group-radius) border border-(--lex-toggle-group-border-color)",
    "bg-(--lex-toggle-group-background) p-(--lex-toggle-group-padding)",
    "[&_[data-toggle]]:border-0 [&_[data-toggle]]:shadow-none",
  ].join(" "),
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      size: {
        sm: "gap-(--lex-toggle-group-gap-sm)",
        md: "gap-(--lex-toggle-group-gap-md)",
        lg: "gap-(--lex-toggle-group-gap-lg)",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
    },
  },
)
