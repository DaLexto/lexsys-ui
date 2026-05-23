import type { Ref } from "react"
/**
 * Meter.types.ts
 *
 * Public and internal types for Meter component.
 */

import type { ReactNode } from "react"
import type { Meter as BaseMeter } from "@base-ui/react/meter"

export interface MeterProps extends Omit<
  BaseMeter.Root.Props,
  "className" | "size"
> {
  ref?: Ref<HTMLDivElement>
  size?: "sm" | "md" | "lg"
  label?: ReactNode
  showValue?: boolean
  className?: BaseMeter.Root.Props["className"]
  trackClassName?: BaseMeter.Track.Props["className"]
  indicatorClassName?: BaseMeter.Indicator.Props["className"]
  labelClassName?: BaseMeter.Label.Props["className"]
  valueClassName?: BaseMeter.Value.Props["className"]
}

export interface MeterTrackProps extends Omit<
  BaseMeter.Track.Props,
  "className" | "size"
> {
  size?: "sm" | "md" | "lg"
  className?: BaseMeter.Track.Props["className"]
}

export interface MeterIndicatorProps extends Omit<
  BaseMeter.Indicator.Props,
  "className"
> {
  className?: BaseMeter.Indicator.Props["className"]
}

export type MeterValueProps = BaseMeter.Value.Props

export type MeterLabelProps = BaseMeter.Label.Props
