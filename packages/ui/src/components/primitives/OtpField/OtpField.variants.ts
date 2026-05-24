/**
 * OtpField.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses, invalidStateClasses } from "../../../utils/cn"

export const otpFieldVariants = cva(
  [
    "inline-flex items-center gap-(--lsys-input-padding-x-sm) text-(--lsys-field-foreground)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
)

export const otpFieldInputVariants = cva(
  [
    "flex shrink-0 items-center justify-center border bg-(--lsys-input-background) text-center text-(--lsys-input-foreground)",
    "rounded-(--lsys-input-radius) border-(--lsys-input-border-color)",
    "font-(family-name:--lsys-input-font-family) font-(--lsys-input-font-weight) leading-(--lsys-input-font-line-height) tracking-(--lsys-input-font-letter-spacing)",
    "transition-colors duration-(--lsys-input-transition-duration) ease-(--lsys-input-transition-easing)",
    "outline-none focus-visible:border-(--lsys-input-focus-border-color) focus-visible:ring-(length:--lsys-input-focus-ring-width) focus-visible:ring-(--lsys-input-focus-ring-color) focus-visible:ring-offset-(length:--lsys-input-focus-ring-offset) focus-visible:ring-offset-(--lsys-input-focus-ring-offset-color)",
    "data-[filled]:border-(--lsys-input-focus-border-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
    invalidStateClasses,
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-(--lsys-input-height-sm) text-(length:--lsys-input-font-size-sm)",
        md: "size-(--lsys-input-height-md) text-(length:--lsys-input-font-size-md)",
        lg: "size-(--lsys-input-height-lg) text-(length:--lsys-input-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const otpFieldSeparatorVariants = cva(
  "select-none text-(length:--lsys-input-font-size-md) font-(--lsys-input-font-weight) text-(--lsys-input-placeholder-color)",
)
