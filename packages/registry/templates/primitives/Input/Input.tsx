/**
 * Input.tsx
 *
 * Reference Input component implementation.
 */

import { Input as BaseInput } from "@base-ui/react/input"
import type { InputProps } from "./Input.types"
import { inputVariants } from "./Input.variants"
import { mergeClassName } from "@/lib/utils"

const Input = ({
  ref,
  variant,
  size,
  className,
  isInvalid,
  ...props
}: InputProps) => {
  const baseInputProps: Omit<
    InputProps,
    "className" | "isInvalid" | "size" | "variant"
  > = isInvalid ? { ...props, "aria-invalid": true } : props

  return (
    <BaseInput
      ref={ref}
      className={mergeClassName(inputVariants({ variant, size }), className)}
      {...baseInputProps}
    />
  )
}

Input.displayName = "Input"

export { Input }
