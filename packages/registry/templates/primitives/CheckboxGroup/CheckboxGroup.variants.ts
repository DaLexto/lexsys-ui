/**
 * CheckboxGroup.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const checkboxGroupVariants = cva(
  [
    "grid gap-(--nx-checkbox-label-gap) text-(length:--nx-checkbox-label-font-size) font-(--nx-checkbox-label-font-weight) leading-(--nx-checkbox-label-font-line-height) text-(--nx-checkbox-label-foreground)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      orientation: {
        horizontal: "grid-flow-col justify-start",
        vertical: "grid-flow-row",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
)
