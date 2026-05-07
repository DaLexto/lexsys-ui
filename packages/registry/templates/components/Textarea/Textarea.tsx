/**
 * Textarea.tsx
 *
 * Reference Textarea component implementation.
 */

import { forwardRef } from "react"
import { Field as BaseField } from "@base-ui/react/field"
import type { TextareaProps } from "./Textarea.types"
import { textareaVariants } from "./Textarea.variants"
import { cn } from "@/lib/utils"

export const Textarea = forwardRef<HTMLElement, TextareaProps>(
  ({ variant, size, resize, rows, className, isInvalid, ...props }, ref) => {
    const baseTextareaProps: Omit<
      TextareaProps,
      "className" | "isInvalid" | "resize" | "rows" | "size" | "variant"
    > = isInvalid ? { ...props, "aria-invalid": true } : props
    const textareaClassName: TextareaProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(textareaVariants({ variant, size, resize }), userClassName)
    }

    return (
      <BaseField.Control
        ref={ref}
        className={textareaClassName}
        render={<textarea rows={rows} />}
        {...baseTextareaProps}
      />
    )
  },
)

Textarea.displayName = "Textarea"
