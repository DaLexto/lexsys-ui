/**
 * Meter.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const meterVariants = cva(
  "grid gap-[var(--nx-meter-gap)] text-[length:var(--nx-meter-label-font-size)] leading-[var(--nx-meter-label-font-line-height)] text-[var(--nx-meter-label-foreground)]",
)

export const meterHeaderVariants = cva(
  "flex items-center justify-between gap-[var(--nx-meter-header-gap)]",
)

export const meterLabelVariants = cva(
  "font-[var(--nx-meter-label-font-weight)] text-[var(--nx-meter-label-foreground)]",
)

export const meterValueVariants = cva(
  "font-[var(--nx-meter-value-font-weight)] text-[var(--nx-meter-value-foreground)]",
)

export const meterTrackVariants = cva(
  "overflow-hidden rounded-[var(--nx-meter-track-radius)] bg-[var(--nx-meter-track-background)]",
  {
    variants: {
      size: {
        sm: "h-[var(--nx-meter-track-height-sm)]",
        md: "h-[var(--nx-meter-track-height-md)]",
        lg: "h-[var(--nx-meter-track-height-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const meterIndicatorVariants = cva(
  [
    "h-full bg-[var(--nx-meter-indicator-background)] transition-transform",
    "duration-[var(--nx-meter-transition-duration)] ease-[var(--nx-meter-transition-easing)]",
    "data-[complete]:bg-[var(--nx-meter-indicator-background-complete)]",
  ].join(" "),
)
