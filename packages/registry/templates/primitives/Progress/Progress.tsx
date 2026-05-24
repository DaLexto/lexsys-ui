/**
 * Progress.tsx
 *
 * Reference Progress component implementation.
 */

import { Progress as BaseProgress } from "@base-ui/react/progress"
import type {
  ProgressIndicatorProps,
  ProgressLabelProps,
  ProgressProps,
  ProgressTrackProps,
  ProgressValueProps,
} from "./Progress.types"
import {
  progressIndicatorVariants,
  progressLabelVariants,
  progressTrackVariants,
  progressValueVariants,
  progressVariants,
} from "./Progress.variants"
import { mergeClassName } from "@/lib/utils"

const Progress = ({ ref, className, children, ...props }: ProgressProps) => {
  return (
    <BaseProgress.Root
      ref={ref}
      className={mergeClassName(progressVariants(), className)}
      {...props}
    >
      {children}
    </BaseProgress.Root>
  )
}

Progress.displayName = "Progress"

const ProgressLabel = ({ className, ...props }: ProgressLabelProps) => {
  return (
    <BaseProgress.Label
      className={mergeClassName(progressLabelVariants(), className)}
      {...props}
    />
  )
}

ProgressLabel.displayName = "ProgressLabel"

const ProgressTrack = ({
  size = "md",
  className,
  children,
  ...props
}: ProgressTrackProps) => {
  return (
    <BaseProgress.Track
      className={mergeClassName(progressTrackVariants({ size }), className)}
      {...props}
    >
      {children}
    </BaseProgress.Track>
  )
}

ProgressTrack.displayName = "ProgressTrack"

const ProgressIndicator = ({ className, ...props }: ProgressIndicatorProps) => {
  return (
    <BaseProgress.Indicator
      className={mergeClassName(progressIndicatorVariants(), className)}
      {...props}
    />
  )
}

ProgressIndicator.displayName = "ProgressIndicator"

const ProgressValue = ({ className, ...props }: ProgressValueProps) => {
  return (
    <BaseProgress.Value
      className={mergeClassName(progressValueVariants(), className)}
      {...props}
    />
  )
}

ProgressValue.displayName = "ProgressValue"

export {
  Progress,
  ProgressLabel,
  ProgressTrack,
  ProgressIndicator,
  ProgressValue,
}
