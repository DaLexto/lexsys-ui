/**
 * OtpField.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses, invalidStateClasses } from "../../../utils/cn"

export const otpFieldVariants = cva(
  [
    "inline-flex items-center gap-(--nx-input-padding-x-sm) text-(--nx-field-foreground)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
)

export const otpFieldInputVariants = cva(
  [
    "flex shrink-0 items-center justify-center border bg-(--nx-input-background) text-center text-(--nx-input-foreground)",
    "rounded-(--nx-input-radius) border-(--nx-input-border-color)",
    "font-(family-name:--nx-input-font-family) font-(--nx-input-font-weight) leading-(--nx-input-font-line-height) tracking-(--nx-input-font-letter-spacing)",
    "transition-colors duration-(--nx-input-transition-duration) ease-(--nx-input-transition-easing)",
    "outline-none focus-visible:border-(--nx-input-focus-border-color) focus-visible:ring-(length:--nx-input-focus-ring-width) focus-visible:ring-(--nx-input-focus-ring-color) focus-visible:ring-offset-(length:--nx-input-focus-ring-offset) focus-visible:ring-offset-(--nx-input-focus-ring-offset-color)",
    "data-[filled]:border-(--nx-input-focus-border-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
    invalidStateClasses,
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-(--nx-input-height-sm) text-(length:--nx-input-font-size-sm)",
        md: "size-(--nx-input-height-md) text-(length:--nx-input-font-size-md)",
        lg: "size-(--nx-input-height-lg) text-(length:--nx-input-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const otpFieldSeparatorVariants = cva(
  "select-none text-(length:--nx-input-font-size-md) font-(--nx-input-font-weight) text-(--nx-input-placeholder-color)",
)
