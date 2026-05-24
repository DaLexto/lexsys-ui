import type { Ref } from "react"
/**
 * Collapsible.types.ts
 *
 * Public and internal types for Collapsible component.
 */

import type { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible"

export type CollapsibleVariant = "surface" | "plain"

export interface CollapsibleProps extends Omit<
  BaseCollapsible.Root.Props,
  "className"
> {
  ref?: Ref<HTMLDivElement>
  variant?: CollapsibleVariant
  className?: BaseCollapsible.Root.Props["className"]
}

export interface CollapsibleTriggerProps extends Omit<
  BaseCollapsible.Trigger.Props,
  "className"
> {
  className?: BaseCollapsible.Trigger.Props["className"]
}

export type CollapsiblePanelProps = BaseCollapsible.Panel.Props
