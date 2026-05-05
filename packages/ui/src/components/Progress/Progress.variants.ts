/**
 * Progress.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const progressVariants = cva(
  "grid gap-1.5 text-[length:var(--nx-typography-label-sm-font-size)] text-nx-muted-foreground",
)

export const progressTrackVariants = cva(
  "h-2 overflow-hidden rounded-full bg-nx-muted",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const progressIndicatorVariants = cva(
  "h-full bg-nx-primary transition-transform duration-[var(--nx-duration-surface)] ease-[var(--nx-easing-standard)] data-[indeterminate]:animate-pulse",
)
