/**
 * Dialog.tsx
 *
 * Reference Dialog component implementation.
 */

import { forwardRef } from "react"
import { X } from "lucide-react"
import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import type {
  DialogBackdropProps,
  DialogCloseProps,
  DialogDescriptionProps,
  DialogPopupProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
  DialogViewportProps,
} from "./Dialog.types"
import {
  dialogBackdropVariants,
  dialogCloseVariants,
  dialogDescriptionVariants,
  dialogPopupVariants,
  dialogTitleVariants,
  dialogTriggerVariants,
  dialogViewportVariants,
} from "./Dialog.variants"
import { cn } from "../../utils/cn"

const Dialog = <Payload = unknown,>(props: DialogProps<Payload>) => {
  return <BaseDialog.Root {...props} />
}

Dialog.displayName = "Dialog"

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, ...props }, ref) => {
    const triggerClassName: DialogTriggerProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(dialogTriggerVariants(), userClassName)
    }

    return (
      <BaseDialog.Trigger ref={ref} className={triggerClassName} {...props} />
    )
  },
)

DialogTrigger.displayName = "DialogTrigger"

const DialogPortal = (props: DialogPortalProps) => {
  return <BaseDialog.Portal {...props} />
}

DialogPortal.displayName = "DialogPortal"

const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(
  ({ className, ...props }, ref) => {
    const backdropClassName: DialogBackdropProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(dialogBackdropVariants(), userClassName)
    }

    return (
      <BaseDialog.Backdrop ref={ref} className={backdropClassName} {...props} />
    )
  },
)

DialogBackdrop.displayName = "DialogBackdrop"

const DialogViewport = forwardRef<HTMLDivElement, DialogViewportProps>(
  ({ className, ...props }, ref) => {
    const viewportClassName: DialogViewportProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(dialogViewportVariants(), userClassName)
    }

    return (
      <BaseDialog.Viewport ref={ref} className={viewportClassName} {...props} />
    )
  },
)

DialogViewport.displayName = "DialogViewport"

const DialogPopup = forwardRef<HTMLDivElement, DialogPopupProps>(
  ({ className, ...props }, ref) => {
    const popupClassName: DialogPopupProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(dialogPopupVariants(), userClassName)
    }

    return <BaseDialog.Popup ref={ref} className={popupClassName} {...props} />
  },
)

DialogPopup.displayName = "DialogPopup"

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    const titleClassName: DialogTitleProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(dialogTitleVariants(), userClassName)
    }

    return <BaseDialog.Title ref={ref} className={titleClassName} {...props} />
  },
)

DialogTitle.displayName = "DialogTitle"

const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => {
  const descriptionClassName: DialogDescriptionProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(dialogDescriptionVariants(), userClassName)
  }

  return (
    <BaseDialog.Description
      ref={ref}
      className={descriptionClassName}
      {...props}
    />
  )
})

DialogDescription.displayName = "DialogDescription"

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children, ...props }, ref) => {
    const closeClassName: DialogCloseProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(dialogCloseVariants(), userClassName)
    }

    return (
      <BaseDialog.Close ref={ref} className={closeClassName} {...props}>
        {children ?? <X aria-hidden="true" size={16} />}
      </BaseDialog.Close>
    )
  },
)

DialogClose.displayName = "DialogClose"

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogViewport,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogClose,
}
