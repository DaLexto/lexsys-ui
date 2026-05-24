/**
 * NumberField.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const numberFieldVariants = cva(
  "grid gap-(--lsys-number-field-gap) text-(--lsys-number-field-foreground) data-[disabled]:opacity-(--lsys-opacity-disabled)",
)

export const numberFieldGroupVariants = cva(
  [
    "inline-flex w-full min-w-0 items-stretch overflow-hidden rounded-(--lsys-number-field-radius)",
    "border border-(--lsys-number-field-border-color) bg-(--lsys-number-field-background)",
    "transition-colors duration-(--lsys-number-field-transition-duration) ease-(--lsys-number-field-transition-easing)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-(--lsys-number-field-height-sm)",
        md: "h-(--lsys-number-field-height-md)",
        lg: "h-(--lsys-number-field-height-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const numberFieldInputVariants = cva(
  [
    "min-w-0 flex-1 border-0 bg-transparent text-(--lsys-number-field-input-foreground)",
    "font-(family-name:--lsys-number-field-input-font-family) font-(--lsys-number-field-input-font-weight) leading-(--lsys-number-field-input-font-line-height) tracking-(--lsys-number-field-input-font-letter-spacing)",
    "placeholder:text-(--lsys-number-field-input-placeholder-color)",
    "outline-none focus-visible:ring-(length:--lsys-number-field-focus-ring-width) focus-visible:ring-inset focus-visible:ring-(--lsys-number-field-focus-ring-color)",
    "aria-invalid:ring-(length:--lsys-number-field-invalid-ring-width) aria-invalid:ring-inset aria-invalid:ring-(--lsys-number-field-invalid-ring-color) data-[invalid]:ring-(length:--lsys-number-field-invalid-ring-width) data-[invalid]:ring-inset data-[invalid]:ring-(--lsys-number-field-invalid-ring-color)",
    "disabled:cursor-not-allowed data-[disabled]:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "px-(--lsys-number-field-input-padding-x-sm) text-(length:--lsys-number-field-input-font-size-sm)",
        md: "px-(--lsys-number-field-input-padding-x-md) text-(length:--lsys-number-field-input-font-size-md)",
        lg: "px-(--lsys-number-field-input-padding-x-lg) text-(length:--lsys-number-field-input-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const numberFieldButtonVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center border-(--lsys-number-field-stepper-border-color)",
    "bg-(--lsys-number-field-stepper-background) text-(--lsys-number-field-stepper-foreground)",
    "font-(--lsys-number-field-stepper-font-weight) transition-colors duration-(--lsys-number-field-transition-duration) ease-(--lsys-number-field-transition-easing)",
    "hover:bg-(--lsys-number-field-stepper-hover-background) focus-visible:outline-none focus-visible:ring-(length:--lsys-number-field-focus-ring-width) focus-visible:ring-inset focus-visible:ring-(--lsys-number-field-focus-ring-color)",
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
        sm: "w-(--lsys-number-field-stepper-width-sm) text-(length:--lsys-number-field-stepper-font-size-sm)",
        md: "w-(--lsys-number-field-stepper-width-md) text-(length:--lsys-number-field-stepper-font-size-md)",
        lg: "w-(--lsys-number-field-stepper-width-lg) text-(length:--lsys-number-field-stepper-font-size-lg)",
      },
    },
    defaultVariants: {
      position: "increment",
      size: "md",
    },
  },
)

export const numberFieldScrubAreaVariants = cva(
  "w-fit cursor-ew-resize text-(length:--lsys-number-field-scrub-font-size) font-(--lsys-number-field-scrub-font-weight) text-(--lsys-number-field-scrub-foreground)",
)

export const numberFieldScrubAreaCursorVariants = cva(
  "size-(--lsys-number-field-scrub-cursor-size) rounded-(--lsys-number-field-scrub-cursor-radius) bg-(--lsys-number-field-scrub-cursor-background)",
)
