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
  variant?: "solid" | "outline"
  tone?: "neutral" | "primary" | "destructive"
  size?: "sm" | "md"
  className?: string
}
