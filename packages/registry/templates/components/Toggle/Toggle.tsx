/**
 * Toggle.tsx
 *
 * Reference Toggle component implementation.
 */

import { forwardRef } from "react"
import { Toggle as BaseToggle } from "@base-ui/react/toggle"
import type { ToggleProps } from "./Toggle.types"
import { toggleVariants } from "./Toggle.variants"
import { cn } from "@/lib/utils"

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ size, className, ...props }, ref) => {
    const toggleClassName: ToggleProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(toggleVariants({ size }), userClassName)
    }

    return <BaseToggle ref={ref} className={toggleClassName} {...props} />
  },
)

Toggle.displayName = "Toggle"
