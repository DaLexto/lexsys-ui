/**
 * Slider.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const sliderVariants = cva("grid gap-[var(--nx-slider-gap)]")

export const sliderControlVariants = cva(
  "relative flex touch-none items-center py-[var(--nx-slider-control-padding-y)] data-[disabled]:opacity-50",
)

export const sliderTrackVariants = cva(
  "relative h-[var(--nx-slider-track-height)] w-full overflow-hidden rounded-[var(--nx-slider-track-radius)] bg-[var(--nx-slider-track-background)]",
)

export const sliderIndicatorVariants = cva(
  "h-full bg-[var(--nx-slider-indicator-background)]",
)

export const sliderThumbVariants = cva(
  [
    "block size-[var(--nx-slider-thumb-size)] rounded-[var(--nx-slider-thumb-radius)] border border-[var(--nx-slider-thumb-border-color)] bg-[var(--nx-slider-thumb-background)] shadow-sm",
    "outline-none transition-colors duration-[var(--nx-slider-transition-duration)] ease-[var(--nx-slider-transition-easing)]",
    "focus-visible:ring-2 focus-visible:ring-[var(--nx-slider-focus-ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nx-slider-focus-ring-offset-color)]",
    "data-[disabled]:cursor-not-allowed",
  ].join(" "),
)
