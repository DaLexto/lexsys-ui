import type { Ref } from "react"
/**
 * Slider.types.ts
 *
 * Public and internal types for Slider component.
 */

import type { Slider as BaseSlider } from "@base-ui/react/slider"

export interface SliderProps extends Omit<
  BaseSlider.Root.Props,
  "className" | "children"
> {
  ref?: Ref<HTMLDivElement>
  className?: BaseSlider.Root.Props["className"]
  children?: BaseSlider.Root.Props["children"]
}

export interface SliderControlProps extends Omit<
  BaseSlider.Control.Props,
  "className" | "children"
> {
  className?: BaseSlider.Control.Props["className"]
  children?: BaseSlider.Control.Props["children"]
}

export interface SliderTrackProps extends Omit<
  BaseSlider.Track.Props,
  "className" | "children"
> {
  className?: BaseSlider.Track.Props["className"]
  children?: BaseSlider.Track.Props["children"]
}

export interface SliderIndicatorProps extends Omit<
  BaseSlider.Indicator.Props,
  "className"
> {
  className?: BaseSlider.Indicator.Props["className"]
}

export interface SliderThumbProps extends Omit<
  BaseSlider.Thumb.Props,
  "className"
> {
  className?: BaseSlider.Thumb.Props["className"]
}

export type SliderLabelProps = BaseSlider.Label.Props

export type SliderValueProps = BaseSlider.Value.Props
