import type { Ref } from "react"
/**
 * Tabs.types.ts
 *
 * Public and internal types for Tabs component.
 */

import type { Tabs as BaseTabs } from "@base-ui/react/tabs"

export interface TabsProps extends Omit<BaseTabs.Root.Props, "className"> {
  ref?: Ref<HTMLDivElement>
  className?: BaseTabs.Root.Props["className"]
}

export interface TabsListProps extends Omit<BaseTabs.List.Props, "className"> {
  className?: BaseTabs.List.Props["className"]
}

export interface TabsTabProps extends Omit<BaseTabs.Tab.Props, "className"> {
  className?: BaseTabs.Tab.Props["className"]
}

export type TabsPanelProps = BaseTabs.Panel.Props
