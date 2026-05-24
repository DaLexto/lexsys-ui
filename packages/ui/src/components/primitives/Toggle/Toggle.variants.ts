/**
 * Toggle.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center rounded-(--lsys-toggle-radius) border",
    "border-(--lsys-toggle-border-color) bg-(--lsys-toggle-background) text-(--lsys-toggle-foreground)",
    "font-(family-name:--lsys-toggle-font-family) font-(--lsys-toggle-font-weight) leading-(--lsys-toggle-font-line-height) tracking-(--lsys-toggle-font-letter-spacing)",
    "transition-colors duration-(--lsys-toggle-transition-duration) ease-(--lsys-toggle-transition-easing)",
    "outline-none hover:bg-(--lsys-toggle-hover-background) data-[pressed]:border-(--lsys-toggle-pressed-border-color) data-[pressed]:bg-(--lsys-toggle-pressed-background) data-[pressed]:text-(--lsys-toggle-pressed-foreground)",
    "focus-visible:ring-(length:--lsys-toggle-focus-ring-width) focus-visible:ring-(--lsys-toggle-focus-ring-color) focus-visible:ring-offset-(length:--lsys-toggle-focus-ring-offset) focus-visible:ring-offset-(--lsys-toggle-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-(--lsys-toggle-height-sm) px-(--lsys-toggle-padding-x-sm) text-(length:--lsys-toggle-font-size-sm)",
        md: "h-(--lsys-toggle-height-md) px-(--lsys-toggle-padding-x-md) text-(length:--lsys-toggle-font-size-md)",
        lg: "h-(--lsys-toggle-height-lg) px-(--lsys-toggle-padding-x-lg) text-(length:--lsys-toggle-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)
