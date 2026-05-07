/**
 * Input.tsx
 *
 * Reference Input component implementation.
 */

import { forwardRef } from "react"
import { Input as BaseInput } from "@base-ui/react/input"
import type { InputProps } from "./Input.types"
import { inputVariants } from "./Input.variants"
import { cn } from "@/lib/utils"

const Input = forwardRef<HTMLElement, InputProps>(
  ({ variant, size, className, isInvalid, ...props }, ref) => {
    const baseInputProps: Omit<
      InputProps,
      "className" | "isInvalid" | "size" | "variant"
    > = isInvalid ? { ...props, "aria-invalid": true } : props
    const inputClassName: InputProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(inputVariants({ variant, size }), userClassName)
    }

    return (
      <BaseInput ref={ref} className={inputClassName} {...baseInputProps} />
    )
  },
)

Input.displayName = "Input"

export { Input }
