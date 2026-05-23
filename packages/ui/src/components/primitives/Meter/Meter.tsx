/**
 * Meter.tsx
 *
 * Reference Meter component implementation.
 */

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
import { mergeClassName } from "../../../utils/merge-class-name"

const Meter = ({
  ref,
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
}: MeterProps) => {
  if (children !== undefined) {
    return (
      <BaseMeter.Root
        ref={ref}
        className={mergeClassName(meterVariants(), className)}
        {...props}
      >
        {children}
      </BaseMeter.Root>
    )
  }

  return (
    <BaseMeter.Root
      ref={ref}
      className={mergeClassName(meterVariants(), className)}
      {...props}
    >
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
}

Meter.displayName = "Meter"

const MeterTrack = ({ ref, size, className, ...props }: MeterTrackProps) => {
  return (
    <BaseMeter.Track
      ref={ref}
      className={mergeClassName(meterTrackVariants({ size }), className)}
      {...props}
    />
  )
}

MeterTrack.displayName = "MeterTrack"

const MeterIndicator = ({ ref, className, ...props }: MeterIndicatorProps) => {
  return (
    <BaseMeter.Indicator
      ref={ref}
      className={mergeClassName(meterIndicatorVariants(), className)}
      {...props}
    />
  )
}

MeterIndicator.displayName = "MeterIndicator"

const MeterValue = ({ ref, className, ...props }: MeterValueProps) => {
  return (
    <BaseMeter.Value
      ref={ref}
      className={mergeClassName(meterValueVariants(), className)}
      {...props}
    />
  )
}

MeterValue.displayName = "MeterValue"

const MeterLabel = ({ ref, className, ...props }: MeterLabelProps) => {
  return (
    <BaseMeter.Label
      ref={ref}
      className={mergeClassName(meterLabelVariants(), className)}
      {...props}
    />
  )
}

MeterLabel.displayName = "MeterLabel"

export { Meter, MeterTrack, MeterIndicator, MeterValue, MeterLabel }
