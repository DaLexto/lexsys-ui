/**
 * Field.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../utils/cn"

export const fieldVariants = cva(
  [
    "grid gap-(--nx-field-gap) text-(--nx-field-foreground)",
    "data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
)

export const fieldLabelVariants = cva(
  [
    "w-fit text-(length:--nx-field-label-font-size) font-(--nx-field-label-font-weight) leading-(--nx-field-label-font-line-height) tracking-(--nx-field-label-font-letter-spacing)",
    "text-(--nx-field-label-foreground) data-[invalid]:text-(--nx-field-label-invalid-foreground) data-[disabled]:cursor-not-allowed",
  ].join(" "),
)

export const fieldControlVariants = cva(
  [
    "flex w-full min-w-0 border bg-(--nx-field-control-background) text-(--nx-field-control-foreground)",
    "rounded-(--nx-field-control-radius) border-(--nx-field-control-border-color)",
    "font-(family-name:--nx-field-control-font-family) font-(--nx-field-control-font-weight) leading-(--nx-field-control-font-line-height) tracking-(--nx-field-control-font-letter-spacing)",
    "placeholder:text-(--nx-field-control-placeholder-color)",
    "transition-colors duration-(--nx-field-transition-duration) ease-(--nx-field-transition-easing)",
    "outline-none focus-visible:border-(--nx-field-control-focus-border-color) focus-visible:ring-(length:--nx-field-control-focus-ring-width) focus-visible:ring-(--nx-field-control-focus-ring-color) focus-visible:ring-offset-(length:--nx-field-control-focus-ring-offset) focus-visible:ring-offset-(--nx-field-control-focus-ring-offset-color)",
    "data-[invalid]:border-(--nx-field-control-invalid-border-color) data-[invalid]:ring-(--nx-field-control-invalid-ring-color) aria-invalid:border-(--nx-field-control-invalid-border-color) aria-invalid:ring-(--nx-field-control-invalid-ring-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        ghost:
          "border-transparent bg-transparent focus-visible:bg-(--nx-field-control-background)",
      },
      size: {
        sm: "h-(--nx-field-control-height-sm) px-(--nx-field-control-padding-x-sm) text-(length:--nx-field-control-font-size-sm)",
        md: "h-(--nx-field-control-height-md) px-(--nx-field-control-padding-x-md) text-(length:--nx-field-control-font-size-md)",
        lg: "h-(--nx-field-control-height-lg) px-(--nx-field-control-padding-x-lg) text-(length:--nx-field-control-font-size-lg)",
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
    "m-0 text-(length:--nx-field-description-font-size) font-(--nx-field-description-font-weight) leading-(--nx-field-description-font-line-height) tracking-(--nx-field-description-font-letter-spacing)",
    "text-(--nx-field-description-foreground) data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
)

export const fieldItemVariants = cva(
  [
    "grid gap-(--nx-field-item-gap)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
)

export const fieldErrorVariants = cva(
  [
    "m-0 text-(length:--nx-field-error-font-size) font-(--nx-field-error-font-weight) leading-(--nx-field-error-font-line-height) tracking-(--nx-field-error-font-letter-spacing)",
    "text-(--nx-field-error-foreground) data-[disabled]:opacity-(--nx-opacity-disabled)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-(--nx-field-transition-duration) ease-(--nx-field-transition-easing)",
  ].join(" "),
)
