/**
 * Slider.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const sliderVariants = cva("grid gap-2")

export const sliderControlVariants = cva(
  "relative flex touch-none items-center py-2 data-[disabled]:opacity-50",
)

export const sliderTrackVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-nx-muted",
)

export const sliderIndicatorVariants = cva("h-full bg-nx-primary")

export const sliderThumbVariants = cva(
  [
    "block size-5 rounded-full border border-nx-primary bg-nx-background shadow-sm",
    "outline-none transition-colors duration-[var(--nx-duration-control)] ease-[var(--nx-easing-standard)]",
    "focus-visible:ring-2 focus-visible:ring-nx-ring focus-visible:ring-offset-2 focus-visible:ring-offset-nx-background",
    "data-[disabled]:cursor-not-allowed",
  ].join(" "),
)
