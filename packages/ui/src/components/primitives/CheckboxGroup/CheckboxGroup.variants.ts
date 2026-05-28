/**
 * CheckboxGroup.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const checkboxGroupVariants = cva(
  [
    "grid gap-(--lex-checkbox-label-gap) text-(length:--lex-checkbox-label-font-size) font-(--lex-checkbox-label-font-weight) leading-(--lex-checkbox-label-font-line-height) text-(--lex-checkbox-label-foreground)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lex-opacity-disabled)",
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
