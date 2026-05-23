import type { Ref } from "react"
/**
 * Alert.types.ts
 *
 * Public and internal types for Alert component.
 */

import type { HTMLAttributes } from "react"

export interface AlertProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "className"
> {
  ref?: Ref<HTMLDivElement>
  variant?: "neutral" | "primary" | "danger"
  className?: string
}

export interface AlertTitleProps extends Omit<
  HTMLAttributes<HTMLHeadingElement>,
  "className"
> {
  ref?: Ref<HTMLHeadingElement>
  className?: string
}

export interface AlertDescriptionProps extends Omit<
  HTMLAttributes<HTMLParagraphElement>,
  "className"
> {
  ref?: Ref<HTMLParagraphElement>
  className?: string
}
