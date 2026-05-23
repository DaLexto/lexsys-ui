import type { Ref } from "react"
/**
 * Switch.types.ts
 *
 * Public and internal types for Switch component.
 */

import type { Switch as BaseSwitch } from "@base-ui/react/switch"

export interface SwitchProps extends Omit<
  BaseSwitch.Root.Props,
  "className" | "children"
> {
  ref?: Ref<HTMLElement>
  size?: "sm" | "md" | "lg"
  className?: BaseSwitch.Root.Props["className"]
  thumbClassName?: BaseSwitch.Thumb.Props["className"]
}
