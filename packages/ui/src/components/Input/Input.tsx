/**
 * Input.tsx
 *
 * Reference Input component implementation.
 */

import { forwardRef } from "react"
import type { InputProps } from "./Input.types"
import { inputVariants } from "./Input.variants"
import { cn } from "../../utils/cn"
// user edit
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      size,
      className,
      isInvalid,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ variant, size }), className)}
        aria-invalid={isInvalid || ariaInvalid || undefined}
        {...props}
      />
    )
  },
)

Input.displayName = "Input"
