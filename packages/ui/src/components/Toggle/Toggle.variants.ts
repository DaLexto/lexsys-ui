/**
 * Toggle.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center rounded-[var(--nx-toggle-radius)] border",
    "border-[var(--nx-toggle-border-color)] bg-[var(--nx-toggle-background)] text-[var(--nx-toggle-foreground)]",
    "[font-family:var(--nx-toggle-font-family)] font-[var(--nx-toggle-font-weight)] leading-[var(--nx-toggle-font-line-height)] tracking-[var(--nx-toggle-font-letter-spacing)]",
    "transition-colors duration-[var(--nx-toggle-transition-duration)] ease-[var(--nx-toggle-transition-easing)]",
    "outline-none hover:bg-[var(--nx-toggle-hover-background)] data-[pressed]:border-[var(--nx-toggle-pressed-border-color)] data-[pressed]:bg-[var(--nx-toggle-pressed-background)] data-[pressed]:text-[var(--nx-toggle-pressed-foreground)]",
    "focus-visible:ring-2 focus-visible:ring-[var(--nx-toggle-focus-ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nx-toggle-focus-ring-offset-color)]",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-[var(--nx-toggle-height-sm)] px-[var(--nx-toggle-padding-x-sm)] text-[length:var(--nx-toggle-font-size-sm)]",
        md: "h-[var(--nx-toggle-height-md)] px-[var(--nx-toggle-padding-x-md)] text-[length:var(--nx-toggle-font-size-md)]",
        lg: "h-[var(--nx-toggle-height-lg)] px-[var(--nx-toggle-padding-x-lg)] text-[length:var(--nx-toggle-font-size-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)
