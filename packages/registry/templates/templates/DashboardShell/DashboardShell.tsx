/**
 * DashboardShell.tsx
 *
 * Reference DashboardShell template — compound layout shell.
 */

import type {
  DashboardShellHeaderProps,
  DashboardShellMainProps,
  DashboardShellProps,
  DashboardShellSidebarProps,
  DashboardShellBodyProps,
} from "./DashboardShell.types"
import {
  dashboardShellContentVariants,
  dashboardShellHeaderVariants,
  dashboardShellMainVariants,
  dashboardShellSidebarVariants,
  dashboardShellVariants,
} from "./DashboardShell.variants"
import { cn } from "@/lib/utils"

const DashboardShell = ({
  ref,
  className,
  children,
  ...props
}: DashboardShellProps) => {
  return (
    <div
      ref={ref}
      className={cn(dashboardShellVariants(), className)}
      {...props}
    >
      {children}
    </div>
  )
}

DashboardShell.displayName = "DashboardShell"

const DashboardShellSidebar = ({
  ref,
  className,
  children,
  ...props
}: DashboardShellSidebarProps) => {
  return (
    <div
      ref={ref}
      className={cn(dashboardShellSidebarVariants(), className)}
      {...props}
    >
      {children}
    </div>
  )
}

DashboardShellSidebar.displayName = "DashboardShellSidebar"

const DashboardShellHeader = ({
  ref,
  className,
  children,
  ...props
}: DashboardShellHeaderProps) => {
  return (
    <header
      ref={ref}
      className={cn(dashboardShellHeaderVariants(), className)}
      {...props}
    >
      {children}
    </header>
  )
}

DashboardShellHeader.displayName = "DashboardShellHeader"

const DashboardShellMain = ({
  ref,
  className,
  children,
  ...props
}: DashboardShellMainProps) => {
  return (
    <main
      ref={ref}
      className={cn(dashboardShellContentVariants(), className)}
      {...props}
    >
      {children}
    </main>
  )
}

DashboardShellMain.displayName = "DashboardShellMain"

const DashboardShellBody = ({
  ref,
  className,
  children,
  ...props
}: DashboardShellBodyProps) => {
  return (
    <div
      ref={ref}
      className={cn(dashboardShellMainVariants(), className)}
      {...props}
    >
      {children}
    </div>
  )
}

DashboardShellBody.displayName = "DashboardShellBody"

export {
  DashboardShell,
  DashboardShellSidebar,
  DashboardShellHeader,
  DashboardShellMain,
  DashboardShellBody,
}
