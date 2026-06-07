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
import type { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible"
import type { BadgeProps } from "../../primitives/Badge/Badge.types"
import type { ButtonProps } from "../../primitives/Button/Button.types"
import type {
  CollapsiblePanelProps,
  CollapsibleProps,
} from "../../primitives/Collapsible/Collapsible.types"
import type { InputProps } from "../../primitives/Input/Input.types"
import type { SeparatorProps } from "../../primitives/Separator/Separator.types"

export type SidebarCollapsible = "none" | "icon" | "offcanvas"
export type SidebarSide = "left" | "right"

export interface SidebarProviderProps {
  children?: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultCollapsed?: boolean
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  collapsible?: SidebarCollapsible
  side?: SidebarSide
  persistKey?: string
}

export interface SidebarContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
  isMobile: boolean
  collapsible: SidebarCollapsible
  side: SidebarSide
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>
  className?: string
  children?: ReactNode
  collapsible?: SidebarCollapsible
  side?: SidebarSide
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

export type SidebarGroupCollapsibleProps = Omit<CollapsibleProps, "variant">

export interface SidebarGroupCollapsibleTriggerProps extends Omit<
  BaseCollapsible.Trigger.Props,
  "className"
> {
  ref?: Ref<HTMLButtonElement>
  className?: string
  children?: ReactNode
}

export interface SidebarGroupCollapsiblePanelProps extends CollapsiblePanelProps {
  ref?: Ref<HTMLDivElement>
  className?: string
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
  /** Disables row interaction; inherited by child nav item parts unless overridden. */
  disabled?: boolean
}

export interface SidebarNavActiveOptions {
  /** When true, only an exact pathname match is active. Defaults to `true`. */
  end?: boolean
}

export interface SidebarItemLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: Ref<HTMLAnchorElement>
  active?: boolean
  disabled?: boolean
  /**
   * Background chrome owner. `disclosureLead` defers hover/active fill to
   * `SidebarItemRow variant="disclosure"`.
   */
  chrome?: "default" | "disclosureLead"
  className?: string
  children?: ReactNode
}

export interface SidebarItemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>
  active?: boolean
  disabled?: boolean
  className?: string
  children?: ReactNode
}

export type SidebarInputProps = InputProps

export type SidebarSeparatorProps = SeparatorProps

export interface SidebarItemSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  /** Renders an icon-sized pulse block. Defaults to `true`. */
  showIcon?: boolean
  /** Indented skeleton for nested `SidebarSubList` rows. */
  indent?: boolean
}

export interface SidebarTriggerProps extends Omit<ButtonProps, "type"> {
  ref?: Ref<HTMLButtonElement>
  children?: ReactNode
}

export interface SidebarCollapseTriggerProps extends Omit<ButtonProps, "type"> {
  ref?: Ref<HTMLButtonElement>
  children?: ReactNode
}

export interface SidebarRailProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>
  className?: string
}

export interface SidebarMobileHeaderProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}

export interface SidebarExpandableProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>
  className?: string
  children?: ReactNode
}

export interface SidebarItemBadgeProps extends BadgeProps {
  /**
   * Force dot indicator instead of the count badge.
   * Defaults to dot when the sidebar is icon-collapsed on desktop.
   */
  dot?: boolean
}

export interface SidebarItemRowProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  /** `disclosure` paints one shared row shell for link lead + expand trigger. */
  variant?: "default" | "disclosure"
  className?: string
  children?: ReactNode
}

export interface SidebarItemTrailingProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}

/** @deprecated Place `SidebarItemTrailing` inside `SidebarItemLink` / `SidebarItemButton`. */
export type SidebarItemAdornmentsProps = SidebarItemTrailingProps

export interface SidebarItemExpandTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>
  /** `disclosure` suppresses per-cell hover fill — row shell owns chrome. */
  variant?: "default" | "disclosure"
  className?: string
  open?: boolean
}

export interface SidebarItemIconProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>
  className?: string
  children?: ReactNode
}

export interface SidebarItemActionProps extends Omit<
  ButtonProps,
  "type" | "variant" | "size"
> {
  ref?: Ref<HTMLButtonElement>
  showOnHover?: boolean
}

export interface SidebarItemShortcutProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>
  className?: string
  children?: ReactNode
}

export interface SidebarGroupActionProps extends Omit<
  ButtonProps,
  "type" | "variant" | "size"
> {
  ref?: Ref<HTMLButtonElement>
}

export interface SidebarSubListProps extends HTMLAttributes<HTMLUListElement> {
  ref?: Ref<HTMLUListElement>
  className?: string
  children?: ReactNode
}

export interface SidebarSubItemLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: Ref<HTMLAnchorElement>
  active?: boolean
  disabled?: boolean
  className?: string
  children?: ReactNode
}

export interface SidebarSubItemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>
  active?: boolean
  disabled?: boolean
  className?: string
  children?: ReactNode
}

export interface SidebarShellOptions {
  collapsed?: boolean
  collapsible?: SidebarCollapsible
  side?: SidebarSide
}
