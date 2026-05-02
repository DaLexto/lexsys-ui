/**
 * Button.types.ts
 *
 * Public and internal types for Button component.
 */

import type { ButtonHTMLAttributes } from "react"

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> {
  variant?: "primary" | "secondary"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  isLoading?: boolean
  className?: string
  focusableWhenDisabled?: boolean
}
