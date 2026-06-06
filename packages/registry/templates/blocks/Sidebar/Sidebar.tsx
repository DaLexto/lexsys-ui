/**
 * Sidebar.tsx
 *
 * Reference Sidebar block — compound navigation shell with desktop and mobile drawer.
 */

import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react"
import { Badge } from "@/components/primitives/Badge"
import { Button } from "@/components/primitives/Button"
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@/components/primitives/Drawer"
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaViewport,
} from "@/components/primitives/ScrollArea"
import { isSidebarNavActive } from "./Sidebar.utils.js"
import type {
  SidebarCollapseTriggerProps,
  SidebarContentProps,
  SidebarContextValue,
  SidebarExpandableProps,
  SidebarFooterProps,
  SidebarGroupContentProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
  SidebarHeaderProps,
  SidebarGroupActionProps,
  SidebarItemActionProps,
  SidebarItemBadgeProps,
  SidebarItemButtonProps,
  SidebarItemIconProps,
  SidebarItemLinkProps,
  SidebarItemProps,
  SidebarItemShortcutProps,
  SidebarSubItemButtonProps,
  SidebarSubItemLinkProps,
  SidebarSubListProps,
  SidebarListProps,
  SidebarMobileHeaderProps,
  SidebarProps,
  SidebarProviderProps,
  SidebarRailProps,
  SidebarTriggerProps,
} from "./Sidebar.types"
import {
  sidebarBrandClasses,
  sidebarCollapsedItemClasses,
  sidebarCollapsedGroupLabelClasses,
  sidebarDesktopClasses,
  sidebarDrawerFooterClasses,
  sidebarExpandableClasses,
  sidebarFooterClasses,
  sidebarGroupActionClasses,
  sidebarGroupContentClasses,
  sidebarGroupLabelClasses,
  sidebarGroupClasses,
  sidebarItemActionClasses,
  sidebarItemBadgeClasses,
  sidebarItemIconClasses,
  sidebarItemShortcutClasses,
  sidebarItemBadgeCollapsedClasses,
  sidebarItemBadgeDotClasses,
  sidebarItemBadgeLabelClasses,
  sidebarItemClasses,
  sidebarMainClasses,
  sidebarMobileHeaderClasses,
  sidebarNavItemClasses,
  sidebarNavListClasses,
  sidebarNavClasses,
  sidebarSubListClasses,
  sidebarSubNavItemClasses,
  sidebarRailClasses,
  sidebarRootClasses,
} from "./Sidebar.variants"
import { cn } from "@/lib/utils"

const MD_MEDIA_QUERY = "(min-width: 768px)"

const SIDEBAR_NAV_ITEM_SELECTOR =
  "a.lex-sidebar__item, button.lex-sidebar__item"

const getSidebarNavItems = (nav: HTMLElement): HTMLElement[] => {
  return Array.from(
    nav.querySelectorAll<HTMLElement>(SIDEBAR_NAV_ITEM_SELECTOR),
  ).filter((item) => {
    if (item.hasAttribute("disabled")) {
      return false
    }

    if (item.getAttribute("aria-disabled") === "true") {
      return false
    }

    if (item.closest("[hidden], [aria-hidden='true']")) {
      return false
    }

    return true
  })
}

const handleSidebarNavKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
  const { key, currentTarget } = event

  if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(key)) {
    return
  }

  const items = getSidebarNavItems(currentTarget)

  if (items.length === 0) {
    return
  }

  const activeIndex = items.indexOf(document.activeElement as HTMLElement)
  let nextIndex = activeIndex

  if (key === "ArrowDown") {
    nextIndex = activeIndex === -1 ? 0 : (activeIndex + 1) % items.length
  } else if (key === "ArrowUp") {
    nextIndex =
      activeIndex === -1
        ? items.length - 1
        : (activeIndex - 1 + items.length) % items.length
  } else if (key === "Home") {
    nextIndex = 0
  } else if (key === "End") {
    nextIndex = items.length - 1
  }

  if (nextIndex !== activeIndex || activeIndex === -1) {
    event.preventDefault()
    items[nextIndex]?.focus()
  }
}

const getSidebarActiveLinkProps = (active?: boolean) => {
  return active ? ({ "aria-current": "page" } as const) : undefined
}

const getDesktopMediaQuery = () => {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return null
  }

  return window.matchMedia(MD_MEDIA_QUERY)
}

const subscribeDesktopMedia = (onStoreChange: () => void) => {
  const mediaQuery = getDesktopMediaQuery()

  if (!mediaQuery) {
    return () => undefined
  }

  mediaQuery.addEventListener("change", onStoreChange)
  return () => mediaQuery.removeEventListener("change", onStoreChange)
}

const getIsDesktopSnapshot = () => getDesktopMediaQuery()?.matches ?? true

const getIsDesktopServerSnapshot = () => true

const readPersistedCollapsed = (persistKey: string): boolean => {
  if (typeof window === "undefined") return false
  return localStorage.getItem(persistKey) === "true"
}

const defaultSidebarContext: SidebarContextValue = {
  open: false,
  setOpen: () => undefined,
  collapsed: false,
  setCollapsed: () => undefined,
  toggleSidebar: () => undefined,
  isMobile: false,
  collapsible: "none",
  side: "left",
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

const useSidebarContext = () =>
  useContext(SidebarContext) ?? defaultSidebarContext

const useSidebar = () => {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider")
  }

  return context
}

interface SidebarMobileContextValue {
  closeOnSelect: boolean
}

const SidebarMobileContext = createContext<SidebarMobileContextValue>({
  closeOnSelect: false,
})

const useSidebarMobileContext = () => useContext(SidebarMobileContext)

const SidebarProvider = ({
  children,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  defaultCollapsed = false,
  collapsed: collapsedProp,
  onCollapsedChange,
  collapsible = "none",
  side = "left",
  persistKey,
}: SidebarProviderProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(() => {
    if (persistKey) {
      return readPersistedCollapsed(persistKey)
    }

    return defaultCollapsed
  })

  const open = openProp ?? uncontrolledOpen
  const collapsed = collapsedProp ?? uncontrolledCollapsed
  const isDesktop = useSyncExternalStore(
    subscribeDesktopMedia,
    getIsDesktopSnapshot,
    getIsDesktopServerSnapshot,
  )
  const isMobile = !isDesktop

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (openProp === undefined) {
        setUncontrolledOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    },
    [onOpenChange, openProp],
  )

  const setCollapsed = useCallback(
    (nextCollapsed: boolean) => {
      if (collapsedProp === undefined) {
        setUncontrolledCollapsed(nextCollapsed)
      }

      if (persistKey && typeof window !== "undefined") {
        localStorage.setItem(persistKey, String(nextCollapsed))
      }

      onCollapsedChange?.(nextCollapsed)
    },
    [collapsedProp, onCollapsedChange, persistKey],
  )

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpen(!open)
      return
    }

    if (collapsible !== "none") {
      setCollapsed(!collapsed)
    }
  }, [collapsed, collapsible, isMobile, open, setCollapsed, setOpen])

  const value = useMemo<SidebarContextValue>(
    () => ({
      open,
      setOpen,
      collapsed,
      setCollapsed,
      toggleSidebar,
      isMobile,
      collapsible,
      side,
    }),
    [
      collapsed,
      collapsible,
      isMobile,
      open,
      setCollapsed,
      setOpen,
      side,
      toggleSidebar,
    ],
  )

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}

SidebarProvider.displayName = "SidebarProvider"

const isSidebarMobileHeaderChild = (child: ReactNode): boolean => {
  return (
    isValidElement(child) &&
    (child.type as { displayName?: string }).displayName ===
      "SidebarMobileHeader"
  )
}

const partitionSidebarChildren = (children: ReactNode) => {
  const mobileHeader: ReactNode[] = []
  const rest: ReactNode[] = []

  Children.forEach(children, (child) => {
    if (isSidebarMobileHeaderChild(child)) {
      mobileHeader.push(child)
      return
    }

    rest.push(child)
  })

  return { mobileHeader, rest }
}

const Sidebar = ({
  ref,
  className,
  children,
  collapsible: collapsibleProp,
  side: sideProp,
  ...props
}: SidebarProps) => {
  const {
    open,
    setOpen,
    collapsed,
    collapsible: contextCollapsible,
    side: contextSide,
  } = useSidebarContext()

  const collapsible = collapsibleProp ?? contextCollapsible
  const side = sideProp ?? contextSide
  const shellOptions = { collapsed, collapsible, side }
  const { mobileHeader, rest } = partitionSidebarChildren(children)

  const sidebarBody = (
    <SidebarMobileContext.Provider value={{ closeOnSelect: false }}>
      {rest}
    </SidebarMobileContext.Provider>
  )

  const drawerBody = (
    <SidebarMobileContext.Provider value={{ closeOnSelect: true }}>
      {rest}
      <div className={sidebarDrawerFooterClasses()}>
        <DrawerClose render={<Button variant="secondary" size="sm" />}>
          Close
        </DrawerClose>
      </div>
    </SidebarMobileContext.Provider>
  )

  return (
    <aside
      ref={ref}
      className={cn(sidebarRootClasses(shellOptions), className)}
      data-collapsed={collapsed ? "true" : "false"}
      data-collapsible={collapsible}
      data-side={side}
      {...props}
    >
      <Drawer
        open={open}
        onOpenChange={setOpen}
        swipeDirection={side === "right" ? "right" : "left"}
      >
        {mobileHeader.length > 0 ? (
          <div className="flex items-center gap-3 border-b border-[var(--lex-border-default)] bg-[var(--lex-color-background-base)] px-[var(--lex-space-4)] py-[var(--lex-space-3)] md:hidden">
            {mobileHeader}
          </div>
        ) : null}
        <div className={cn("relative", sidebarDesktopClasses(shellOptions))}>
          {sidebarBody}
          {collapsible !== "none" ? <SidebarRail /> : null}
        </div>
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerViewport side={side}>
            <DrawerPopup side={side} size="sm">
              <DrawerClose aria-label="Close navigation" />
              <DrawerContent className={sidebarMainClasses()}>
                <DrawerTitle className="sr-only">Navigation</DrawerTitle>
                <DrawerDescription className="sr-only">
                  Application navigation links
                </DrawerDescription>
                {drawerBody}
              </DrawerContent>
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </Drawer>
    </aside>
  )
}

Sidebar.displayName = "Sidebar"

const SidebarHeader = ({
  ref,
  className,
  children,
  ...props
}: SidebarHeaderProps) => {
  return (
    <div ref={ref} className={cn(sidebarBrandClasses(), className)} {...props}>
      {children}
    </div>
  )
}

SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = ({
  ref,
  className,
  children,
  onKeyDown,
  ...props
}: SidebarContentProps) => {
  return (
    <ScrollArea className={sidebarNavClasses()}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <nav
            ref={ref}
            aria-label="Application navigation"
            className={className}
            onKeyDown={(event) => {
              handleSidebarNavKeyDown(event)
              onKeyDown?.(event)
            }}
            {...props}
          >
            {children}
          </nav>
        </ScrollAreaContent>
      </ScrollAreaViewport>
    </ScrollArea>
  )
}

SidebarContent.displayName = "SidebarContent"

const SidebarFooter = ({
  ref,
  className,
  children,
  ...props
}: SidebarFooterProps) => {
  return (
    <div ref={ref} className={cn(sidebarFooterClasses(), className)} {...props}>
      {children}
    </div>
  )
}

SidebarFooter.displayName = "SidebarFooter"

const SidebarTrigger = ({
  ref,
  children = "Open navigation",
  variant = "secondary",
  size = "sm",
  className,
  ...props
}: SidebarTriggerProps) => {
  const { isMobile, collapsible, toggleSidebar } = useSidebarContext()

  if (!isMobile && collapsible !== "none") {
    return (
      <Button
        ref={ref}
        type="button"
        variant={variant}
        size={size}
        className={className}
        onClick={toggleSidebar}
        {...props}
      >
        {children}
      </Button>
    )
  }

  return (
    <DrawerTrigger
      render={
        <Button
          ref={ref}
          variant={variant}
          size={size}
          className={className}
          {...props}
        />
      }
    >
      {children}
    </DrawerTrigger>
  )
}

SidebarTrigger.displayName = "SidebarTrigger"

const SidebarCollapseTrigger = ({
  ref,
  children = "Toggle sidebar",
  variant = "ghost",
  size = "sm",
  className,
  ...props
}: SidebarCollapseTriggerProps) => {
  const { collapsed, setCollapsed, isMobile, collapsible } = useSidebarContext()

  if (isMobile || collapsible === "none") {
    return null
  }

  return (
    <Button
      ref={ref}
      type="button"
      variant={variant}
      size={size}
      className={cn("hidden shrink-0 md:inline-flex", className)}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      onClick={() => setCollapsed(!collapsed)}
      {...props}
    >
      {children}
    </Button>
  )
}

SidebarCollapseTrigger.displayName = "SidebarCollapseTrigger"

const SidebarRail = ({ ref, className, ...props }: SidebarRailProps) => {
  const { collapsible, toggleSidebar, isMobile, side } = useSidebarContext()

  if (isMobile || collapsible === "none") {
    return null
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Toggle sidebar rail"
      className={cn(sidebarRailClasses({ side }), className)}
      onClick={toggleSidebar}
      {...props}
    />
  )
}

SidebarRail.displayName = "SidebarRail"

const SidebarMobileHeader = ({
  ref,
  className,
  children,
  ...props
}: SidebarMobileHeaderProps) => {
  return (
    <div
      ref={ref}
      className={cn(sidebarMobileHeaderClasses(), className)}
      {...props}
    >
      {children}
    </div>
  )
}

SidebarMobileHeader.displayName = "SidebarMobileHeader"

const SidebarExpandable = ({
  ref,
  className,
  children,
  ...props
}: SidebarExpandableProps) => {
  return (
    <span
      ref={ref}
      className={cn(sidebarExpandableClasses(), className)}
      {...props}
    >
      {children}
    </span>
  )
}

SidebarExpandable.displayName = "SidebarExpandable"

const SidebarGroup = ({
  ref,
  className,
  children,
  ...props
}: SidebarGroupProps) => {
  return (
    <div ref={ref} className={cn(sidebarGroupClasses(), className)} {...props}>
      {children}
    </div>
  )
}

SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = ({
  ref,
  className,
  children,
  ...props
}: SidebarGroupLabelProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        sidebarGroupLabelClasses(),
        sidebarCollapsedGroupLabelClasses(),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = ({
  ref,
  className,
  children,
  ...props
}: SidebarGroupContentProps) => {
  return (
    <div
      ref={ref}
      className={cn(sidebarGroupContentClasses(), className)}
      {...props}
    >
      {children}
    </div>
  )
}

SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarList = ({
  ref,
  className,
  children,
  ...props
}: SidebarListProps) => {
  return (
    <ul ref={ref} className={cn(sidebarNavListClasses(), className)} {...props}>
      {children}
    </ul>
  )
}

SidebarList.displayName = "SidebarList"

const SidebarItem = ({
  ref,
  className,
  children,
  ...props
}: SidebarItemProps) => {
  return (
    <li ref={ref} className={cn(sidebarItemClasses(), className)} {...props}>
      {children}
    </li>
  )
}

SidebarItem.displayName = "SidebarItem"

const SidebarItemLink = ({
  ref,
  active,
  className,
  children,
  ...props
}: SidebarItemLinkProps) => {
  const { closeOnSelect } = useSidebarMobileContext()
  const linkClassName = cn(
    sidebarNavItemClasses(active),
    sidebarCollapsedItemClasses(),
    className,
  )

  const linkProps = {
    ...props,
    ...getSidebarActiveLinkProps(active),
  }

  if (!closeOnSelect) {
    return (
      <a ref={ref} className={linkClassName} {...linkProps}>
        {children}
      </a>
    )
  }

  return (
    <DrawerClose
      appearance="inline"
      render={<a ref={ref} className={linkClassName} {...linkProps} />}
    >
      {children}
    </DrawerClose>
  )
}

SidebarItemLink.displayName = "SidebarItemLink"

const SidebarItemButton = ({
  ref,
  active,
  className,
  children,
  type = "button",
  ...props
}: SidebarItemButtonProps) => {
  const { closeOnSelect } = useSidebarMobileContext()
  const buttonClassName = cn(
    sidebarNavItemClasses(active),
    sidebarCollapsedItemClasses(),
    className,
  )

  if (!closeOnSelect) {
    return (
      <button ref={ref} type={type} className={buttonClassName} {...props}>
        {children}
      </button>
    )
  }

  return (
    <DrawerClose
      appearance="inline"
      render={
        <button ref={ref} type={type} className={buttonClassName} {...props} />
      }
    >
      {children}
    </DrawerClose>
  )
}

SidebarItemButton.displayName = "SidebarItemButton"

const getSidebarItemBadgeLabel = (children: ReactNode): string | undefined => {
  if (typeof children === "string" || typeof children === "number") {
    return String(children)
  }

  return undefined
}

const SidebarItemBadge = ({
  ref,
  variant = "neutral",
  appearance,
  size = "sm",
  dot,
  className,
  children,
  ...props
}: SidebarItemBadgeProps) => {
  const badgeLabel = getSidebarItemBadgeLabel(children)

  if (dot) {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={badgeLabel}
        className={cn(
          sidebarItemBadgeClasses(),
          sidebarItemBadgeDotClasses(variant),
          className,
        )}
        {...props}
      />
    )
  }

  return (
    <Badge
      ref={ref}
      variant={variant}
      appearance={appearance}
      size={size}
      className={cn(
        sidebarItemBadgeClasses(),
        sidebarItemBadgeCollapsedClasses(),
        className,
      )}
      {...props}
    >
      <span className={sidebarItemBadgeLabelClasses()}>{children}</span>
    </Badge>
  )
}

SidebarItemBadge.displayName = "SidebarItemBadge"

const SidebarItemIcon = ({
  ref,
  className,
  children,
  ...props
}: SidebarItemIconProps) => {
  return (
    <span
      ref={ref}
      className={cn(sidebarItemIconClasses(), className)}
      {...props}
    >
      {children}
    </span>
  )
}

SidebarItemIcon.displayName = "SidebarItemIcon"

const SidebarItemAction = ({
  ref,
  showOnHover = true,
  className,
  ...props
}: SidebarItemActionProps) => {
  return (
    <Button
      ref={ref}
      type="button"
      variant="ghost"
      size="xs"
      className={cn(sidebarItemActionClasses(showOnHover), className)}
      {...props}
    />
  )
}

SidebarItemAction.displayName = "SidebarItemAction"

const SidebarItemShortcut = ({
  ref,
  className,
  children,
  ...props
}: SidebarItemShortcutProps) => {
  return (
    <kbd
      ref={ref}
      className={cn(sidebarItemShortcutClasses(), className)}
      {...props}
    >
      {children}
    </kbd>
  )
}

SidebarItemShortcut.displayName = "SidebarItemShortcut"

const SidebarGroupAction = ({
  ref,
  className,
  ...props
}: SidebarGroupActionProps) => {
  return (
    <Button
      ref={ref}
      type="button"
      variant="ghost"
      size="xs"
      className={cn(sidebarGroupActionClasses(), className)}
      {...props}
    />
  )
}

SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarSubList = ({
  ref,
  className,
  children,
  ...props
}: SidebarSubListProps) => {
  return (
    <ul ref={ref} className={cn(sidebarSubListClasses(), className)} {...props}>
      {children}
    </ul>
  )
}

SidebarSubList.displayName = "SidebarSubList"

const SidebarSubItemLink = ({
  ref,
  active,
  className,
  children,
  ...props
}: SidebarSubItemLinkProps) => {
  const { closeOnSelect } = useSidebarMobileContext()
  const linkClassName = cn(sidebarSubNavItemClasses(active), className)
  const linkProps = {
    ...props,
    ...getSidebarActiveLinkProps(active),
  }

  if (!closeOnSelect) {
    return (
      <a ref={ref} className={linkClassName} {...linkProps}>
        {children}
      </a>
    )
  }

  return (
    <DrawerClose
      appearance="inline"
      render={<a ref={ref} className={linkClassName} {...linkProps} />}
    >
      {children}
    </DrawerClose>
  )
}

SidebarSubItemLink.displayName = "SidebarSubItemLink"

const SidebarSubItemButton = ({
  ref,
  active,
  className,
  children,
  type = "button",
  ...props
}: SidebarSubItemButtonProps) => {
  const { closeOnSelect } = useSidebarMobileContext()
  const buttonClassName = cn(sidebarSubNavItemClasses(active), className)

  if (!closeOnSelect) {
    return (
      <button ref={ref} type={type} className={buttonClassName} {...props}>
        {children}
      </button>
    )
  }

  return (
    <DrawerClose
      appearance="inline"
      render={
        <button ref={ref} type={type} className={buttonClassName} {...props} />
      }
    >
      {children}
    </DrawerClose>
  )
}

SidebarSubItemButton.displayName = "SidebarSubItemButton"

export {
  Sidebar,
  SidebarProvider,
  useSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarList,
  SidebarItem,
  SidebarItemLink,
  SidebarItemButton,
  SidebarItemBadge,
  SidebarItemIcon,
  SidebarItemAction,
  SidebarItemShortcut,
  SidebarGroupAction,
  SidebarSubList,
  SidebarSubItemLink,
  SidebarSubItemButton,
  SidebarTrigger,
  SidebarCollapseTrigger,
  SidebarRail,
  SidebarMobileHeader,
  SidebarExpandable,
  isSidebarNavActive,
}

export type { SidebarNavActiveOptions } from "./Sidebar.types.js"
