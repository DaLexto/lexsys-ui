/**
 * Meter.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const meterVariants = cva(
  "grid gap-(--lsys-meter-gap) text-(length:--lsys-meter-label-font-size) leading-(--lsys-meter-label-font-line-height) text-(--lsys-meter-label-foreground)",
)

export const meterHeaderVariants = cva(
  "flex items-center justify-between gap-(--lsys-meter-header-gap)",
)

export const meterLabelVariants = cva(
  "font-(--lsys-meter-label-font-weight) text-(--lsys-meter-label-foreground)",
)

export const meterValueVariants = cva(
  "font-(--lsys-meter-value-font-weight) text-(--lsys-meter-value-foreground)",
)

export const meterTrackVariants = cva(
  "overflow-hidden rounded-(--lsys-meter-track-radius) bg-(--lsys-meter-track-background)",
  {
    variants: {
      size: {
        sm: "h-(--lsys-meter-track-height-sm)",
        md: "h-(--lsys-meter-track-height-md)",
        lg: "h-(--lsys-meter-track-height-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const meterIndicatorVariants = cva(
  [
    "h-full bg-(--lsys-meter-indicator-background) transition-transform",
    "duration-(--lsys-meter-transition-duration) ease-(--lsys-meter-transition-easing)",
    "data-[complete]:bg-(--lsys-meter-indicator-background-complete)",
  ].join(" "),
)
