/**
 * NumberField.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const numberFieldVariants = cva(
  "grid gap-[var(--nx-number-field-gap)] text-[var(--nx-number-field-foreground)] data-[disabled]:opacity-60",
)

export const numberFieldGroupVariants = cva(
  [
    "inline-flex w-full min-w-0 items-stretch overflow-hidden rounded-[var(--nx-number-field-radius)]",
    "border border-[var(--nx-number-field-border-color)] bg-[var(--nx-number-field-background)]",
    "transition-colors duration-[var(--nx-number-field-transition-duration)] ease-[var(--nx-number-field-transition-easing)]",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-[var(--nx-number-field-height-sm)]",
        md: "h-[var(--nx-number-field-height-md)]",
        lg: "h-[var(--nx-number-field-height-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const numberFieldInputVariants = cva(
  [
    "min-w-0 flex-1 border-0 bg-transparent text-[var(--nx-number-field-input-foreground)]",
    "[font-family:var(--nx-number-field-input-font-family)] font-[var(--nx-number-field-input-font-weight)] leading-[var(--nx-number-field-input-font-line-height)] tracking-[var(--nx-number-field-input-font-letter-spacing)]",
    "placeholder:text-[var(--nx-number-field-input-placeholder-color)]",
    "outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--nx-number-field-focus-ring-color)]",
    "aria-invalid:ring-2 aria-invalid:ring-inset aria-invalid:ring-[var(--nx-number-field-invalid-ring-color)] data-[invalid]:ring-2 data-[invalid]:ring-inset data-[invalid]:ring-[var(--nx-number-field-invalid-ring-color)]",
    "disabled:cursor-not-allowed data-[disabled]:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "px-[var(--nx-number-field-input-padding-x-sm)] text-[length:var(--nx-number-field-input-font-size-sm)]",
        md: "px-[var(--nx-number-field-input-padding-x-md)] text-[length:var(--nx-number-field-input-font-size-md)]",
        lg: "px-[var(--nx-number-field-input-padding-x-lg)] text-[length:var(--nx-number-field-input-font-size-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const numberFieldButtonVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center border-[var(--nx-number-field-stepper-border-color)]",
    "bg-[var(--nx-number-field-stepper-background)] text-[var(--nx-number-field-stepper-foreground)]",
    "font-[var(--nx-number-field-stepper-font-weight)] transition-colors duration-[var(--nx-number-field-transition-duration)] ease-[var(--nx-number-field-transition-easing)]",
    "hover:bg-[var(--nx-number-field-stepper-hover-background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--nx-number-field-focus-ring-color)]",
    "disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      position: {
        decrement: "border-r",
        increment: "border-l",
      },
      size: {
        sm: "w-[var(--nx-number-field-stepper-width-sm)] text-[length:var(--nx-number-field-stepper-font-size-sm)]",
        md: "w-[var(--nx-number-field-stepper-width-md)] text-[length:var(--nx-number-field-stepper-font-size-md)]",
        lg: "w-[var(--nx-number-field-stepper-width-lg)] text-[length:var(--nx-number-field-stepper-font-size-lg)]",
      },
    },
    defaultVariants: {
      position: "increment",
      size: "md",
    },
  },
)

export const numberFieldScrubAreaVariants = cva(
  "w-fit cursor-ew-resize text-[length:var(--nx-number-field-scrub-font-size)] font-[var(--nx-number-field-scrub-font-weight)] text-[var(--nx-number-field-scrub-foreground)]",
)

export const numberFieldScrubAreaCursorVariants = cva(
  "size-[var(--nx-number-field-scrub-cursor-size)] rounded-[var(--nx-number-field-scrub-cursor-radius)] bg-[var(--nx-number-field-scrub-cursor-background)]",
)
