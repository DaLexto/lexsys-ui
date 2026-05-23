/**
 * Sidebar.types.ts
 *
 * Public types for the Sidebar block.
 */

import type { ReactNode, Ref } from "react"

export interface SidebarNavItem {
  id: string
  label: string
  href?: string
  onSelect?: () => void
  active?: boolean
}

export interface SidebarProps {
  ref?: Ref<HTMLElement>
  className?: string
  brand?: ReactNode
  items: SidebarNavItem[]
  mobileTriggerLabel?: string
}
