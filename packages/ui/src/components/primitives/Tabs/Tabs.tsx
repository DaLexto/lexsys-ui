/**
 * Tabs.tsx
 *
 * Reference Tabs component implementation.
 */

import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import type {
  TabsListProps,
  TabsPanelProps,
  TabsProps,
  TabsTabProps,
} from "./Tabs.types"
import {
  tabsListVariants,
  tabsPanelVariants,
  tabsRootVariants,
  tabsTabVariants,
} from "./Tabs.variants"
import { mergeClassName } from "../../../utils/merge-class-name"

const Tabs = ({ ref, className, ...props }: TabsProps) => {
  return (
    <BaseTabs.Root
      ref={ref}
      className={mergeClassName(tabsRootVariants(), className)}
      {...props}
    />
  )
}

Tabs.displayName = "Tabs"

const TabsList = ({ ref, className, ...props }: TabsListProps) => {
  return (
    <BaseTabs.List
      ref={ref}
      className={mergeClassName(tabsListVariants(), className)}
      {...props}
    />
  )
}

TabsList.displayName = "TabsList"

const TabsTab = ({ ref, className, ...props }: TabsTabProps) => {
  return (
    <BaseTabs.Tab
      ref={ref}
      className={mergeClassName(tabsTabVariants(), className)}
      {...props}
    />
  )
}

TabsTab.displayName = "TabsTab"

const TabsPanel = ({ ref, className, ...props }: TabsPanelProps) => {
  return (
    <BaseTabs.Panel
      ref={ref}
      className={mergeClassName(tabsPanelVariants(), className)}
      {...props}
    />
  )
}

TabsPanel.displayName = "TabsPanel"

export { Tabs, TabsList, TabsTab, TabsPanel }
