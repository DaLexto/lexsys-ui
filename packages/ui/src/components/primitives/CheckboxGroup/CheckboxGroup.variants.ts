/**
 * CheckboxGroup.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const checkboxGroupVariants = cva(
  [
    "grid gap-(--lsys-checkbox-label-gap) text-(length:--lsys-checkbox-label-font-size) font-(--lsys-checkbox-label-font-weight) leading-(--lsys-checkbox-label-font-line-height) text-(--lsys-checkbox-label-foreground)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lsys-opacity-disabled)",
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
