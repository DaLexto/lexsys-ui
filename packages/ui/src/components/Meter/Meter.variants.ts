/**
 * Meter.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const meterVariants = cva(
  "grid gap-(--nx-meter-gap) text-(length:--nx-meter-label-font-size) leading-(--nx-meter-label-font-line-height) text-(--nx-meter-label-foreground)",
)

export const meterHeaderVariants = cva(
  "flex items-center justify-between gap-(--nx-meter-header-gap)",
)

export const meterLabelVariants = cva(
  "font-(--nx-meter-label-font-weight) text-(--nx-meter-label-foreground)",
)

export const meterValueVariants = cva(
  "font-(--nx-meter-value-font-weight) text-(--nx-meter-value-foreground)",
)

export const meterTrackVariants = cva(
  "overflow-hidden rounded-(--nx-meter-track-radius) bg-(--nx-meter-track-background)",
  {
    variants: {
      size: {
        sm: "h-(--nx-meter-track-height-sm)",
        md: "h-(--nx-meter-track-height-md)",
        lg: "h-(--nx-meter-track-height-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const meterIndicatorVariants = cva(
  [
    "h-full bg-(--nx-meter-indicator-background) transition-transform",
    "duration-(--nx-meter-transition-duration) ease-(--nx-meter-transition-easing)",
    "data-[complete]:bg-(--nx-meter-indicator-background-complete)",
  ].join(" "),
)
