import type { Ref } from "react"
/**
 * Switch.types.ts
 *
 * Public and internal types for Switch component.
 */

import type { Switch as BaseSwitch } from "@base-ui/react/switch"

export type SwitchSize = "sm" | "md" | "lg"

export interface SwitchProps extends Omit<
  BaseSwitch.Root.Props,
  "className" | "children"
> {
  ref?: Ref<HTMLElement>
  size?: SwitchSize
  className?: BaseSwitch.Root.Props["className"]
  children?: BaseSwitch.Root.Props["children"]
}

export interface SwitchThumbProps extends Omit<
  BaseSwitch.Thumb.Props,
  "className"
> {
  ref?: Ref<HTMLElement>
  size?: SwitchSize
  className?: BaseSwitch.Thumb.Props["className"]
}
