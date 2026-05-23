import type { Ref } from "react"
/**
 * Progress.types.ts
 *
 * Public and internal types for Progress component.
 */

import type { ReactNode } from "react"
import type { Progress as BaseProgress } from "@base-ui/react/progress"

export interface ProgressProps extends Omit<
  BaseProgress.Root.Props,
  "className" | "children"
> {
  ref?: Ref<HTMLDivElement>
  size?: "sm" | "md" | "lg"
  label?: ReactNode
  className?: BaseProgress.Root.Props["className"]
  trackClassName?: BaseProgress.Track.Props["className"]
  indicatorClassName?: BaseProgress.Indicator.Props["className"]
}
