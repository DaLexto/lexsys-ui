/**
 * Checkbox.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const checkboxVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center rounded-[var(--nx-checkbox-radius)] border",
    "border-[var(--nx-checkbox-border-color)] bg-[var(--nx-checkbox-background)] text-[var(--nx-checkbox-foreground)]",
    "transition-colors duration-[var(--nx-checkbox-transition-duration)] ease-[var(--nx-checkbox-transition-easing)]",
    "outline-none data-[checked]:border-[var(--nx-checkbox-checked-border-color)] data-[checked]:bg-[var(--nx-checkbox-checked-background)] data-[checked]:text-[var(--nx-checkbox-checked-foreground)]",
    "data-[indeterminate]:border-[var(--nx-checkbox-checked-border-color)] data-[indeterminate]:bg-[var(--nx-checkbox-checked-background)]",
    "data-[focused]:ring-[length:var(--nx-checkbox-focus-ring-width)] data-[focused]:ring-[var(--nx-checkbox-focus-ring-color)] data-[focused]:ring-offset-[length:var(--nx-checkbox-focus-ring-offset)] data-[focused]:ring-offset-[var(--nx-checkbox-focus-ring-offset-color)]",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-[var(--nx-checkbox-size-sm)] text-[length:var(--nx-checkbox-indicator-font-size-sm)]",
        md: "size-[var(--nx-checkbox-size-md)] text-[length:var(--nx-checkbox-indicator-font-size-md)]",
        lg: "size-[var(--nx-checkbox-size-lg)] text-[length:var(--nx-checkbox-indicator-font-size-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const checkboxLabelVariants = cva(
  "inline-flex items-center gap-[var(--nx-checkbox-label-gap)] text-[length:var(--nx-checkbox-label-font-size)] font-[var(--nx-checkbox-label-font-weight)] leading-[var(--nx-checkbox-label-font-line-height)] text-[var(--nx-checkbox-label-foreground)]",
)
