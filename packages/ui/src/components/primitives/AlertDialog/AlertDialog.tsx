/**
 * AlertDialog.tsx
 *
 * Reference AlertDialog component implementation.
 */

import { X } from "lucide-react"
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog"
import type {
  AlertDialogBackdropProps,
  AlertDialogCloseProps,
  AlertDialogDescriptionProps,
  AlertDialogPopupProps,
  AlertDialogPortalProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
  AlertDialogViewportProps,
} from "./AlertDialog.types"
import {
  alertDialogBackdropVariants,
  alertDialogCloseVariants,
  alertDialogDescriptionVariants,
  alertDialogPopupVariants,
  alertDialogTitleVariants,
  alertDialogTriggerVariants,
  alertDialogViewportVariants,
} from "./AlertDialog.variants"
import { mergeClassName } from "../../../utils/merge-class-name"

const AlertDialog = <Payload = unknown,>(props: AlertDialogProps<Payload>) => {
  return <BaseAlertDialog.Root {...props} />
}

AlertDialog.displayName = "AlertDialog"

const AlertDialogTrigger = ({
  ref,
  className,
  ...props
}: AlertDialogTriggerProps) => {
  return (
    <BaseAlertDialog.Trigger
      ref={ref}
      className={mergeClassName(alertDialogTriggerVariants(), className)}
      {...props}
    />
  )
}

AlertDialogTrigger.displayName = "AlertDialogTrigger"

const AlertDialogPortal = (props: AlertDialogPortalProps) => {
  return <BaseAlertDialog.Portal {...props} />
}

AlertDialogPortal.displayName = "AlertDialogPortal"

const AlertDialogBackdrop = ({
  ref,
  className,
  ...props
}: AlertDialogBackdropProps) => {
  return (
    <BaseAlertDialog.Backdrop
      ref={ref}
      className={mergeClassName(alertDialogBackdropVariants(), className)}
      {...props}
    />
  )
}

AlertDialogBackdrop.displayName = "AlertDialogBackdrop"

const AlertDialogViewport = ({
  ref,
  className,
  ...props
}: AlertDialogViewportProps) => {
  return (
    <BaseAlertDialog.Viewport
      ref={ref}
      className={mergeClassName(alertDialogViewportVariants(), className)}
      {...props}
    />
  )
}

AlertDialogViewport.displayName = "AlertDialogViewport"

const AlertDialogPopup = ({
  ref,
  className,
  ...props
}: AlertDialogPopupProps) => {
  return (
    <BaseAlertDialog.Popup
      ref={ref}
      className={mergeClassName(alertDialogPopupVariants(), className)}
      {...props}
    />
  )
}

AlertDialogPopup.displayName = "AlertDialogPopup"

const AlertDialogTitle = ({
  ref,
  className,
  ...props
}: AlertDialogTitleProps) => {
  return (
    <BaseAlertDialog.Title
      ref={ref}
      className={mergeClassName(alertDialogTitleVariants(), className)}
      {...props}
    />
  )
}

AlertDialogTitle.displayName = "AlertDialogTitle"

const AlertDialogDescription = ({
  ref,
  className,
  ...props
}: AlertDialogDescriptionProps) => {
  return (
    <BaseAlertDialog.Description
      ref={ref}
      className={mergeClassName(alertDialogDescriptionVariants(), className)}
      {...props}
    />
  )
}

AlertDialogDescription.displayName = "AlertDialogDescription"

const AlertDialogClose = ({
  ref,
  className,
  children,
  ...props
}: AlertDialogCloseProps) => {
  return (
    <BaseAlertDialog.Close
      ref={ref}
      className={mergeClassName(alertDialogCloseVariants(), className)}
      {...props}
    >
      {children ?? <X aria-hidden="true" size={16} />}
    </BaseAlertDialog.Close>
  )
}

AlertDialogClose.displayName = "AlertDialogClose"

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogViewport,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
}
