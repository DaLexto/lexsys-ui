/**
 * Button.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap border border-transparent",
    "rounded-(--nx-button-radius) font-(family-name:--nx-button-font-family) font-(--nx-button-font-weight)",
    "transition-colors duration-(--nx-button-transition-duration) ease-(--nx-button-transition-easing)",
    "outline-none focus-visible:ring-(length:--nx-button-focus-ring-width) focus-visible:ring-(--nx-button-focus-ring-color) focus-visible:ring-offset-(length:--nx-button-focus-ring-offset) focus-visible:ring-offset-(--nx-button-focus-ring-offset-color)",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-busy:cursor-wait aria-busy:opacity-80",
    "text-(length:--nx-button-font-size-md)",
    "leading-(--nx-button-font-line-height)",
    "tracking-(--nx-button-font-letter-spacing)",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "border-(--nx-button-primary-border-color) bg-(--nx-button-primary-background) text-(--nx-button-primary-foreground) hover:bg-(--nx-button-primary-hover-background)",
        secondary:
          "border-(--nx-button-secondary-border-color) bg-(--nx-button-secondary-background) text-(--nx-button-secondary-foreground) hover:bg-(--nx-button-secondary-hover-background)",
      },
      size: {
        xs: [
          "h-(--nx-button-height-xs)",
          "px-(--nx-button-padding-x-xs)",
          "text-(length:--nx-button-font-size-xs)",
        ],
        sm: [
          "h-(--nx-button-height-sm)",
          "px-(--nx-button-padding-x-sm)",
          "text-(length:--nx-button-font-size-sm)",
        ],
        md: [
          "h-(--nx-button-height-md)",
          "px-(--nx-button-padding-x-md)",
          "text-(length:--nx-button-font-size-md)",
        ],
        lg: [
          "h-(--nx-button-height-lg)",
          "px-(--nx-button-padding-x-lg)",
          "text-(length:--nx-button-font-size-lg)",
        ],
        xl: [
          "h-(--nx-button-height-xl)",
          "px-(--nx-button-padding-x-xl)",
          "text-(length:--nx-button-font-size-xl)",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)
