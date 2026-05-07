/**
 * Popover.tsx
 *
 * Reference Popover component implementation.
 */

import { forwardRef } from "react"
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
import { cn } from "@/lib/utils"

const Popover = <Payload = unknown,>(props: PopoverProps<Payload>) => {
  return <BasePopover.Root {...props} />
}

Popover.displayName = "Popover"

const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ className, ...props }, ref) => {
    const triggerClassName: PopoverTriggerProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(popoverTriggerVariants(), userClassName)
    }

    return (
      <BasePopover.Trigger ref={ref} className={triggerClassName} {...props} />
    )
  },
)

PopoverTrigger.displayName = "PopoverTrigger"

const PopoverPortal = forwardRef<HTMLDivElement, PopoverPortalProps>(
  (props, ref) => {
    return <BasePopover.Portal ref={ref} {...props} />
  },
)

PopoverPortal.displayName = "PopoverPortal"

const PopoverBackdrop = forwardRef<HTMLDivElement, PopoverBackdropProps>(
  ({ className, ...props }, ref) => {
    const backdropClassName: PopoverBackdropProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(popoverBackdropVariants(), userClassName)
    }

    return (
      <BasePopover.Backdrop
        ref={ref}
        className={backdropClassName}
        {...props}
      />
    )
  },
)

PopoverBackdrop.displayName = "PopoverBackdrop"

const PopoverPositioner = forwardRef<HTMLDivElement, PopoverPositionerProps>(
  ({ className, ...props }, ref) => {
    const positionerClassName: PopoverPositionerProps["className"] = (
      state,
    ) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(popoverPositionerVariants(), userClassName)
    }

    return (
      <BasePopover.Positioner
        ref={ref}
        className={positionerClassName}
        {...props}
      />
    )
  },
)

PopoverPositioner.displayName = "PopoverPositioner"

const PopoverPopup = forwardRef<HTMLDivElement, PopoverPopupProps>(
  ({ className, ...props }, ref) => {
    const popupClassName: PopoverPopupProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(popoverPopupVariants(), userClassName)
    }

    return <BasePopover.Popup ref={ref} className={popupClassName} {...props} />
  },
)

PopoverPopup.displayName = "PopoverPopup"

const PopoverArrow = forwardRef<HTMLDivElement, PopoverArrowProps>(
  ({ className, ...props }, ref) => {
    const arrowClassName: PopoverArrowProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(popoverArrowVariants(), userClassName)
    }

    return <BasePopover.Arrow ref={ref} className={arrowClassName} {...props} />
  },
)

PopoverArrow.displayName = "PopoverArrow"

const PopoverTitle = forwardRef<HTMLHeadingElement, PopoverTitleProps>(
  ({ className, ...props }, ref) => {
    const titleClassName: PopoverTitleProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(popoverTitleVariants(), userClassName)
    }

    return <BasePopover.Title ref={ref} className={titleClassName} {...props} />
  },
)

PopoverTitle.displayName = "PopoverTitle"

const PopoverDescription = forwardRef<
  HTMLParagraphElement,
  PopoverDescriptionProps
>(({ className, ...props }, ref) => {
  const descriptionClassName: PopoverDescriptionProps["className"] = (
    state,
  ) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(popoverDescriptionVariants(), userClassName)
  }

  return (
    <BasePopover.Description
      ref={ref}
      className={descriptionClassName}
      {...props}
    />
  )
})

PopoverDescription.displayName = "PopoverDescription"

const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ className, children, ...props }, ref) => {
    const closeClassName: PopoverCloseProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(popoverCloseVariants(), userClassName)
    }

    return (
      <BasePopover.Close ref={ref} className={closeClassName} {...props}>
        {children ?? <X aria-hidden="true" size={16} />}
      </BasePopover.Close>
    )
  },
)

PopoverClose.displayName = "PopoverClose"

const PopoverViewport = forwardRef<HTMLDivElement, PopoverViewportProps>(
  ({ className, ...props }, ref) => {
    const viewportClassName: PopoverViewportProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(popoverViewportVariants(), userClassName)
    }

    return (
      <BasePopover.Viewport
        ref={ref}
        className={viewportClassName}
        {...props}
      />
    )
  },
)

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
