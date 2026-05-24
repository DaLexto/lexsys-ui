import type { Ref } from "react"
/**
 * Badge.types.ts
 *
 * Public and internal types for Badge component.
 */

import type { HTMLAttributes } from "react"

export type BadgeVariant =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"

export type BadgeAppearance = "solid" | "outline"

export type BadgeSize = "sm" | "md"

export interface BadgeProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "className"
> {
  ref?: Ref<HTMLSpanElement>
  variant?: BadgeVariant
  appearance?: BadgeAppearance
  size?: BadgeSize
  className?: string
}
