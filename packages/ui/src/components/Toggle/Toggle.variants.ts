/**
 * Toggle.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center rounded-[var(--nx-button-radius)] border border-nx-border bg-nx-background text-nx-foreground",
    "[font-family:var(--nx-button-font-family)] font-[var(--nx-button-font-weight)] leading-[var(--nx-button-font-line-height)] tracking-[var(--nx-button-font-letter-spacing)]",
    "transition-colors duration-[var(--nx-button-transition-duration)] ease-[var(--nx-easing-standard)]",
    "outline-none hover:bg-nx-muted data-[pressed]:border-nx-primary data-[pressed]:bg-nx-primary data-[pressed]:text-nx-primary-foreground",
    "focus-visible:ring-2 focus-visible:ring-nx-ring focus-visible:ring-offset-2 focus-visible:ring-offset-nx-background",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-[var(--nx-button-height-sm)] px-[var(--nx-button-padding-x-sm)] text-[length:var(--nx-button-font-size-sm)]",
        md: "h-[var(--nx-button-height-md)] px-[var(--nx-button-padding-x-md)] text-[length:var(--nx-button-font-size-md)]",
        lg: "h-[var(--nx-button-height-lg)] px-[var(--nx-button-padding-x-lg)] text-[length:var(--nx-button-font-size-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)
