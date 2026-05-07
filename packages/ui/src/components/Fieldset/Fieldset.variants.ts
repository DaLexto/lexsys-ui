/**
 * Fieldset.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const fieldsetVariants = cva(
  [
    "m-0 grid min-w-0 gap-[var(--nx-fieldset-gap)] rounded-[var(--nx-fieldset-radius)]",
    "border border-[var(--nx-fieldset-border-color)] p-[var(--nx-fieldset-padding)]",
    "bg-[var(--nx-fieldset-background)] text-[var(--nx-fieldset-foreground)]",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60",
  ].join(" "),
  {
    variants: {
      variant: {
        surface: "",
        plain:
          "border-transparent bg-transparent p-0 shadow-none data-[disabled]:opacity-60",
      },
    },
    defaultVariants: {
      variant: "surface",
    },
  },
)

export const fieldsetLegendVariants = cva(
  [
    "mb-[var(--nx-fieldset-legend-margin-bottom)] text-[length:var(--nx-fieldset-legend-font-size)]",
    "font-[var(--nx-fieldset-legend-font-weight)] leading-[var(--nx-fieldset-legend-font-line-height)]",
    "tracking-[var(--nx-fieldset-legend-font-letter-spacing)] text-[var(--nx-fieldset-legend-foreground)]",
    "data-[disabled]:cursor-not-allowed",
  ].join(" "),
)
