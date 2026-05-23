/**
 * DashboardShell.tsx
 *
 * Reference DashboardShell template — composes Sidebar block + layout shell.
 */

import { Sidebar } from "../../blocks/Sidebar/Sidebar"
import type { DashboardShellProps } from "./DashboardShell.types"
import {
  dashboardShellContentVariants,
  dashboardShellHeaderVariants,
  dashboardShellMainVariants,
  dashboardShellVariants,
} from "./DashboardShell.variants"
import { cn } from "@/lib/utils"

const DashboardShell = ({
  ref,
  className,
  brand,
  sidebarItems,
  header,
  children,
}: DashboardShellProps) => {
  return (
    <div ref={ref} className={cn(dashboardShellVariants(), className)}>
      <Sidebar brand={brand} items={sidebarItems} />
      <div className={dashboardShellMainVariants()}>
        {header ? (
          <header className={dashboardShellHeaderVariants()}>{header}</header>
        ) : null}
        <main className={dashboardShellContentVariants()}>{children}</main>
      </div>
    </div>
  )
}

DashboardShell.displayName = "DashboardShell"

export { DashboardShell }
