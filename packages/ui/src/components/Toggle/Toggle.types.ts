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
  size?: "sm" | "md" | "lg"
  className?: BaseToggle.Props["className"]
}
