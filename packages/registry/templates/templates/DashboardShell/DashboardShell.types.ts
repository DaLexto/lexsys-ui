/**
 * DashboardShell.types.ts
 *
 * Public types for the DashboardShell template.
 */

import type { ReactNode, Ref } from "react"
import type { SidebarNavItem } from "../../blocks/Sidebar/Sidebar.types"

export interface DashboardShellProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  brand?: ReactNode
  sidebarItems: SidebarNavItem[]
  children?: ReactNode
  header?: ReactNode
}
