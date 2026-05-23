/**
 * Popover.tsx
 *
 * Reference Popover component implementation.
 */

import { X } from "lucide-react"
import { Popover as BasePopover } from "@base-ui/react/popover"
import type {
  PopoverArrowProps,
  PopoverBackdropProps,
  PopoverCloseProps,
  PopoverDescriptionProps,
  PopoverPopupProps,
  PopoverPortalProps,
  PopoverPositionerProps,
  PopoverProps,
  PopoverTitleProps,
  PopoverTriggerProps,
  PopoverViewportProps,
} from "./Popover.types"
import {
  popoverArrowVariants,
  popoverBackdropVariants,
  popoverCloseVariants,
  popoverDescriptionVariants,
  popoverPopupVariants,
  popoverPositionerVariants,
  popoverTitleVariants,
  popoverTriggerVariants,
  popoverViewportVariants,
} from "./Popover.variants"
import { mergeClassName } from "../../../utils/merge-class-name"
import { overlayPositionerSideOffset } from "../../../utils/cn"

const Popover = <Payload = unknown,>(props: PopoverProps<Payload>) => {
  return <BasePopover.Root {...props} />
}

Popover.displayName = "Popover"

const PopoverTrigger = ({ ref, className, ...props }: PopoverTriggerProps) => {
  return (
    <BasePopover.Trigger
      ref={ref}
      className={mergeClassName(popoverTriggerVariants(), className)}
      {...props}
    />
  )
}

PopoverTrigger.displayName = "PopoverTrigger"

const PopoverPortal = ({ ref, ...props }: PopoverPortalProps) => {
  return <BasePopover.Portal ref={ref} {...props} />
}

PopoverPortal.displayName = "PopoverPortal"

const PopoverBackdrop = ({
  ref,
  className,
  ...props
}: PopoverBackdropProps) => {
  return (
    <BasePopover.Backdrop
      ref={ref}
      className={mergeClassName(popoverBackdropVariants(), className)}
      {...props}
    />
  )
}

PopoverBackdrop.displayName = "PopoverBackdrop"

const PopoverPositioner = ({
  ref,
  className,
  sideOffset = overlayPositionerSideOffset,
  ...props
}: PopoverPositionerProps) => {
  return (
    <BasePopover.Positioner
      ref={ref}
      sideOffset={sideOffset}
      className={mergeClassName(popoverPositionerVariants(), className)}
      {...props}
    />
  )
}

PopoverPositioner.displayName = "PopoverPositioner"

const PopoverPopup = ({ ref, className, ...props }: PopoverPopupProps) => {
  return (
    <BasePopover.Popup
      ref={ref}
      className={mergeClassName(popoverPopupVariants(), className)}
      {...props}
    />
  )
}

PopoverPopup.displayName = "PopoverPopup"

const PopoverArrow = ({ ref, className, ...props }: PopoverArrowProps) => {
  return (
    <BasePopover.Arrow
      ref={ref}
      className={mergeClassName(popoverArrowVariants(), className)}
      {...props}
    />
  )
}

PopoverArrow.displayName = "PopoverArrow"

const PopoverTitle = ({ ref, className, ...props }: PopoverTitleProps) => {
  return (
    <BasePopover.Title
      ref={ref}
      className={mergeClassName(popoverTitleVariants(), className)}
      {...props}
    />
  )
}

PopoverTitle.displayName = "PopoverTitle"

const PopoverDescription = ({
  ref,
  className,
  ...props
}: PopoverDescriptionProps) => {
  return (
    <BasePopover.Description
      ref={ref}
      className={mergeClassName(popoverDescriptionVariants(), className)}
      {...props}
    />
  )
}

PopoverDescription.displayName = "PopoverDescription"

const PopoverClose = ({
  ref,
  className,
  children,
  ...props
}: PopoverCloseProps) => {
  return (
    <BasePopover.Close
      ref={ref}
      className={mergeClassName(popoverCloseVariants(), className)}
      {...props}
    >
      {children ?? <X aria-hidden="true" size={16} />}
    </BasePopover.Close>
  )
}

PopoverClose.displayName = "PopoverClose"

const PopoverViewport = ({
  ref,
  className,
  ...props
}: PopoverViewportProps) => {
  return (
    <BasePopover.Viewport
      ref={ref}
      className={mergeClassName(popoverViewportVariants(), className)}
      {...props}
    />
  )
}

PopoverViewport.displayName = "PopoverViewport"

export {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverBackdrop,
  PopoverPositioner,
  PopoverPopup,
  PopoverArrow,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
  PopoverViewport,
}
