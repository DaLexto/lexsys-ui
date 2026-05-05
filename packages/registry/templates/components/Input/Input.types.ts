/**
 * Input.types.ts
 *
 * Public and internal types for Input component.
 */

import type { InputHTMLAttributes } from "react"

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "size"
> {
  variant?: "default" | "ghost"
  size?: "sm" | "md" | "lg"
  isInvalid?: boolean
  className?: string
}
