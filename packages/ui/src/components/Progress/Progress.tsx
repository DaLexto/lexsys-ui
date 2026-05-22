/**
 * Progress.tsx
 *
 * Reference Progress component implementation.
 */

import { Progress as BaseProgress } from "@base-ui/react/progress"
import type { ProgressProps } from "./Progress.types"
import {
  progressIndicatorVariants,
  progressTrackVariants,
  progressVariants,
} from "./Progress.variants"
import { mergeClassName } from "../../utils/merge-class-name"

const Progress = ({
  ref,
  size,
  label,
  className,
  trackClassName,
  indicatorClassName,
  ...props
}: ProgressProps) => {
  return (
    <BaseProgress.Root
      ref={ref}
      className={mergeClassName(progressVariants(), className)}
      {...props}
    >
      {label === undefined ? null : <span>{label}</span>}
      <BaseProgress.Track
        className={mergeClassName(
          progressTrackVariants({ size }),
          trackClassName,
        )}
      >
        <BaseProgress.Indicator
          className={mergeClassName(
            progressIndicatorVariants(),
            indicatorClassName,
          )}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  )
}

Progress.displayName = "Progress"

export { Progress }
