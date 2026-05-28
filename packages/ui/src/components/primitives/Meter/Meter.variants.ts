/**
 * Meter.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const meterVariants = cva(
  "grid gap-(--lex-meter-gap) text-(length:--lex-meter-label-font-size) leading-(--lex-meter-label-font-line-height) text-(--lex-meter-label-foreground)",
)

export const meterHeaderVariants = cva(
  "flex items-center justify-between gap-(--lex-meter-header-gap)",
)

export const meterLabelVariants = cva(
  "font-(--lex-meter-label-font-weight) text-(--lex-meter-label-foreground)",
)

export const meterValueVariants = cva(
  "font-(--lex-meter-value-font-weight) text-(--lex-meter-value-foreground)",
)

export const meterTrackVariants = cva(
  "overflow-hidden rounded-(--lex-meter-track-radius) bg-(--lex-meter-track-background)",
  {
    variants: {
      size: {
        sm: "h-(--lex-meter-track-height-sm)",
        md: "h-(--lex-meter-track-height-md)",
        lg: "h-(--lex-meter-track-height-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const meterIndicatorVariants = cva(
  [
    "h-full bg-(--lex-meter-indicator-background) transition-transform",
    "duration-(--lex-meter-transition-duration) ease-(--lex-meter-transition-easing)",
    "data-[complete]:bg-(--lex-meter-indicator-background-complete)",
  ].join(" "),
)
