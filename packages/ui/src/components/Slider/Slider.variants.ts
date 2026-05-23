/**
 * Slider.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const sliderVariants = cva("grid gap-(--nx-slider-gap)")

export const sliderControlVariants = cva(
  "relative flex touch-none items-center py-(--nx-slider-control-padding-y) data-[disabled]:opacity-(--nx-opacity-disabled)",
)

export const sliderTrackVariants = cva(
  "relative h-(--nx-slider-track-height) w-full overflow-hidden rounded-(--nx-slider-track-radius) bg-(--nx-slider-track-background)",
)

export const sliderIndicatorVariants = cva(
  "h-full bg-(--nx-slider-indicator-background)",
)

export const sliderThumbVariants = cva(
  [
    "block size-(--nx-slider-thumb-size) rounded-(--nx-slider-thumb-radius) border border-(--nx-slider-thumb-border-color) bg-(--nx-slider-thumb-background) shadow-sm",
    "outline-none transition-colors duration-(--nx-slider-transition-duration) ease-(--nx-slider-transition-easing)",
    "focus-visible:ring-(length:--nx-slider-focus-ring-width) focus-visible:ring-(--nx-slider-focus-ring-color) focus-visible:ring-offset-(length:--nx-slider-focus-ring-offset) focus-visible:ring-offset-(--nx-slider-focus-ring-offset-color)",
    "data-[disabled]:cursor-not-allowed",
  ].join(" "),
)
