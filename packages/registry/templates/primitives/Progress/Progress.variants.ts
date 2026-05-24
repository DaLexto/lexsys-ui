/**
 * Progress.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const progressVariants = cva(
  "grid gap-(--lsys-progress-gap) text-(length:--lsys-progress-label-font-size) leading-(--lsys-progress-label-font-line-height) text-(--lsys-progress-label-foreground)",
)

export const progressTrackVariants = cva(
  "overflow-hidden rounded-(--lsys-progress-track-radius) bg-(--lsys-progress-track-background)",
  {
    variants: {
      size: {
        sm: "h-(--lsys-progress-track-height-sm)",
        md: "h-(--lsys-progress-track-height-md)",
        lg: "h-(--lsys-progress-track-height-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const progressIndicatorVariants = cva(
  "h-full bg-(--lsys-progress-indicator-background) transition-transform duration-(--lsys-progress-transition-duration) ease-(--lsys-progress-transition-easing) data-[indeterminate]:animate-pulse",
)
