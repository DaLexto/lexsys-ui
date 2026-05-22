/**
 * Textarea.tsx
 *
 * Reference Textarea component implementation.
 */

import { Field as BaseField } from "@base-ui/react/field"
import type { TextareaProps } from "./Textarea.types"
import { textareaVariants } from "./Textarea.variants"
import { mergeClassName } from "../../utils/merge-class-name"

const Textarea = ({
  ref,
  variant,
  size,
  resize,
  rows,
  className,
  isInvalid,
  ...props
}: TextareaProps) => {
  const baseTextareaProps: Omit<
    TextareaProps,
    "className" | "isInvalid" | "resize" | "rows" | "size" | "variant"
  > = isInvalid ? { ...props, "aria-invalid": true } : props

  return (
    <BaseField.Control
      ref={ref}
      className={mergeClassName(
        textareaVariants({ variant, size, resize }),
        className,
      )}
      render={<textarea rows={rows} />}
      {...baseTextareaProps}
    />
  )
}

Textarea.displayName = "Textarea"

export { Textarea }
