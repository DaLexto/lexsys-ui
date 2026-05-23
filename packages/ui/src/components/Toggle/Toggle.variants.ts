/**
 * Toggle.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center rounded-(--nx-toggle-radius) border",
    "border-(--nx-toggle-border-color) bg-(--nx-toggle-background) text-(--nx-toggle-foreground)",
    "font-(family-name:--nx-toggle-font-family) font-(--nx-toggle-font-weight) leading-(--nx-toggle-font-line-height) tracking-(--nx-toggle-font-letter-spacing)",
    "transition-colors duration-(--nx-toggle-transition-duration) ease-(--nx-toggle-transition-easing)",
    "outline-none hover:bg-(--nx-toggle-hover-background) data-[pressed]:border-(--nx-toggle-pressed-border-color) data-[pressed]:bg-(--nx-toggle-pressed-background) data-[pressed]:text-(--nx-toggle-pressed-foreground)",
    "focus-visible:ring-(length:--nx-toggle-focus-ring-width) focus-visible:ring-(--nx-toggle-focus-ring-color) focus-visible:ring-offset-(length:--nx-toggle-focus-ring-offset) focus-visible:ring-offset-(--nx-toggle-focus-ring-offset-color)",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-(--nx-toggle-height-sm) px-(--nx-toggle-padding-x-sm) text-(length:--nx-toggle-font-size-sm)",
        md: "h-(--nx-toggle-height-md) px-(--nx-toggle-padding-x-md) text-(length:--nx-toggle-font-size-md)",
        lg: "h-(--nx-toggle-height-lg) px-(--nx-toggle-padding-x-lg) text-(length:--nx-toggle-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)
