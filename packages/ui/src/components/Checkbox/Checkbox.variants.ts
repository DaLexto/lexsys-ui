/**
 * Checkbox.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const checkboxVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center rounded-(--nx-checkbox-radius) border",
    "border-(--nx-checkbox-border-color) bg-(--nx-checkbox-background) text-(--nx-checkbox-foreground)",
    "transition-colors duration-(--nx-checkbox-transition-duration) ease-(--nx-checkbox-transition-easing)",
    "outline-none data-[checked]:border-(--nx-checkbox-checked-border-color) data-[checked]:bg-(--nx-checkbox-checked-background) data-[checked]:text-(--nx-checkbox-checked-foreground)",
    "data-[indeterminate]:border-(--nx-checkbox-checked-border-color) data-[indeterminate]:bg-(--nx-checkbox-checked-background)",
    "data-[focused]:ring-(length:--nx-checkbox-focus-ring-width) data-[focused]:ring-(--nx-checkbox-focus-ring-color) data-[focused]:ring-offset-(length:--nx-checkbox-focus-ring-offset) data-[focused]:ring-offset-(--nx-checkbox-focus-ring-offset-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-(--nx-checkbox-size-sm) text-(length:--nx-checkbox-indicator-font-size-sm)",
        md: "size-(--nx-checkbox-size-md) text-(length:--nx-checkbox-indicator-font-size-md)",
        lg: "size-(--nx-checkbox-size-lg) text-(length:--nx-checkbox-indicator-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const checkboxLabelVariants = cva(
  "inline-flex items-center gap-(--nx-checkbox-label-gap) text-(length:--nx-checkbox-label-font-size) font-(--nx-checkbox-label-font-weight) leading-(--nx-checkbox-label-font-line-height) text-(--nx-checkbox-label-foreground)",
)
