/**
 * Field.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const fieldVariants = cva(
  [
    "grid gap-(--lex-field-gap) text-(--lex-field-foreground)",
    "data-[disabled]:opacity-(--lex-opacity-disabled)",
  ].join(" "),
)

export const fieldLabelVariants = cva(
  [
    "w-fit text-(length:--lex-field-label-font-size) font-(--lex-field-label-font-weight) leading-(--lex-field-label-font-line-height) tracking-(--lex-field-label-font-letter-spacing)",
    "text-(--lex-field-label-foreground) data-[invalid]:text-(--lex-field-label-invalid-foreground) data-[disabled]:cursor-not-allowed",
  ].join(" "),
)

export const fieldControlVariants = cva(
  [
    "flex w-full min-w-0 border bg-(--lex-field-control-background) text-(--lex-field-control-foreground)",
    "rounded-(--lex-field-control-radius) border-(--lex-field-control-border-color)",
    "font-(family-name:--lex-field-control-font-family) font-(--lex-field-control-font-weight) leading-(--lex-field-control-font-line-height) tracking-(--lex-field-control-font-letter-spacing)",
    "placeholder:text-(--lex-field-control-placeholder-color)",
    "transition-colors duration-(--lex-field-transition-duration) ease-(--lex-field-transition-easing)",
    "outline-none focus-visible:border-(--lex-field-control-focus-border-color) focus-visible:ring-(length:--lex-field-control-focus-ring-width) focus-visible:ring-(--lex-field-control-focus-ring-color) focus-visible:ring-offset-(length:--lex-field-control-focus-ring-offset) focus-visible:ring-offset-(--lex-field-control-focus-ring-offset-color)",
    "data-[invalid]:border-(--lex-field-control-invalid-border-color) data-[invalid]:ring-(--lex-field-control-invalid-ring-color) aria-invalid:border-(--lex-field-control-invalid-border-color) aria-invalid:ring-(--lex-field-control-invalid-ring-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        ghost:
          "border-transparent bg-transparent focus-visible:bg-(--lex-field-control-background)",
      },
      size: {
        sm: "h-(--lex-field-control-height-sm) px-(--lex-field-control-padding-x-sm) text-(length:--lex-field-control-font-size-sm)",
        md: "h-(--lex-field-control-height-md) px-(--lex-field-control-padding-x-md) text-(length:--lex-field-control-font-size-md)",
        lg: "h-(--lex-field-control-height-lg) px-(--lex-field-control-padding-x-lg) text-(length:--lex-field-control-font-size-lg)",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

export const fieldDescriptionVariants = cva(
  [
    "m-0 text-(length:--lex-field-description-font-size) font-(--lex-field-description-font-weight) leading-(--lex-field-description-font-line-height) tracking-(--lex-field-description-font-letter-spacing)",
    "text-(--lex-field-description-foreground) data-[disabled]:opacity-(--lex-opacity-disabled)",
  ].join(" "),
)

export const fieldItemVariants = cva(
  [
    "grid gap-(--lex-field-item-gap)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lex-opacity-disabled)",
  ].join(" "),
)

export const fieldErrorVariants = cva(
  [
    "m-0 text-(length:--lex-field-error-font-size) font-(--lex-field-error-font-weight) leading-(--lex-field-error-font-line-height) tracking-(--lex-field-error-font-letter-spacing)",
    "text-(--lex-field-error-foreground) data-[disabled]:opacity-(--lex-opacity-disabled)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-(--lex-field-transition-duration) ease-(--lex-field-transition-easing)",
  ].join(" "),
)
