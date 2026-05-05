/**
 * Tabs.tsx
 *
 * Reference Tabs component implementation.
 */

import { forwardRef } from "react"
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
import { cn } from "@/lib/utils"

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, ...props }, ref) => {
    const rootClassName: TabsProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(tabsRootVariants(), userClassName)
    }

    return <BaseTabs.Root ref={ref} className={rootClassName} {...props} />
  },
)

Tabs.displayName = "Tabs"

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => {
    const listClassName: TabsListProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(tabsListVariants(), userClassName)
    }

    return <BaseTabs.List ref={ref} className={listClassName} {...props} />
  },
)

TabsList.displayName = "TabsList"

export const TabsTab = forwardRef<HTMLElement, TabsTabProps>(
  ({ className, ...props }, ref) => {
    const tabClassName: TabsTabProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(tabsTabVariants(), userClassName)
    }

    return <BaseTabs.Tab ref={ref} className={tabClassName} {...props} />
  },
)

TabsTab.displayName = "TabsTab"

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ className, ...props }, ref) => {
    const panelClassName: TabsPanelProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(tabsPanelVariants(), userClassName)
    }

    return <BaseTabs.Panel ref={ref} className={panelClassName} {...props} />
  },
)

TabsPanel.displayName = "TabsPanel"
