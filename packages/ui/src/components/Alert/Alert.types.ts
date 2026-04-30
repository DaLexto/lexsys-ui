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
  tone?: "neutral" | "primary" | "destructive"
  className?: string
}

export interface AlertTitleProps extends Omit<
  HTMLAttributes<HTMLHeadingElement>,
  "className"
> {
  className?: string
}

export interface AlertDescriptionProps extends Omit<
  HTMLAttributes<HTMLParagraphElement>,
  "className"
> {
  className?: string
}
