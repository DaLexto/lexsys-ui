/**
 * Form.types.ts
 *
 * Public and internal types for Form component.
 */

import type { Form as BaseForm } from "@base-ui/react/form"

export interface FormProps extends Omit<BaseForm.Props, "className"> {
  className?: BaseForm.Props["className"]
}
