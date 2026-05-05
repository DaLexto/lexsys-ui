/**
 * Input.types.ts
 *
 * Public and internal types for Input component.
 */

import type { Input as BaseInput } from "@base-ui/react/input"

export interface InputProps extends Omit<
  BaseInput.Props,
  "className" | "size"
> {
  variant?: "default" | "ghost"
  size?: "sm" | "md" | "lg"
  isInvalid?: boolean
  className?: string
}
