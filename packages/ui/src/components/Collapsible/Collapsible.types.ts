/**
 * Collapsible.types.ts
 *
 * Public and internal types for Collapsible component.
 */

import type { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible"

export interface CollapsibleProps extends Omit<
  BaseCollapsible.Root.Props,
  "className"
> {
  variant?: "surface" | "plain"
  className?: BaseCollapsible.Root.Props["className"]
}

export interface CollapsibleTriggerProps extends Omit<
  BaseCollapsible.Trigger.Props,
  "className"
> {
  className?: BaseCollapsible.Trigger.Props["className"]
}

export interface CollapsiblePanelProps extends Omit<
  BaseCollapsible.Panel.Props,
  "className"
> {
  className?: BaseCollapsible.Panel.Props["className"]
}
