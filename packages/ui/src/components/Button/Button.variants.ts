/**
 * Button.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap border border-transparent",
    "rounded-[var(--nx-button-radius)] [font-family:var(--nx-button-font-family)] font-[var(--nx-button-font-weight)]",
    "transition-colors duration-[var(--nx-button-transition-duration)] ease-[var(--nx-button-transition-easing)]",
    "outline-none focus-visible:ring-[length:var(--nx-button-focus-ring-width)] focus-visible:ring-[var(--nx-button-focus-ring-color)] focus-visible:ring-offset-[length:var(--nx-button-focus-ring-offset)] focus-visible:ring-offset-[var(--nx-button-focus-ring-offset-color)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-busy:cursor-wait aria-busy:opacity-80",
    "text-[length:var(--nx-button-font-size-md)]",
    "leading-[var(--nx-button-font-line-height)]",
    "tracking-[var(--nx-button-font-letter-spacing)]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "border-[var(--nx-button-primary-border-color)] bg-[var(--nx-button-primary-background)] text-[var(--nx-button-primary-foreground)] hover:bg-[var(--nx-button-primary-hover-background)]",
        secondary:
          "border-[var(--nx-button-secondary-border-color)] bg-[var(--nx-button-secondary-background)] text-[var(--nx-button-secondary-foreground)] hover:bg-[var(--nx-button-secondary-hover-background)]",
      },
      size: {
        xs: [
          "h-[var(--nx-button-height-xs)]",
          "px-[var(--nx-button-padding-x-xs)]",
          "text-[length:var(--nx-button-font-size-xs)]",
        ],
        sm: [
          "h-[var(--nx-button-height-sm)]",
          "px-[var(--nx-button-padding-x-sm)]",
          "text-[length:var(--nx-button-font-size-sm)]",
        ],
        md: [
          "h-[var(--nx-button-height-md)]",
          "px-[var(--nx-button-padding-x-md)]",
          "text-[length:var(--nx-button-font-size-md)]",
        ],
        lg: [
          "h-[var(--nx-button-height-lg)]",
          "px-[var(--nx-button-padding-x-lg)]",
          "text-[length:var(--nx-button-font-size-lg)]",
        ],
        xl: [
          "h-[var(--nx-button-height-xl)]",
          "px-[var(--nx-button-padding-x-xl)]",
          "text-[length:var(--nx-button-font-size-xl)]",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)
