/**
 * NumberField.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const numberFieldVariants = cva(
  "grid gap-(--nx-number-field-gap) text-(--nx-number-field-foreground) data-[disabled]:opacity-(--nx-opacity-disabled)",
)

export const numberFieldGroupVariants = cva(
  [
    "inline-flex w-full min-w-0 items-stretch overflow-hidden rounded-(--nx-number-field-radius)",
    "border border-(--nx-number-field-border-color) bg-(--nx-number-field-background)",
    "transition-colors duration-(--nx-number-field-transition-duration) ease-(--nx-number-field-transition-easing)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-(--nx-number-field-height-sm)",
        md: "h-(--nx-number-field-height-md)",
        lg: "h-(--nx-number-field-height-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const numberFieldInputVariants = cva(
  [
    "min-w-0 flex-1 border-0 bg-transparent text-(--nx-number-field-input-foreground)",
    "font-(family-name:--nx-number-field-input-font-family) font-(--nx-number-field-input-font-weight) leading-(--nx-number-field-input-font-line-height) tracking-(--nx-number-field-input-font-letter-spacing)",
    "placeholder:text-(--nx-number-field-input-placeholder-color)",
    "outline-none focus-visible:ring-(length:--nx-number-field-focus-ring-width) focus-visible:ring-inset focus-visible:ring-(--nx-number-field-focus-ring-color)",
    "aria-invalid:ring-(length:--nx-number-field-invalid-ring-width) aria-invalid:ring-inset aria-invalid:ring-(--nx-number-field-invalid-ring-color) data-[invalid]:ring-(length:--nx-number-field-invalid-ring-width) data-[invalid]:ring-inset data-[invalid]:ring-(--nx-number-field-invalid-ring-color)",
    "disabled:cursor-not-allowed data-[disabled]:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "px-(--nx-number-field-input-padding-x-sm) text-(length:--nx-number-field-input-font-size-sm)",
        md: "px-(--nx-number-field-input-padding-x-md) text-(length:--nx-number-field-input-font-size-md)",
        lg: "px-(--nx-number-field-input-padding-x-lg) text-(length:--nx-number-field-input-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const numberFieldButtonVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center border-(--nx-number-field-stepper-border-color)",
    "bg-(--nx-number-field-stepper-background) text-(--nx-number-field-stepper-foreground)",
    "font-(--nx-number-field-stepper-font-weight) transition-colors duration-(--nx-number-field-transition-duration) ease-(--nx-number-field-transition-easing)",
    "hover:bg-(--nx-number-field-stepper-hover-background) focus-visible:outline-none focus-visible:ring-(length:--nx-number-field-focus-ring-width) focus-visible:ring-inset focus-visible:ring-(--nx-number-field-focus-ring-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
  ].join(" "),
  {
    variants: {
      position: {
        decrement: "border-r",
        increment: "border-l",
      },
      size: {
        sm: "w-(--nx-number-field-stepper-width-sm) text-(length:--nx-number-field-stepper-font-size-sm)",
        md: "w-(--nx-number-field-stepper-width-md) text-(length:--nx-number-field-stepper-font-size-md)",
        lg: "w-(--nx-number-field-stepper-width-lg) text-(length:--nx-number-field-stepper-font-size-lg)",
      },
    },
    defaultVariants: {
      position: "increment",
      size: "md",
    },
  },
)

export const numberFieldScrubAreaVariants = cva(
  "w-fit cursor-ew-resize text-(length:--nx-number-field-scrub-font-size) font-(--nx-number-field-scrub-font-weight) text-(--nx-number-field-scrub-foreground)",
)

export const numberFieldScrubAreaCursorVariants = cva(
  "size-(--nx-number-field-scrub-cursor-size) rounded-(--nx-number-field-scrub-cursor-radius) bg-(--nx-number-field-scrub-cursor-background)",
)
