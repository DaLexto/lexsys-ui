/**
 * Sidebar.tsx
 *
 * Reference Sidebar block — composes Drawer, Menu, ScrollArea, and Button primitives.
 */

import { Button } from "../../primitives/Button/Button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
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

const SidebarNavList = ({ items }: { items: SidebarNavItem[] }) => {
  return (
    <nav className="flex flex-col gap-[var(--nx-space-1)]">
      <Menu>
        <MenuGroup>
          {items.map((item) => {
            if (item.href) {
              return (
                <MenuLinkItem
                  key={item.id}
                  href={item.href}
                  className={sidebarMenuItemVariants(item.active)}
                >
                  {item.label}
                </MenuLinkItem>
              )
            }

            return (
              <MenuItem
                key={item.id}
                className={sidebarMenuItemVariants(item.active)}
                onClick={item.onSelect}
              >
                {item.label}
              </MenuItem>
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
          <DrawerTrigger>
            <Button variant="secondary">{mobileTriggerLabel}</Button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerPopup>
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
                      <SidebarNavList items={items} />
                    </ScrollAreaContent>
                  </ScrollAreaViewport>
                </ScrollArea>
                <DrawerClose>
                  <Button variant="secondary">Close</Button>
                </DrawerClose>
              </DrawerContent>
            </DrawerPopup>
          </DrawerPortal>
        </Drawer>
      </div>
    </aside>
  )
}

Sidebar.displayName = "Sidebar"

export { Sidebar }
