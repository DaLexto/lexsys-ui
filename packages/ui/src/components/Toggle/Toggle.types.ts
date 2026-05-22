import type { Ref } from "react"
/**
 * Toggle.types.ts
 *
 * Public and internal types for Toggle component.
 */

import type { Toggle as BaseToggle } from "@base-ui/react/toggle"

export interface ToggleProps extends Omit<
  BaseToggle.Props,
  "className" | "size"
> {
  ref?: Ref<HTMLButtonElement>
  size?: "sm" | "md" | "lg"
  className?: BaseToggle.Props["className"]
}
