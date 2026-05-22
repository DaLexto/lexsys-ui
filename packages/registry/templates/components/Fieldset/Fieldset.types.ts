import type { Ref } from "react"
/**
 * Fieldset.types.ts
 *
 * Public and internal types for Fieldset component.
 */

import type { Fieldset as BaseFieldset } from "@base-ui/react/fieldset"

export interface FieldsetProps extends Omit<
  BaseFieldset.Root.Props,
  "className"
> {
  ref?: Ref<HTMLFieldSetElement>
  variant?: "surface" | "plain"
  className?: BaseFieldset.Root.Props["className"]
}

export interface FieldsetLegendProps extends Omit<
  BaseFieldset.Legend.Props,
  "className"
> {
  className?: BaseFieldset.Legend.Props["className"]
}
