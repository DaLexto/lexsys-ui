/**
 * Field.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const fieldVariants = cva(
  [
    "grid gap-(--lsys-field-gap) text-(--lsys-field-foreground)",
    "data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
)

export const fieldLabelVariants = cva(
  [
    "w-fit text-(length:--lsys-field-label-font-size) font-(--lsys-field-label-font-weight) leading-(--lsys-field-label-font-line-height) tracking-(--lsys-field-label-font-letter-spacing)",
    "text-(--lsys-field-label-foreground) data-[invalid]:text-(--lsys-field-label-invalid-foreground) data-[disabled]:cursor-not-allowed",
  ].join(" "),
)

export const fieldControlVariants = cva(
  [
    "flex w-full min-w-0 border bg-(--lsys-field-control-background) text-(--lsys-field-control-foreground)",
    "rounded-(--lsys-field-control-radius) border-(--lsys-field-control-border-color)",
    "font-(family-name:--lsys-field-control-font-family) font-(--lsys-field-control-font-weight) leading-(--lsys-field-control-font-line-height) tracking-(--lsys-field-control-font-letter-spacing)",
    "placeholder:text-(--lsys-field-control-placeholder-color)",
    "transition-colors duration-(--lsys-field-transition-duration) ease-(--lsys-field-transition-easing)",
    "outline-none focus-visible:border-(--lsys-field-control-focus-border-color) focus-visible:ring-(length:--lsys-field-control-focus-ring-width) focus-visible:ring-(--lsys-field-control-focus-ring-color) focus-visible:ring-offset-(length:--lsys-field-control-focus-ring-offset) focus-visible:ring-offset-(--lsys-field-control-focus-ring-offset-color)",
    "data-[invalid]:border-(--lsys-field-control-invalid-border-color) data-[invalid]:ring-(--lsys-field-control-invalid-ring-color) aria-invalid:border-(--lsys-field-control-invalid-border-color) aria-invalid:ring-(--lsys-field-control-invalid-ring-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        ghost:
          "border-transparent bg-transparent focus-visible:bg-(--lsys-field-control-background)",
      },
      size: {
        sm: "h-(--lsys-field-control-height-sm) px-(--lsys-field-control-padding-x-sm) text-(length:--lsys-field-control-font-size-sm)",
        md: "h-(--lsys-field-control-height-md) px-(--lsys-field-control-padding-x-md) text-(length:--lsys-field-control-font-size-md)",
        lg: "h-(--lsys-field-control-height-lg) px-(--lsys-field-control-padding-x-lg) text-(length:--lsys-field-control-font-size-lg)",
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
    "m-0 text-(length:--lsys-field-description-font-size) font-(--lsys-field-description-font-weight) leading-(--lsys-field-description-font-line-height) tracking-(--lsys-field-description-font-letter-spacing)",
    "text-(--lsys-field-description-foreground) data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
)

export const fieldItemVariants = cva(
  [
    "grid gap-(--lsys-field-item-gap)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
)

export const fieldErrorVariants = cva(
  [
    "m-0 text-(length:--lsys-field-error-font-size) font-(--lsys-field-error-font-weight) leading-(--lsys-field-error-font-line-height) tracking-(--lsys-field-error-font-letter-spacing)",
    "text-(--lsys-field-error-foreground) data-[disabled]:opacity-(--lsys-opacity-disabled)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-(--lsys-field-transition-duration) ease-(--lsys-field-transition-easing)",
  ].join(" "),
)
