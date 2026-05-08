/**
 * Meter.tsx
 *
 * Reference Meter component implementation.
 */

import { forwardRef } from "react"
import { Meter as BaseMeter } from "@base-ui/react/meter"
import type {
  MeterIndicatorProps,
  MeterLabelProps,
  MeterProps,
  MeterTrackProps,
  MeterValueProps,
} from "./Meter.types"
import {
  meterHeaderVariants,
  meterIndicatorVariants,
  meterLabelVariants,
  meterTrackVariants,
  meterValueVariants,
  meterVariants,
} from "./Meter.variants"
import { cn } from "../../utils/cn"

const Meter = forwardRef<HTMLDivElement, MeterProps>(
  (
    {
      size,
      label,
      showValue,
      children,
      className,
      trackClassName,
      indicatorClassName,
      labelClassName,
      valueClassName,
      ...props
    },
    ref,
  ) => {
    const rootClassName: MeterProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(meterVariants(), userClassName)
    }

    if (children !== undefined) {
      return (
        <BaseMeter.Root ref={ref} className={rootClassName} {...props}>
          {children}
        </BaseMeter.Root>
      )
    }

    return (
      <BaseMeter.Root ref={ref} className={rootClassName} {...props}>
        {label === undefined && showValue !== true ? null : (
          <div className={meterHeaderVariants()}>
            {label === undefined ? null : (
              <MeterLabel className={labelClassName}>{label}</MeterLabel>
            )}
            {showValue === true ? (
              <MeterValue className={valueClassName} />
            ) : null}
          </div>
        )}
        <MeterTrack size={size} className={trackClassName}>
          <MeterIndicator className={indicatorClassName} />
        </MeterTrack>
      </BaseMeter.Root>
    )
  },
)

Meter.displayName = "Meter"

const MeterTrack = forwardRef<HTMLDivElement, MeterTrackProps>(
  ({ size, className, ...props }, ref) => {
    const trackClassName: MeterTrackProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(meterTrackVariants({ size }), userClassName)
    }

    return <BaseMeter.Track ref={ref} className={trackClassName} {...props} />
  },
)

MeterTrack.displayName = "MeterTrack"

const MeterIndicator = forwardRef<HTMLDivElement, MeterIndicatorProps>(
  ({ className, ...props }, ref) => {
    const indicatorClassName: MeterIndicatorProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(meterIndicatorVariants(), userClassName)
    }

    return (
      <BaseMeter.Indicator
        ref={ref}
        className={indicatorClassName}
        {...props}
      />
    )
  },
)

MeterIndicator.displayName = "MeterIndicator"

const MeterValue = forwardRef<HTMLSpanElement, MeterValueProps>(
  ({ className, ...props }, ref) => {
    const valueClassName: MeterValueProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(meterValueVariants(), userClassName)
    }

    return <BaseMeter.Value ref={ref} className={valueClassName} {...props} />
  },
)

MeterValue.displayName = "MeterValue"

const MeterLabel = forwardRef<HTMLSpanElement, MeterLabelProps>(
  ({ className, ...props }, ref) => {
    const labelClassName: MeterLabelProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(meterLabelVariants(), userClassName)
    }

    return <BaseMeter.Label ref={ref} className={labelClassName} {...props} />
  },
)

MeterLabel.displayName = "MeterLabel"

export { Meter, MeterTrack, MeterIndicator, MeterValue, MeterLabel }
