/**
 * Progress.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const progressVariants = cva(
  "grid gap-[var(--nx-progress-gap)] text-[length:var(--nx-progress-label-font-size)] leading-[var(--nx-progress-label-font-line-height)] text-[var(--nx-progress-label-foreground)]",
)

export const progressTrackVariants = cva(
  "overflow-hidden rounded-[var(--nx-progress-track-radius)] bg-[var(--nx-progress-track-background)]",
  {
    variants: {
      size: {
        sm: "h-[var(--nx-progress-track-height-sm)]",
        md: "h-[var(--nx-progress-track-height-md)]",
        lg: "h-[var(--nx-progress-track-height-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const progressIndicatorVariants = cva(
  "h-full bg-[var(--nx-progress-indicator-background)] transition-transform duration-[var(--nx-progress-transition-duration)] ease-[var(--nx-progress-transition-easing)] data-[indeterminate]:animate-pulse",
)
