/**
 * Checkbox.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const checkboxVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center rounded-(--lex-checkbox-radius) border",
    "border-(--lex-checkbox-border-color) bg-(--lex-checkbox-background) text-(--lex-checkbox-foreground)",
    "transition-colors duration-(--lex-checkbox-transition-duration) ease-(--lex-checkbox-transition-easing)",
    "outline-none data-[checked]:border-(--lex-checkbox-checked-border-color) data-[checked]:bg-(--lex-checkbox-checked-background) data-[checked]:text-(--lex-checkbox-checked-foreground)",
    "data-[indeterminate]:border-(--lex-checkbox-checked-border-color) data-[indeterminate]:bg-(--lex-checkbox-checked-background)",
    "data-[focused]:ring-(length:--lex-checkbox-focus-ring-width) data-[focused]:ring-(--lex-checkbox-focus-ring-color) data-[focused]:ring-offset-(length:--lex-checkbox-focus-ring-offset) data-[focused]:ring-offset-(--lex-checkbox-focus-ring-offset-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lex-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-(--lex-checkbox-size-sm) text-(length:--lex-checkbox-indicator-font-size-sm)",
        md: "size-(--lex-checkbox-size-md) text-(length:--lex-checkbox-indicator-font-size-md)",
        lg: "size-(--lex-checkbox-size-lg) text-(length:--lex-checkbox-indicator-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const checkboxIndicatorVariants = cva(
  "leading-(--lex-checkbox-label-font-line-height)",
)
