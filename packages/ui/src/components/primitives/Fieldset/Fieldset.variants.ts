/**
 * Fieldset.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const fieldsetVariants = cva(
  [
    "m-0 grid min-w-0 gap-(--lsys-fieldset-gap) rounded-(--lsys-fieldset-radius)",
    "border border-(--lsys-fieldset-border-color) p-(--lsys-fieldset-padding)",
    "bg-(--lsys-fieldset-background) text-(--lsys-fieldset-foreground)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      variant: {
        surface: "",
        plain:
          "border-transparent bg-transparent p-0 shadow-none data-[disabled]:opacity-(--lsys-opacity-disabled)",
      },
    },
    defaultVariants: {
      variant: "surface",
    },
  },
)

export const fieldsetLegendVariants = cva(
  [
    "mb-(--lsys-fieldset-legend-margin-bottom) text-(length:--lsys-fieldset-legend-font-size)",
    "font-(--lsys-fieldset-legend-font-weight) leading-(--lsys-fieldset-legend-font-line-height)",
    "tracking-(--lsys-fieldset-legend-font-letter-spacing) text-(--lsys-fieldset-legend-foreground)",
    "data-[disabled]:cursor-not-allowed",
  ].join(" "),
)
