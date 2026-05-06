/**
 * Form.tsx
 *
 * Reference Form component implementation.
 */

import { forwardRef } from "react"
import { Form as BaseForm } from "@base-ui/react/form"
import type { FormProps } from "./Form.types"
import { formVariants } from "./Form.variants"
import { cn } from "@/lib/utils"

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    const formClassName: FormProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(formVariants(), userClassName)
    }

    return <BaseForm ref={ref} className={formClassName} {...props} />
  },
)

Form.displayName = "Form"
