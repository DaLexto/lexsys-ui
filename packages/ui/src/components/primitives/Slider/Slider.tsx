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
  sliderClasses,
  sliderControlClasses,
  sliderIndicatorClasses,
  sliderLabelClasses,
  sliderThumbClasses,
  sliderTrackClasses,
  sliderValueClasses,
} from "./Slider.variants"
import { mergeClassName } from "../../../utils/merge-class-name"

const Slider = ({ ref, className, children, ...props }: SliderProps) => {
  return (
    <BaseSlider.Root
      ref={ref}
      className={mergeClassName(sliderClasses, className)}
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
      className={mergeClassName(sliderControlClasses, className)}
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
      className={mergeClassName(sliderTrackClasses, className)}
      {...props}
    >
      {children}
    </BaseSlider.Track>
  )
}

SliderTrack.displayName = "SliderTrack"

const SliderIndicator = ({ className, ...props }: SliderIndicatorProps) => {
  return (
    <BaseSlider.Indicator
      className={mergeClassName(sliderIndicatorClasses, className)}
      {...props}
    />
  )
}

SliderIndicator.displayName = "SliderIndicator"

const SliderThumb = ({ className, ...props }: SliderThumbProps) => {
  return (
    <BaseSlider.Thumb
      className={mergeClassName(sliderThumbClasses, className)}
      {...props}
    />
  )
}

SliderThumb.displayName = "SliderThumb"

const SliderLabel = ({ className, ...props }: SliderLabelProps) => {
  return (
    <BaseSlider.Label
      className={mergeClassName(sliderLabelClasses, className)}
      {...props}
    />
  )
}

SliderLabel.displayName = "SliderLabel"

const SliderValue = ({ className, ...props }: SliderValueProps) => {
  return (
    <BaseSlider.Value
      className={mergeClassName(sliderValueClasses, className)}
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
