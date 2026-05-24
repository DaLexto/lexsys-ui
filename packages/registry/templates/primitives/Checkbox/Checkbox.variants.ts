/**
 * Checkbox.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const checkboxVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center rounded-(--lsys-checkbox-radius) border",
    "border-(--lsys-checkbox-border-color) bg-(--lsys-checkbox-background) text-(--lsys-checkbox-foreground)",
    "transition-colors duration-(--lsys-checkbox-transition-duration) ease-(--lsys-checkbox-transition-easing)",
    "outline-none data-[checked]:border-(--lsys-checkbox-checked-border-color) data-[checked]:bg-(--lsys-checkbox-checked-background) data-[checked]:text-(--lsys-checkbox-checked-foreground)",
    "data-[indeterminate]:border-(--lsys-checkbox-checked-border-color) data-[indeterminate]:bg-(--lsys-checkbox-checked-background)",
    "data-[focused]:ring-(length:--lsys-checkbox-focus-ring-width) data-[focused]:ring-(--lsys-checkbox-focus-ring-color) data-[focused]:ring-offset-(length:--lsys-checkbox-focus-ring-offset) data-[focused]:ring-offset-(--lsys-checkbox-focus-ring-offset-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-(--lsys-checkbox-size-sm) text-(length:--lsys-checkbox-indicator-font-size-sm)",
        md: "size-(--lsys-checkbox-size-md) text-(length:--lsys-checkbox-indicator-font-size-md)",
        lg: "size-(--lsys-checkbox-size-lg) text-(length:--lsys-checkbox-indicator-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const checkboxLabelVariants = cva(
  "inline-flex items-center gap-(--lsys-checkbox-label-gap) text-(length:--lsys-checkbox-label-font-size) font-(--lsys-checkbox-label-font-weight) leading-(--lsys-checkbox-label-font-line-height) text-(--lsys-checkbox-label-foreground)",
)

export const checkboxIndicatorVariants = cva(
  "leading-(--lsys-checkbox-label-font-line-height)",
)
