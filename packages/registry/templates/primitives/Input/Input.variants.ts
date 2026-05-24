/**
 * Input.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses, invalidStateClasses } from "@/lib/utils"

export const inputVariants = cva(
  [
    "flex w-full min-w-0 border bg-(--lsys-input-background) text-(--lsys-input-foreground)",
    "rounded-(--lsys-input-radius) border-(--lsys-input-border-color)",
    "font-(family-name:--lsys-input-font-family) font-(--lsys-input-font-weight) leading-(--lsys-input-font-line-height) tracking-(--lsys-input-font-letter-spacing)",
    "placeholder:text-(--lsys-input-placeholder-color)",
    "transition-colors duration-(--lsys-input-transition-duration) ease-(--lsys-input-transition-easing)",
    "outline-none focus-visible:border-(--lsys-input-focus-border-color) focus-visible:ring-(length:--lsys-input-focus-ring-width) focus-visible:ring-(--lsys-input-focus-ring-color) focus-visible:ring-offset-(length:--lsys-input-focus-ring-offset) focus-visible:ring-offset-(--lsys-input-focus-ring-offset-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
    invalidStateClasses,
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        ghost:
          "border-transparent bg-transparent focus-visible:bg-(--lsys-input-background)",
      },
      size: {
        sm: "h-(--lsys-input-height-sm) px-(--lsys-input-padding-x-sm) text-(length:--lsys-input-font-size-sm)",
        md: "h-(--lsys-input-height-md) px-(--lsys-input-padding-x-md) text-(length:--lsys-input-font-size-md)",
        lg: "h-(--lsys-input-height-lg) px-(--lsys-input-padding-x-lg) text-(length:--lsys-input-font-size-lg)",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)
