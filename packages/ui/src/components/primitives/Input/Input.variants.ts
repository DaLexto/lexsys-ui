/**
 * Input.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses, invalidStateClasses } from "../../../utils/cn"

export const inputVariants = cva(
  [
    "flex w-full min-w-0 border bg-(--nx-input-background) text-(--nx-input-foreground)",
    "rounded-(--nx-input-radius) border-(--nx-input-border-color)",
    "font-(family-name:--nx-input-font-family) font-(--nx-input-font-weight) leading-(--nx-input-font-line-height) tracking-(--nx-input-font-letter-spacing)",
    "placeholder:text-(--nx-input-placeholder-color)",
    "transition-colors duration-(--nx-input-transition-duration) ease-(--nx-input-transition-easing)",
    "outline-none focus-visible:border-(--nx-input-focus-border-color) focus-visible:ring-(length:--nx-input-focus-ring-width) focus-visible:ring-(--nx-input-focus-ring-color) focus-visible:ring-offset-(length:--nx-input-focus-ring-offset) focus-visible:ring-offset-(--nx-input-focus-ring-offset-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
    invalidStateClasses,
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        ghost:
          "border-transparent bg-transparent focus-visible:bg-(--nx-input-background)",
      },
      size: {
        sm: "h-(--nx-input-height-sm) px-(--nx-input-padding-x-sm) text-(length:--nx-input-font-size-sm)",
        md: "h-(--nx-input-height-md) px-(--nx-input-padding-x-md) text-(length:--nx-input-font-size-md)",
        lg: "h-(--nx-input-height-lg) px-(--nx-input-padding-x-lg) text-(length:--nx-input-font-size-lg)",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)
