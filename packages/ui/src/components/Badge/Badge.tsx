/**
 * Badge.tsx
 *
 * Reference Badge component implementation.
 */

import type { BadgeProps } from "./Badge.types"
import { badgeVariants } from "./Badge.variants"
import { cn } from "../../utils/cn"

const Badge = ({
  ref,
  variant,
  tone,
  size,
  className,
  ...props
}: BadgeProps) => {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, tone, size }), className)}
      {...props}
    />
  )
}

Badge.displayName = "Badge"

export { Badge }
