/**
 * Sidebar.types.ts
 *
 * Public types for the Sidebar block.
 */

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  LiHTMLAttributes,
  ReactNode,
  Ref,
} from "react"
import type { ButtonProps } from "../../primitives/Button/Button.types"

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>
  className?: string
  children?: ReactNode
}

export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}

export interface SidebarContentProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>
  className?: string
  children?: ReactNode
}

export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}

export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}

export interface SidebarGroupLabelProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}

export interface SidebarGroupContentProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}

export interface SidebarListProps extends HTMLAttributes<HTMLUListElement> {
  ref?: Ref<HTMLUListElement>
  className?: string
  children?: ReactNode
}

export interface SidebarItemProps extends LiHTMLAttributes<HTMLLIElement> {
  ref?: Ref<HTMLLIElement>
  className?: string
  children?: ReactNode
}

export interface SidebarItemLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: Ref<HTMLAnchorElement>
  active?: boolean
  className?: string
  children?: ReactNode
}

export interface SidebarItemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>
  active?: boolean
  className?: string
  children?: ReactNode
}

export interface SidebarTriggerProps extends Omit<ButtonProps, "type"> {
  ref?: Ref<HTMLButtonElement>
  children?: ReactNode
}

export interface SidebarMobileHeaderProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}
