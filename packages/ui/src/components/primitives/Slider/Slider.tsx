/**
 * Slider.tsx
 *
 * Reference Slider component implementation.
 */

import { Slider as BaseSlider } from "@base-ui/react/slider"
import type { SliderProps } from "./Slider.types"
import {
  sliderControlVariants,
  sliderIndicatorVariants,
  sliderThumbVariants,
  sliderTrackVariants,
  sliderVariants,
} from "./Slider.variants"
import { mergeClassName } from "../../../utils/merge-class-name"

const Slider = ({
  ref,
  className,
  controlClassName,
  trackClassName,
  indicatorClassName,
  thumbClassName,
  ...props
}: SliderProps) => {
  return (
    <BaseSlider.Root
      ref={ref}
      className={mergeClassName(sliderVariants(), className)}
      {...props}
    >
      <BaseSlider.Control
        className={mergeClassName(sliderControlVariants(), controlClassName)}
      >
        <BaseSlider.Track
          className={mergeClassName(sliderTrackVariants(), trackClassName)}
        >
          <BaseSlider.Indicator
            className={mergeClassName(
              sliderIndicatorVariants(),
              indicatorClassName,
            )}
          />
        </BaseSlider.Track>
        <BaseSlider.Thumb
          className={mergeClassName(sliderThumbVariants(), thumbClassName)}
        />
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}

Slider.displayName = "Slider"

export { Slider }
