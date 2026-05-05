/**
 * Slider.tsx
 *
 * Reference Slider component implementation.
 */

import { forwardRef } from "react"
import { Slider as BaseSlider } from "@base-ui/react/slider"
import type { SliderProps } from "./Slider.types"
import {
  sliderControlVariants,
  sliderIndicatorVariants,
  sliderThumbVariants,
  sliderTrackVariants,
  sliderVariants,
} from "./Slider.variants"
import { cn } from "@/lib/utils"

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      controlClassName,
      trackClassName,
      indicatorClassName,
      thumbClassName,
      ...props
    },
    ref,
  ) => {
    const rootClassName: SliderProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(sliderVariants(), userClassName)
    }

    return (
      <BaseSlider.Root ref={ref} className={rootClassName} {...props}>
        <BaseSlider.Control
          className={(state) =>
            cn(
              sliderControlVariants(),
              typeof controlClassName === "function"
                ? controlClassName(state)
                : controlClassName,
            )
          }
        >
          <BaseSlider.Track
            className={(state) =>
              cn(
                sliderTrackVariants(),
                typeof trackClassName === "function"
                  ? trackClassName(state)
                  : trackClassName,
              )
            }
          >
            <BaseSlider.Indicator
              className={(state) =>
                cn(
                  sliderIndicatorVariants(),
                  typeof indicatorClassName === "function"
                    ? indicatorClassName(state)
                    : indicatorClassName,
                )
              }
            />
          </BaseSlider.Track>
          <BaseSlider.Thumb
            className={(state) =>
              cn(
                sliderThumbVariants(),
                typeof thumbClassName === "function"
                  ? thumbClassName(state)
                  : thumbClassName,
              )
            }
          />
        </BaseSlider.Control>
      </BaseSlider.Root>
    )
  },
)

Slider.displayName = "Slider"
