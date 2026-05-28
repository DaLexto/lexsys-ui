/**
 * OtpField.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses, invalidStateClasses } from "../../../utils/cn"

export const otpFieldVariants = cva(
  [
    "inline-flex items-center gap-(--lex-input-padding-x-sm) text-(--lex-field-foreground)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lex-opacity-disabled)",
  ].join(" "),
)

export const otpFieldInputVariants = cva(
  [
    "flex shrink-0 items-center justify-center border bg-(--lex-input-background) text-center text-(--lex-input-foreground)",
    "rounded-(--lex-input-radius) border-(--lex-input-border-color)",
    "font-(family-name:--lex-input-font-family) font-(--lex-input-font-weight) leading-(--lex-input-font-line-height) tracking-(--lex-input-font-letter-spacing)",
    "transition-colors duration-(--lex-input-transition-duration) ease-(--lex-input-transition-easing)",
    "outline-none focus-visible:border-(--lex-input-focus-border-color) focus-visible:ring-(length:--lex-input-focus-ring-width) focus-visible:ring-(--lex-input-focus-ring-color) focus-visible:ring-offset-(length:--lex-input-focus-ring-offset) focus-visible:ring-offset-(--lex-input-focus-ring-offset-color)",
    "data-[filled]:border-(--lex-input-focus-border-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
    invalidStateClasses,
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-(--lex-input-height-sm) text-(length:--lex-input-font-size-sm)",
        md: "size-(--lex-input-height-md) text-(length:--lex-input-font-size-md)",
        lg: "size-(--lex-input-height-lg) text-(length:--lex-input-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const otpFieldSeparatorVariants = cva(
  "select-none text-(length:--lex-input-font-size-md) font-(--lex-input-font-weight) text-(--lex-input-placeholder-color)",
)
