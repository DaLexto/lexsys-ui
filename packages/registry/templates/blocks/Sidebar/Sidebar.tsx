/**
 * Sidebar.tsx
 *
 * Reference Sidebar block — composes Drawer, Menu, ScrollArea, and Button primitives.
 */

import { Button } from "../../primitives/Button/Button"
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
} from "../../primitives/Drawer/Drawer"
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuLinkItem,
} from "../../primitives/Menu/Menu"
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaViewport,
} from "../../primitives/ScrollArea/ScrollArea"
import type { SidebarNavItem, SidebarProps } from "./Sidebar.types"
import {
  sidebarBrandVariants,
  sidebarDesktopVariants,
  sidebarMainVariants,
  sidebarMenuItemVariants,
  sidebarMobileTriggerVariants,
  sidebarNavVariants,
  sidebarRootVariants,
} from "./Sidebar.variants"
import { cn } from "@/lib/utils"

interface SidebarNavListProps {
  items: SidebarNavItem[]
  closeOnSelect?: boolean
}

const SidebarNavList = ({
  items,
  closeOnSelect = false,
}: SidebarNavListProps) => {
  return (
    <nav className="flex flex-col gap-[var(--nx-space-1)]">
      <Menu>
        <MenuGroup>
          {items.map((item) => {
            if (item.href) {
              const linkItem = (
                <MenuLinkItem
                  key={item.id}
                  href={item.href}
                  className={sidebarMenuItemVariants(item.active)}
                >
                  {item.label}
                </MenuLinkItem>
              )

              if (!closeOnSelect) {
                return linkItem
              }

              return (
                <DrawerClose
                  key={item.id}
                  render={
                    <MenuLinkItem
                      href={item.href}
                      className={sidebarMenuItemVariants(item.active)}
                    />
                  }
                >
                  {item.label}
                </DrawerClose>
              )
            }

            const menuItem = (
              <MenuItem
                key={item.id}
                className={sidebarMenuItemVariants(item.active)}
                onClick={item.onSelect}
              >
                {item.label}
              </MenuItem>
            )

            if (!closeOnSelect) {
              return menuItem
            }

            return (
              <DrawerClose
                key={item.id}
                render={
                  <MenuItem
                    className={sidebarMenuItemVariants(item.active)}
                    onClick={item.onSelect}
                  />
                }
              >
                {item.label}
              </DrawerClose>
            )
          })}
        </MenuGroup>
      </Menu>
    </nav>
  )
}

const Sidebar = ({
  ref,
  className,
  brand,
  items,
  mobileTriggerLabel = "Open navigation",
}: SidebarProps) => {
  return (
    <aside ref={ref} className={cn(sidebarRootVariants(), className)}>
      <div className={sidebarDesktopVariants()}>
        {brand ? <div className={sidebarBrandVariants()}>{brand}</div> : null}
        <ScrollArea className={sidebarNavVariants()}>
          <ScrollAreaViewport>
            <ScrollAreaContent>
              <SidebarNavList items={items} />
            </ScrollAreaContent>
          </ScrollAreaViewport>
        </ScrollArea>
      </div>

      <div className={sidebarMobileTriggerVariants()}>
        <Drawer>
          <DrawerTrigger render={<Button variant="secondary" size="sm" />}>
            {mobileTriggerLabel}
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerBackdrop />
            <DrawerViewport side="left">
              <DrawerPopup side="left" size="sm">
                <DrawerClose aria-label="Close navigation" />
                <DrawerContent className={sidebarMainVariants()}>
                  <DrawerTitle className="sr-only">Navigation</DrawerTitle>
                  <DrawerDescription className="sr-only">
                    Application navigation links
                  </DrawerDescription>
                  {brand ? (
                    <div className={sidebarBrandVariants()}>{brand}</div>
                  ) : null}
                  <ScrollArea className={sidebarNavVariants()}>
                    <ScrollAreaViewport>
                      <ScrollAreaContent>
                        <SidebarNavList items={items} closeOnSelect />
                      </ScrollAreaContent>
                    </ScrollAreaViewport>
                  </ScrollArea>
                  <DrawerClose
                    render={<Button variant="secondary" size="sm" />}
                  >
                    Close
                  </DrawerClose>
                </DrawerContent>
              </DrawerPopup>
            </DrawerViewport>
          </DrawerPortal>
        </Drawer>
      </div>
    </aside>
  )
}

Sidebar.displayName = "Sidebar"

export { Sidebar }
