/**
 * Fieldset.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const fieldsetVariants = cva(
  [
    "m-0 grid min-w-0 gap-(--nx-fieldset-gap) rounded-(--nx-fieldset-radius)",
    "border border-(--nx-fieldset-border-color) p-(--nx-fieldset-padding)",
    "bg-(--nx-fieldset-background) text-(--nx-fieldset-foreground)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      variant: {
        surface: "",
        plain:
          "border-transparent bg-transparent p-0 shadow-none data-[disabled]:opacity-(--nx-opacity-disabled)",
      },
    },
    defaultVariants: {
      variant: "surface",
    },
  },
)

export const fieldsetLegendVariants = cva(
  [
    "mb-(--nx-fieldset-legend-margin-bottom) text-(length:--nx-fieldset-legend-font-size)",
    "font-(--nx-fieldset-legend-font-weight) leading-(--nx-fieldset-legend-font-line-height)",
    "tracking-(--nx-fieldset-legend-font-letter-spacing) text-(--nx-fieldset-legend-foreground)",
    "data-[disabled]:cursor-not-allowed",
  ].join(" "),
)
