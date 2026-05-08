/**
 * ToggleGroup.tsx
 *
 * Reference ToggleGroup component implementation.
 */

import { forwardRef } from "react"
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group"
import type { ToggleGroupProps } from "./ToggleGroup.types"
import { toggleGroupVariants } from "./ToggleGroup.variants"
import { cn } from "@/lib/utils"

const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ size, orientation = "horizontal", className, ...props }, ref) => {
    const toggleGroupClassName: ToggleGroupProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(toggleGroupVariants({ size, orientation }), userClassName)
    }

    return (
      <BaseToggleGroup
        ref={ref}
        orientation={orientation}
        className={toggleGroupClassName}
        {...props}
      />
    )
  },
)

ToggleGroup.displayName = "ToggleGroup"

export { ToggleGroup }
