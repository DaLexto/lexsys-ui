import type { Ref } from "react"
/**
 * Progress.types.ts
 *
 * Public and internal types for Progress component.
 */

import type { Progress as BaseProgress } from "@base-ui/react/progress"

export type ProgressSize = "sm" | "md" | "lg"

export interface ProgressProps extends Omit<
  BaseProgress.Root.Props,
  "className" | "children"
> {
  ref?: Ref<HTMLDivElement>
  className?: BaseProgress.Root.Props["className"]
  children?: BaseProgress.Root.Props["children"]
}

export interface ProgressTrackProps extends Omit<
  BaseProgress.Track.Props,
  "className" | "children"
> {
  size?: ProgressSize
  className?: BaseProgress.Track.Props["className"]
  children?: BaseProgress.Track.Props["children"]
}

export interface ProgressIndicatorProps extends Omit<
  BaseProgress.Indicator.Props,
  "className"
> {
  className?: BaseProgress.Indicator.Props["className"]
}

export type ProgressLabelProps = BaseProgress.Label.Props

export type ProgressValueProps = BaseProgress.Value.Props
