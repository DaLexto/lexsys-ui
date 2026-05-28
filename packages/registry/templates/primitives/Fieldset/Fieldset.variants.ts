/**
 * Fieldset.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const fieldsetVariants = cva(
  [
    "m-0 grid min-w-0 gap-(--lex-fieldset-gap) rounded-(--lex-fieldset-radius)",
    "border border-(--lex-fieldset-border-color) p-(--lex-fieldset-padding)",
    "bg-(--lex-fieldset-background) text-(--lex-fieldset-foreground)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lex-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      variant: {
        surface: "",
        plain:
          "border-transparent bg-transparent p-0 shadow-none data-[disabled]:opacity-(--lex-opacity-disabled)",
      },
    },
    defaultVariants: {
      variant: "surface",
    },
  },
)

export const fieldsetLegendVariants = cva(
  [
    "mb-(--lex-fieldset-legend-margin-bottom) text-(length:--lex-fieldset-legend-font-size)",
    "font-(--lex-fieldset-legend-font-weight) leading-(--lex-fieldset-legend-font-line-height)",
    "tracking-(--lex-fieldset-legend-font-letter-spacing) text-(--lex-fieldset-legend-foreground)",
    "data-[disabled]:cursor-not-allowed",
  ].join(" "),
)
