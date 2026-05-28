/**
 * Slider.variants.ts
 *
 * Defines visual variants using class composition.
 */

export const sliderClasses = "grid gap-(--lex-slider-gap)"

export const sliderControlClasses =
  "relative flex touch-none items-center py-(--lex-slider-control-padding-y) data-[disabled]:opacity-(--lex-opacity-disabled)"

export const sliderTrackClasses =
  "relative h-(--lex-slider-track-height) w-full overflow-hidden rounded-(--lex-slider-track-radius) bg-(--lex-slider-track-background)"

export const sliderIndicatorClasses =
  "h-full bg-(--lex-slider-indicator-background)"

export const sliderThumbClasses = [
  "block size-(--lex-slider-thumb-size) rounded-(--lex-slider-thumb-radius) border border-(--lex-slider-thumb-border-color) bg-(--lex-slider-thumb-background) shadow-sm",
  "outline-none transition-colors duration-(--lex-slider-transition-duration) ease-(--lex-slider-transition-easing)",
  "focus-visible:ring-(length:--lex-slider-focus-ring-width) focus-visible:ring-(--lex-slider-focus-ring-color) focus-visible:ring-offset-(length:--lex-slider-focus-ring-offset) focus-visible:ring-offset-(--lex-slider-focus-ring-offset-color)",
  "data-[disabled]:cursor-not-allowed",
].join(" ")

export const sliderLabelClasses =
  "font-(--lex-meter-label-font-weight) text-(length:--lex-meter-label-font-size) leading-(--lex-meter-label-font-line-height) text-(--lex-meter-label-foreground)"

export const sliderValueClasses =
  "font-(--lex-meter-value-font-weight) text-(--lex-meter-value-foreground)"
