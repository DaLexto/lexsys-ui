/**
 * DashboardShell.types.ts
 *
 * Public types for the DashboardShell template.
 */

import type { HTMLAttributes, ReactNode, Ref } from "react"

export interface DashboardShellProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}

export interface DashboardShellSidebarProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}

export interface DashboardShellHeaderProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>
  className?: string
  children?: ReactNode
}

export interface DashboardShellMainProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>
  className?: string
  children?: ReactNode
}

export interface DashboardShellBodyProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}
