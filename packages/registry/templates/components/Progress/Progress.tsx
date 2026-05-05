/**
 * Progress.tsx
 *
 * Reference Progress component implementation.
 */

import { forwardRef } from "react"
import { Progress as BaseProgress } from "@base-ui/react/progress"
import type { ProgressProps } from "./Progress.types"
import {
  progressIndicatorVariants,
  progressTrackVariants,
  progressVariants,
} from "./Progress.variants"
import { cn } from "@/lib/utils"

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    { size, label, className, trackClassName, indicatorClassName, ...props },
    ref,
  ) => {
    const rootClassName: ProgressProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(progressVariants(), userClassName)
    }
    const trackClassNames: ProgressProps["trackClassName"] = (state) => {
      const userClassName =
        typeof trackClassName === "function"
          ? trackClassName(state)
          : trackClassName

      return cn(progressTrackVariants({ size }), userClassName)
    }
    const indicatorClassNames: ProgressProps["indicatorClassName"] = (
      state,
    ) => {
      const userClassName =
        typeof indicatorClassName === "function"
          ? indicatorClassName(state)
          : indicatorClassName

      return cn(progressIndicatorVariants(), userClassName)
    }

    return (
      <BaseProgress.Root ref={ref} className={rootClassName} {...props}>
        {label === undefined ? null : <span>{label}</span>}
        <BaseProgress.Track className={trackClassNames}>
          <BaseProgress.Indicator className={indicatorClassNames} />
        </BaseProgress.Track>
      </BaseProgress.Root>
    )
  },
)

Progress.displayName = "Progress"
