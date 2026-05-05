/**
 * Tabs.types.ts
 *
 * Public and internal types for Tabs component.
 */

import type { Tabs as BaseTabs } from "@base-ui/react/tabs"

export interface TabsProps extends Omit<BaseTabs.Root.Props, "className"> {
  className?: BaseTabs.Root.Props["className"]
}

export interface TabsListProps extends Omit<BaseTabs.List.Props, "className"> {
  className?: BaseTabs.List.Props["className"]
}

export interface TabsTabProps extends Omit<BaseTabs.Tab.Props, "className"> {
  className?: BaseTabs.Tab.Props["className"]
}

export interface TabsPanelProps extends Omit<
  BaseTabs.Panel.Props,
  "className"
> {
  className?: BaseTabs.Panel.Props["className"]
}
