/**
 * Field.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const fieldVariants = cva(
  [
    "grid gap-[var(--nx-field-gap)] text-[var(--nx-field-foreground)]",
    "data-[disabled]:opacity-60",
  ].join(" "),
)

export const fieldLabelVariants = cva(
  [
    "w-fit text-[length:var(--nx-field-label-font-size)] font-[var(--nx-field-label-font-weight)] leading-[var(--nx-field-label-font-line-height)] tracking-[var(--nx-field-label-font-letter-spacing)]",
    "text-[var(--nx-field-label-foreground)] data-[invalid]:text-[var(--nx-field-label-invalid-foreground)] data-[disabled]:cursor-not-allowed",
  ].join(" "),
)

export const fieldControlVariants = cva(
  [
    "flex w-full min-w-0 border bg-[var(--nx-field-control-background)] text-[var(--nx-field-control-foreground)]",
    "rounded-[var(--nx-field-control-radius)] border-[var(--nx-field-control-border-color)]",
    "[font-family:var(--nx-field-control-font-family)] font-[var(--nx-field-control-font-weight)] leading-[var(--nx-field-control-font-line-height)] tracking-[var(--nx-field-control-font-letter-spacing)]",
    "placeholder:text-[var(--nx-field-control-placeholder-color)]",
    "transition-colors duration-[var(--nx-field-transition-duration)] ease-[var(--nx-field-transition-easing)]",
    "outline-none focus-visible:border-[var(--nx-field-control-focus-border-color)] focus-visible:ring-[length:var(--nx-field-control-focus-ring-width)] focus-visible:ring-[var(--nx-field-control-focus-ring-color)] focus-visible:ring-offset-[length:var(--nx-field-control-focus-ring-offset)] focus-visible:ring-offset-[var(--nx-field-control-focus-ring-offset-color)]",
    "data-[invalid]:border-[var(--nx-field-control-invalid-border-color)] data-[invalid]:ring-[var(--nx-field-control-invalid-ring-color)] aria-invalid:border-[var(--nx-field-control-invalid-border-color)] aria-invalid:ring-[var(--nx-field-control-invalid-ring-color)]",
    "disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        ghost:
          "border-transparent bg-transparent focus-visible:bg-[var(--nx-field-control-background)]",
      },
      size: {
        sm: "h-[var(--nx-field-control-height-sm)] px-[var(--nx-field-control-padding-x-sm)] text-[length:var(--nx-field-control-font-size-sm)]",
        md: "h-[var(--nx-field-control-height-md)] px-[var(--nx-field-control-padding-x-md)] text-[length:var(--nx-field-control-font-size-md)]",
        lg: "h-[var(--nx-field-control-height-lg)] px-[var(--nx-field-control-padding-x-lg)] text-[length:var(--nx-field-control-font-size-lg)]",
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
    "m-0 text-[length:var(--nx-field-description-font-size)] font-[var(--nx-field-description-font-weight)] leading-[var(--nx-field-description-font-line-height)] tracking-[var(--nx-field-description-font-letter-spacing)]",
    "text-[var(--nx-field-description-foreground)] data-[disabled]:opacity-70",
  ].join(" "),
)

export const fieldItemVariants = cva(
  [
    "grid gap-[var(--nx-field-item-gap)]",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60",
  ].join(" "),
)

export const fieldErrorVariants = cva(
  [
    "m-0 text-[length:var(--nx-field-error-font-size)] font-[var(--nx-field-error-font-weight)] leading-[var(--nx-field-error-font-line-height)] tracking-[var(--nx-field-error-font-letter-spacing)]",
    "text-[var(--nx-field-error-foreground)] data-[disabled]:opacity-70",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "transition-opacity duration-[var(--nx-field-transition-duration)] ease-[var(--nx-field-transition-easing)]",
  ].join(" "),
)
