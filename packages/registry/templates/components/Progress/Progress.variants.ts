/**
 * Progress.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const progressVariants = cva(
  "grid gap-(--nx-progress-gap) text-(length:--nx-progress-label-font-size) leading-(--nx-progress-label-font-line-height) text-(--nx-progress-label-foreground)",
)

export const progressTrackVariants = cva(
  "overflow-hidden rounded-(--nx-progress-track-radius) bg-(--nx-progress-track-background)",
  {
    variants: {
      size: {
        sm: "h-(--nx-progress-track-height-sm)",
        md: "h-(--nx-progress-track-height-md)",
        lg: "h-(--nx-progress-track-height-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const progressIndicatorVariants = cva(
  "h-full bg-(--nx-progress-indicator-background) transition-transform duration-(--nx-progress-transition-duration) ease-(--nx-progress-transition-easing) data-[indeterminate]:animate-pulse",
)
