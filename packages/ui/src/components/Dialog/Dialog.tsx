/**
 * Dialog.tsx
 *
 * Reference Dialog component implementation.
 */

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
import { mergeClassName } from "../../utils/merge-class-name"

const Dialog = <Payload = unknown,>(props: DialogProps<Payload>) => {
  return <BaseDialog.Root {...props} />
}

Dialog.displayName = "Dialog"

const DialogTrigger = ({ ref, className, ...props }: DialogTriggerProps) => {
  return (
    <BaseDialog.Trigger
      ref={ref}
      className={mergeClassName(dialogTriggerVariants(), className)}
      {...props}
    />
  )
}

DialogTrigger.displayName = "DialogTrigger"

const DialogPortal = (props: DialogPortalProps) => {
  return <BaseDialog.Portal {...props} />
}

DialogPortal.displayName = "DialogPortal"

const DialogBackdrop = ({ ref, className, ...props }: DialogBackdropProps) => {
  return (
    <BaseDialog.Backdrop
      ref={ref}
      className={mergeClassName(dialogBackdropVariants(), className)}
      {...props}
    />
  )
}

DialogBackdrop.displayName = "DialogBackdrop"

const DialogViewport = ({ ref, className, ...props }: DialogViewportProps) => {
  return (
    <BaseDialog.Viewport
      ref={ref}
      className={mergeClassName(dialogViewportVariants(), className)}
      {...props}
    />
  )
}

DialogViewport.displayName = "DialogViewport"

const DialogPopup = ({ ref, className, ...props }: DialogPopupProps) => {
  return (
    <BaseDialog.Popup
      ref={ref}
      className={mergeClassName(dialogPopupVariants(), className)}
      {...props}
    />
  )
}

DialogPopup.displayName = "DialogPopup"

const DialogTitle = ({ ref, className, ...props }: DialogTitleProps) => {
  return (
    <BaseDialog.Title
      ref={ref}
      className={mergeClassName(dialogTitleVariants(), className)}
      {...props}
    />
  )
}

DialogTitle.displayName = "DialogTitle"

const DialogDescription = ({
  ref,
  className,
  ...props
}: DialogDescriptionProps) => {
  return (
    <BaseDialog.Description
      ref={ref}
      className={mergeClassName(dialogDescriptionVariants(), className)}
      {...props}
    />
  )
}

DialogDescription.displayName = "DialogDescription"

const DialogClose = ({
  ref,
  className,
  children,
  ...props
}: DialogCloseProps) => {
  return (
    <BaseDialog.Close
      ref={ref}
      className={mergeClassName(dialogCloseVariants(), className)}
      {...props}
    >
      {children ?? <X aria-hidden="true" size={16} />}
    </BaseDialog.Close>
  )
}

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
