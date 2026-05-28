/**
 * NumberField.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const numberFieldVariants = cva(
  "grid gap-(--lex-number-field-gap) text-(--lex-number-field-foreground) data-[disabled]:opacity-(--lex-opacity-disabled)",
)

export const numberFieldGroupVariants = cva(
  [
    "inline-flex w-full min-w-0 items-stretch overflow-hidden rounded-(--lex-number-field-radius)",
    "border border-(--lex-number-field-border-color) bg-(--lex-number-field-background)",
    "transition-colors duration-(--lex-number-field-transition-duration) ease-(--lex-number-field-transition-easing)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lex-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-(--lex-number-field-height-sm)",
        md: "h-(--lex-number-field-height-md)",
        lg: "h-(--lex-number-field-height-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const numberFieldInputVariants = cva(
  [
    "min-w-0 flex-1 border-0 bg-transparent text-(--lex-number-field-input-foreground)",
    "font-(family-name:--lex-number-field-input-font-family) font-(--lex-number-field-input-font-weight) leading-(--lex-number-field-input-font-line-height) tracking-(--lex-number-field-input-font-letter-spacing)",
    "placeholder:text-(--lex-number-field-input-placeholder-color)",
    "outline-none focus-visible:ring-(length:--lex-number-field-focus-ring-width) focus-visible:ring-inset focus-visible:ring-(--lex-number-field-focus-ring-color)",
    "aria-invalid:ring-(length:--lex-number-field-invalid-ring-width) aria-invalid:ring-inset aria-invalid:ring-(--lex-number-field-invalid-ring-color) data-[invalid]:ring-(length:--lex-number-field-invalid-ring-width) data-[invalid]:ring-inset data-[invalid]:ring-(--lex-number-field-invalid-ring-color)",
    "disabled:cursor-not-allowed data-[disabled]:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "px-(--lex-number-field-input-padding-x-sm) text-(length:--lex-number-field-input-font-size-sm)",
        md: "px-(--lex-number-field-input-padding-x-md) text-(length:--lex-number-field-input-font-size-md)",
        lg: "px-(--lex-number-field-input-padding-x-lg) text-(length:--lex-number-field-input-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const numberFieldButtonVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center border-(--lex-number-field-stepper-border-color)",
    "bg-(--lex-number-field-stepper-background) text-(--lex-number-field-stepper-foreground)",
    "font-(--lex-number-field-stepper-font-weight) transition-colors duration-(--lex-number-field-transition-duration) ease-(--lex-number-field-transition-easing)",
    "hover:bg-(--lex-number-field-stepper-hover-background) focus-visible:outline-none focus-visible:ring-(length:--lex-number-field-focus-ring-width) focus-visible:ring-inset focus-visible:ring-(--lex-number-field-focus-ring-color)",
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
        sm: "w-(--lex-number-field-stepper-width-sm) text-(length:--lex-number-field-stepper-font-size-sm)",
        md: "w-(--lex-number-field-stepper-width-md) text-(length:--lex-number-field-stepper-font-size-md)",
        lg: "w-(--lex-number-field-stepper-width-lg) text-(length:--lex-number-field-stepper-font-size-lg)",
      },
    },
    defaultVariants: {
      position: "increment",
      size: "md",
    },
  },
)

export const numberFieldScrubAreaVariants = cva(
  "w-fit cursor-ew-resize text-(length:--lex-number-field-scrub-font-size) font-(--lex-number-field-scrub-font-weight) text-(--lex-number-field-scrub-foreground)",
)

export const numberFieldScrubAreaCursorVariants = cva(
  "size-(--lex-number-field-scrub-cursor-size) rounded-(--lex-number-field-scrub-cursor-radius) bg-(--lex-number-field-scrub-cursor-background)",
)
