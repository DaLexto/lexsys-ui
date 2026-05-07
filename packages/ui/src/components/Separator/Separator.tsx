/**
 * Separator.tsx
 *
 * Reference Separator component implementation.
 */

import { forwardRef } from "react"
import { Separator as BaseSeparator } from "@base-ui/react/separator"
import type { SeparatorProps } from "./Separator.types"
import { separatorVariants } from "./Separator.variants"
import { cn } from "../../utils/cn"

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => {
    const separatorClassName: SeparatorProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(separatorVariants({ orientation }), userClassName)
    }

    return (
      <BaseSeparator
        ref={ref}
        orientation={orientation}
        className={separatorClassName}
        {...props}
      />
    )
  },
)

Separator.displayName = "Separator"

export { Separator }
