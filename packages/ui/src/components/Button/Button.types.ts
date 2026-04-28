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
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  className?: string
  focusableWhenDisabled?: boolean
}
