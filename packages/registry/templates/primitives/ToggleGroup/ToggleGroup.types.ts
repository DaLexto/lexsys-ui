import type { Ref } from "react"
/**
 * ToggleGroup.types.ts
 *
 * Public and internal types for ToggleGroup component.
 */

import type { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group"

export type ToggleGroupSize = "sm" | "md" | "lg"

export interface ToggleGroupProps<Value extends string = string> extends Omit<
  BaseToggleGroup.Props<Value>,
  "className" | "size"
> {
  ref?: Ref<HTMLDivElement>
  size?: ToggleGroupSize
  className?: BaseToggleGroup.Props<Value>["className"]
}
