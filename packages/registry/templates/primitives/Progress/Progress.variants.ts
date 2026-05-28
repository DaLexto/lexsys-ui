/**
 * Progress.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const progressVariants = cva(
  "grid gap-(--lex-progress-gap) text-(length:--lex-progress-label-font-size) leading-(--lex-progress-label-font-line-height) text-(--lex-progress-label-foreground)",
)

export const progressTrackVariants = cva(
  "overflow-hidden rounded-(--lex-progress-track-radius) bg-(--lex-progress-track-background)",
  {
    variants: {
      size: {
        sm: "h-(--lex-progress-track-height-sm)",
        md: "h-(--lex-progress-track-height-md)",
        lg: "h-(--lex-progress-track-height-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const progressIndicatorVariants = cva(
  "h-full bg-(--lex-progress-indicator-background) transition-transform duration-(--lex-progress-transition-duration) ease-(--lex-progress-transition-easing) data-[indeterminate]:animate-pulse",
)

export const progressLabelVariants = cva(
  "text-(--lex-progress-label-foreground)",
)

export const progressValueVariants = cva(
  "font-(--lex-meter-value-font-weight) text-(--lex-meter-value-foreground)",
)
