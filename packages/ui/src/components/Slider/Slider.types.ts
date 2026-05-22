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
  controlClassName?: BaseSlider.Control.Props["className"]
  trackClassName?: BaseSlider.Track.Props["className"]
  indicatorClassName?: BaseSlider.Indicator.Props["className"]
  thumbClassName?: BaseSlider.Thumb.Props["className"]
}
