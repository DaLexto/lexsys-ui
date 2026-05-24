/**
 * Slider.tsx
 *
 * Reference Slider component implementation.
 */

import { Slider as BaseSlider } from "@base-ui/react/slider"
import type {
  SliderControlProps,
  SliderIndicatorProps,
  SliderLabelProps,
  SliderProps,
  SliderThumbProps,
  SliderTrackProps,
  SliderValueProps,
} from "./Slider.types"
import {
  sliderControlVariants,
  sliderIndicatorVariants,
  sliderLabelVariants,
  sliderThumbVariants,
  sliderTrackVariants,
  sliderValueVariants,
  sliderVariants,
} from "./Slider.variants"
import { mergeClassName } from "@/lib/utils"

const Slider = ({ ref, className, children, ...props }: SliderProps) => {
  return (
    <BaseSlider.Root
      ref={ref}
      className={mergeClassName(sliderVariants(), className)}
      {...props}
    >
      {children}
    </BaseSlider.Root>
  )
}

Slider.displayName = "Slider"

const SliderControl = ({
  className,
  children,
  ...props
}: SliderControlProps) => {
  return (
    <BaseSlider.Control
      className={mergeClassName(sliderControlVariants(), className)}
      {...props}
    >
      {children}
    </BaseSlider.Control>
  )
}

SliderControl.displayName = "SliderControl"

const SliderTrack = ({ className, children, ...props }: SliderTrackProps) => {
  return (
    <BaseSlider.Track
      className={mergeClassName(sliderTrackVariants(), className)}
      {...props}
    >
      {children}
    </BaseSlider.Track>
  )
}

SliderTrack.displayName = "SliderTrack"

const SliderIndicator = ({
  className,
  ...props
}: SliderIndicatorProps) => {
  return (
    <BaseSlider.Indicator
      className={mergeClassName(sliderIndicatorVariants(), className)}
      {...props}
    />
  )
}

SliderIndicator.displayName = "SliderIndicator"

const SliderThumb = ({ className, ...props }: SliderThumbProps) => {
  return (
    <BaseSlider.Thumb
      className={mergeClassName(sliderThumbVariants(), className)}
      {...props}
    />
  )
}

SliderThumb.displayName = "SliderThumb"

const SliderLabel = ({ className, ...props }: SliderLabelProps) => {
  return (
    <BaseSlider.Label
      className={mergeClassName(sliderLabelVariants(), className)}
      {...props}
    />
  )
}

SliderLabel.displayName = "SliderLabel"

const SliderValue = ({ className, ...props }: SliderValueProps) => {
  return (
    <BaseSlider.Value
      className={mergeClassName(sliderValueVariants(), className)}
      {...props}
    />
  )
}

SliderValue.displayName = "SliderValue"

export {
  Slider,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
  SliderLabel,
  SliderValue,
}
