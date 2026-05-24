import type { Ref } from "react"
/**
 * CheckboxGroup.types.ts
 *
 * Public and internal types for CheckboxGroup component.
 */

import type { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group"

export interface CheckboxGroupProps extends Omit<
  BaseCheckboxGroup.Props,
  "className"
> {
  ref?: Ref<HTMLDivElement>
  orientation?: "horizontal" | "vertical"
  className?: BaseCheckboxGroup.Props["className"]
}
