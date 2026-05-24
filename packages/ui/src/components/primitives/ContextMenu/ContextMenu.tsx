/**
 * ContextMenu.tsx
 *
 * Reference ContextMenu component implementation.
 */

import { Check, ChevronRight } from "lucide-react"
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu"
import type {
  ContextMenuArrowProps,
  ContextMenuBackdropProps,
  ContextMenuCheckboxItemIndicatorProps,
  ContextMenuCheckboxItemProps,
  ContextMenuGroupLabelProps,
  ContextMenuGroupProps,
  ContextMenuItemProps,
  ContextMenuLinkItemProps,
  ContextMenuPopupProps,
  ContextMenuPortalProps,
  ContextMenuPositionerProps,
  ContextMenuProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemIndicatorProps,
  ContextMenuRadioItemProps,
  ContextMenuSeparatorProps,
  ContextMenuSubmenuRootProps,
  ContextMenuSubmenuTriggerProps,
  ContextMenuTriggerProps,
} from "./ContextMenu.types"
import {
  contextMenuArrowVariants,
  contextMenuBackdropVariants,
  contextMenuGroupLabelVariants,
  contextMenuGroupVariants,
  contextMenuItemIndicatorVariants,
  contextMenuItemTextVariants,
  contextMenuItemVariants,
  contextMenuPopupVariants,
  contextMenuPositionerVariants,
  contextMenuSeparatorVariants,
  contextMenuSubmenuTriggerIconVariants,
  contextMenuSubmenuTriggerVariants,
  contextMenuTriggerVariants,
} from "./ContextMenu.variants"
import { mergeClassName } from "../../../utils/merge-class-name"
import { overlayPositionerSideOffset } from "../../../utils/cn"

const horizontalContextMenuSides = new Set<
  NonNullable<ContextMenuPositionerProps["side"]>
>(["left", "right", "inline-start", "inline-end"])

const popupCollisionAvoidance = {
  fallbackAxisSide: "end",
} as const

const ContextMenu = (props: ContextMenuProps) => {
  return <BaseContextMenu.Root {...props} />
}

ContextMenu.displayName = "ContextMenu"

const ContextMenuTrigger = ({
  ref,
  className,
  ...props
}: ContextMenuTriggerProps) => {
  return (
    <BaseContextMenu.Trigger
      ref={ref}
      className={mergeClassName(contextMenuTriggerVariants(), className)}
      {...props}
    />
  )
}

ContextMenuTrigger.displayName = "ContextMenuTrigger"

const ContextMenuPortal = (props: ContextMenuPortalProps) => {
  return <BaseContextMenu.Portal {...props} />
}

ContextMenuPortal.displayName = "ContextMenuPortal"

const ContextMenuBackdrop = ({
  ref,
  className,
  ...props
}: ContextMenuBackdropProps) => {
  return (
    <BaseContextMenu.Backdrop
      ref={ref}
      className={mergeClassName(contextMenuBackdropVariants(), className)}
      {...props}
    />
  )
}

ContextMenuBackdrop.displayName = "ContextMenuBackdrop"

const ContextMenuPositioner = ({
  ref,
  className,
  sideOffset = overlayPositionerSideOffset,
  side,
  collisionAvoidance,
  ...props
}: ContextMenuPositionerProps) => {
  const resolvedCollisionAvoidance =
    collisionAvoidance ??
    (side && horizontalContextMenuSides.has(side)
      ? popupCollisionAvoidance
      : undefined)

  return (
    <BaseContextMenu.Positioner
      ref={ref}
      sideOffset={sideOffset}
      side={side}
      collisionAvoidance={resolvedCollisionAvoidance}
      className={mergeClassName(contextMenuPositionerVariants(), className)}
      {...props}
    />
  )
}

ContextMenuPositioner.displayName = "ContextMenuPositioner"

const ContextMenuPopup = ({ ref, className, ...props }: ContextMenuPopupProps) => {
  return (
    <BaseContextMenu.Popup
      ref={ref}
      className={mergeClassName(contextMenuPopupVariants(), className)}
      {...props}
    />
  )
}

ContextMenuPopup.displayName = "ContextMenuPopup"

const ContextMenuArrow = ({ ref, className, ...props }: ContextMenuArrowProps) => {
  return (
    <BaseContextMenu.Arrow
      ref={ref}
      className={mergeClassName(contextMenuArrowVariants(), className)}
      {...props}
    />
  )
}

ContextMenuArrow.displayName = "ContextMenuArrow"

const ContextMenuItem = ({ ref, className, ...props }: ContextMenuItemProps) => {
  return (
    <BaseContextMenu.Item
      ref={ref}
      className={mergeClassName(contextMenuItemVariants(), className)}
      {...props}
    />
  )
}

ContextMenuItem.displayName = "ContextMenuItem"

const ContextMenuLinkItem = ({
  ref,
  className,
  ...props
}: ContextMenuLinkItemProps) => {
  return (
    <BaseContextMenu.LinkItem
      ref={ref}
      className={mergeClassName(contextMenuItemVariants(), className)}
      {...props}
    />
  )
}

ContextMenuLinkItem.displayName = "ContextMenuLinkItem"

const ContextMenuCheckboxItem = ({
  ref,
  className,
  ...props
}: ContextMenuCheckboxItemProps) => {
  return (
    <BaseContextMenu.CheckboxItem
      ref={ref}
      className={mergeClassName(contextMenuItemVariants(), className)}
      {...props}
    />
  )
}

ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem"

const ContextMenuCheckboxItemIndicator = ({
  ref,
  className,
  children,
  ...props
}: ContextMenuCheckboxItemIndicatorProps) => {
  return (
    <BaseContextMenu.CheckboxItemIndicator
      ref={ref}
      className={mergeClassName(contextMenuItemIndicatorVariants(), className)}
      {...props}
    >
      {children ?? <Check aria-hidden="true" size={14} />}
    </BaseContextMenu.CheckboxItemIndicator>
  )
}

ContextMenuCheckboxItemIndicator.displayName = "ContextMenuCheckboxItemIndicator"

const ContextMenuRadioGroup = ({
  ref,
  className,
  ...props
}: ContextMenuRadioGroupProps) => {
  return (
    <BaseContextMenu.RadioGroup
      ref={ref}
      className={mergeClassName(contextMenuGroupVariants(), className)}
      {...props}
    />
  )
}

ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup"

const ContextMenuRadioItem = ({
  ref,
  className,
  ...props
}: ContextMenuRadioItemProps) => {
  return (
    <BaseContextMenu.RadioItem
      ref={ref}
      className={mergeClassName(contextMenuItemVariants(), className)}
      {...props}
    />
  )
}

ContextMenuRadioItem.displayName = "ContextMenuRadioItem"

const ContextMenuRadioItemIndicator = ({
  ref,
  className,
  children,
  ...props
}: ContextMenuRadioItemIndicatorProps) => {
  return (
    <BaseContextMenu.RadioItemIndicator
      ref={ref}
      className={mergeClassName(contextMenuItemIndicatorVariants(), className)}
      {...props}
    >
      {children ?? <Check aria-hidden="true" size={14} />}
    </BaseContextMenu.RadioItemIndicator>
  )
}

ContextMenuRadioItemIndicator.displayName = "ContextMenuRadioItemIndicator"

const ContextMenuGroup = ({ ref, className, ...props }: ContextMenuGroupProps) => {
  return (
    <BaseContextMenu.Group
      ref={ref}
      className={mergeClassName(contextMenuGroupVariants(), className)}
      {...props}
    />
  )
}

ContextMenuGroup.displayName = "ContextMenuGroup"

const ContextMenuGroupLabel = ({
  ref,
  className,
  ...props
}: ContextMenuGroupLabelProps) => {
  return (
    <BaseContextMenu.GroupLabel
      ref={ref}
      className={mergeClassName(contextMenuGroupLabelVariants(), className)}
      {...props}
    />
  )
}

ContextMenuGroupLabel.displayName = "ContextMenuGroupLabel"

const ContextMenuSeparator = ({
  ref,
  className,
  ...props
}: ContextMenuSeparatorProps) => {
  return (
    <BaseContextMenu.Separator
      ref={ref}
      className={mergeClassName(contextMenuSeparatorVariants(), className)}
      {...props}
    />
  )
}

ContextMenuSeparator.displayName = "ContextMenuSeparator"

const ContextMenuSubmenuRoot = (props: ContextMenuSubmenuRootProps) => {
  return <BaseContextMenu.SubmenuRoot {...props} />
}

ContextMenuSubmenuRoot.displayName = "ContextMenuSubmenuRoot"

const ContextMenuSubmenuTrigger = ({
  ref,
  className,
  children,
  ...props
}: ContextMenuSubmenuTriggerProps) => {
  return (
    <BaseContextMenu.SubmenuTrigger
      ref={ref}
      className={mergeClassName(contextMenuSubmenuTriggerVariants(), className)}
      {...props}
    >
      <span className={contextMenuItemTextVariants()}>{children}</span>
      <span className={contextMenuSubmenuTriggerIconVariants()}>
        <ChevronRight aria-hidden="true" size={14} />
      </span>
    </BaseContextMenu.SubmenuTrigger>
  )
}

ContextMenuSubmenuTrigger.displayName = "ContextMenuSubmenuTrigger"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuBackdrop,
  ContextMenuPositioner,
  ContextMenuPopup,
  ContextMenuArrow,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuLinkItem,
  ContextMenuCheckboxItem,
  ContextMenuCheckboxItemIndicator,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRadioItemIndicator,
  ContextMenuSeparator,
  ContextMenuSubmenuRoot,
  ContextMenuSubmenuTrigger,
}
