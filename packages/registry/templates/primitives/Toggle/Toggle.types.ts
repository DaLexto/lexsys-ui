import type { Ref } from "react"
/**
 * Toggle.types.ts
 *
 * Public and internal types for Toggle component.
 */

import type { Toggle as BaseToggle } from "@base-ui/react/toggle"

export type ToggleSize = "sm" | "md" | "lg"

export interface ToggleProps extends Omit<
  BaseToggle.Props,
  "className" | "size"
> {
  ref?: Ref<HTMLButtonElement>
  size?: ToggleSize
  className?: BaseToggle.Props["className"]
}
