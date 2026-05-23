/**
 * Form.tsx
 *
 * Reference Form component implementation.
 */

import { Form as BaseForm } from "@base-ui/react/form"
import type { FormProps } from "./Form.types"
import { formVariants } from "./Form.variants"
import { mergeClassName } from "../../../utils/merge-class-name"

const Form = ({ ref, className, ...props }: FormProps) => {
  return (
    <BaseForm
      ref={ref}
      className={mergeClassName(formVariants(), className)}
      {...props}
    />
  )
}

Form.displayName = "Form"

export { Form }
