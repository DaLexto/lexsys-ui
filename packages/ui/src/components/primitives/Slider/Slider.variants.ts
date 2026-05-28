/**
 * Slider.variants.ts
 *
 * Defines visual variants using class composition.
 */

export const sliderClasses = "grid gap-(--lsys-slider-gap)"

export const sliderControlClasses =
  "relative flex touch-none items-center py-(--lsys-slider-control-padding-y) data-[disabled]:opacity-(--lsys-opacity-disabled)"

export const sliderTrackClasses =
  "relative h-(--lsys-slider-track-height) w-full overflow-hidden rounded-(--lsys-slider-track-radius) bg-(--lsys-slider-track-background)"

export const sliderIndicatorClasses = "h-full bg-(--lsys-slider-indicator-background)"

export const sliderThumbClasses = [
  "block size-(--lsys-slider-thumb-size) rounded-(--lsys-slider-thumb-radius) border border-(--lsys-slider-thumb-border-color) bg-(--lsys-slider-thumb-background) shadow-sm",
  "outline-none transition-colors duration-(--lsys-slider-transition-duration) ease-(--lsys-slider-transition-easing)",
  "focus-visible:ring-(length:--lsys-slider-focus-ring-width) focus-visible:ring-(--lsys-slider-focus-ring-color) focus-visible:ring-offset-(length:--lsys-slider-focus-ring-offset) focus-visible:ring-offset-(--lsys-slider-focus-ring-offset-color)",
  "data-[disabled]:cursor-not-allowed",
].join(" ")

export const sliderLabelClasses =
  "font-(--lsys-meter-label-font-weight) text-(length:--lsys-meter-label-font-size) leading-(--lsys-meter-label-font-line-height) text-(--lsys-meter-label-foreground)"

export const sliderValueClasses =
  "font-(--lsys-meter-value-font-weight) text-(--lsys-meter-value-foreground)"
