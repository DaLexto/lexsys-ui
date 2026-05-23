/**
 * ToggleGroup.tsx
 *
 * Reference ToggleGroup component implementation.
 */

import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group"
import type { ToggleGroupProps } from "./ToggleGroup.types"
import { toggleGroupVariants } from "./ToggleGroup.variants"
import { mergeClassName } from "../../../utils/merge-class-name"

const ToggleGroup = ({
  ref,
  size,
  orientation = "horizontal",
  className,
  ...props
}: ToggleGroupProps) => {
  return (
    <BaseToggleGroup
      ref={ref}
      orientation={orientation}
      className={mergeClassName(
        toggleGroupVariants({ size, orientation }),
        className,
      )}
      {...props}
    />
  )
}

ToggleGroup.displayName = "ToggleGroup"

export { ToggleGroup }
