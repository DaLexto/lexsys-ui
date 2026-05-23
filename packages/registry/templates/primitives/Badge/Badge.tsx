/**
 * Badge.tsx
 *
 * Reference Badge component implementation.
 */

import type { BadgeProps } from "./Badge.types"
import { badgeVariants } from "./Badge.variants"
import { cn } from "@/lib/utils"

const Badge = ({
  ref,
  variant,
  appearance,
  size,
  className,
  ...props
}: BadgeProps) => {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, appearance, size }), className)}
      {...props}
    />
  )
}

Badge.displayName = "Badge"

export { Badge }
