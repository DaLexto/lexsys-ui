/**
 * Input.tsx
 *
 * Reference Input component implementation.
 */

import { forwardRef } from "react"
import { Input as BaseInput } from "@base-ui/react/input"
import type { InputProps } from "./Input.types"
import { inputVariants } from "./Input.variants"
import { cn } from "../../utils/cn"

export const Input = forwardRef<HTMLElement, InputProps>(
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
      <BaseInput
        ref={ref}
        className={cn(inputVariants({ variant, size }), className)}
        aria-invalid={isInvalid || ariaInvalid || undefined}
        {...props}
      />
    )
  },
)

Input.displayName = "Input"
