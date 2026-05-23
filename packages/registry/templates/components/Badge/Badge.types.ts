import type { Ref } from "react"
/**
 * Badge.types.ts
 *
 * Public and internal types for Badge component.
 */

import type { HTMLAttributes } from "react"

export interface BadgeProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "className"
> {
  ref?: Ref<HTMLSpanElement>
  variant?: "neutral" | "primary" | "danger"
  appearance?: "solid" | "outline"
  size?: "sm" | "md"
  className?: string
}
