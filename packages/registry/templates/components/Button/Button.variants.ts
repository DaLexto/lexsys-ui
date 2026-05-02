/**
 * Button.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap border border-transparent",
    "rounded-[var(--nx-button-radius)] font-[var(--nx-button-font-weight)]",
    "transition-colors duration-[var(--nx-button-transition-duration)] ease-[var(--nx-easing-standard)]",
    "outline-none focus-visible:ring-2 focus-visible:ring-nx-ring focus-visible:ring-offset-2 focus-visible:ring-offset-nx-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-busy:cursor-wait aria-busy:opacity-80",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-nx-primary text-nx-primary-foreground hover:bg-nx-primary-hover",
        secondary:
          "border-nx-border bg-nx-muted text-nx-foreground hover:bg-nx-surface",
      },
      size: {
        xs: "h-[var(--nx-button-height-xs)] px-[var(--nx-button-padding-x-xs)]",
        sm: "h-[var(--nx-button-height-sm)] px-[var(--nx-button-padding-x-sm)]",
        md: "h-[var(--nx-button-height-md)] px-[var(--nx-button-padding-x-md)]",
        lg: "h-[var(--nx-button-height-lg)] px-[var(--nx-button-padding-x-lg)]",
        xl: "h-[var(--nx-button-height-xl)] px-[var(--nx-button-padding-x-xl)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)
