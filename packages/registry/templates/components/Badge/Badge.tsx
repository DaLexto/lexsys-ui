/**
 * Badge.tsx
 *
 * Reference Badge component implementation.
 */

import { forwardRef } from "react"
import type { BadgeProps } from "./Badge.types"
import { badgeVariants } from "./Badge.variants"
import { cn } from "@/lib/utils"

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, tone, size, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, tone, size }), className)}
        {...props}
      />
    )
  },
)

Badge.displayName = "Badge"
