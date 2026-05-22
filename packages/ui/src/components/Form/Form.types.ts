import type { Ref } from "react"
/**
 * Form.types.ts
 *
 * Public and internal types for Form component.
 */

import type { Form as BaseForm } from "@base-ui/react/form"

export interface FormProps extends Omit<BaseForm.Props, "className"> {
  ref?: Ref<HTMLFormElement>
  className?: BaseForm.Props["className"]
}
