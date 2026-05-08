/**
 * AlertDialog.tsx
 *
 * Reference AlertDialog component implementation.
 */

import { forwardRef } from "react"
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
import { cn } from "@/lib/utils"

const AlertDialog = <Payload = unknown,>(props: AlertDialogProps<Payload>) => {
  return <BaseAlertDialog.Root {...props} />
}

AlertDialog.displayName = "AlertDialog"

const AlertDialogTrigger = forwardRef<
  HTMLButtonElement,
  AlertDialogTriggerProps
>(({ className, ...props }, ref) => {
  const triggerClassName: AlertDialogTriggerProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(alertDialogTriggerVariants(), userClassName)
  }

  return (
    <BaseAlertDialog.Trigger
      ref={ref}
      className={triggerClassName}
      {...props}
    />
  )
})

AlertDialogTrigger.displayName = "AlertDialogTrigger"

const AlertDialogPortal = (props: AlertDialogPortalProps) => {
  return <BaseAlertDialog.Portal {...props} />
}

AlertDialogPortal.displayName = "AlertDialogPortal"

const AlertDialogBackdrop = forwardRef<
  HTMLDivElement,
  AlertDialogBackdropProps
>(({ className, ...props }, ref) => {
  const backdropClassName: AlertDialogBackdropProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(alertDialogBackdropVariants(), userClassName)
  }

  return (
    <BaseAlertDialog.Backdrop
      ref={ref}
      className={backdropClassName}
      {...props}
    />
  )
})

AlertDialogBackdrop.displayName = "AlertDialogBackdrop"

const AlertDialogViewport = forwardRef<
  HTMLDivElement,
  AlertDialogViewportProps
>(({ className, ...props }, ref) => {
  const viewportClassName: AlertDialogViewportProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(alertDialogViewportVariants(), userClassName)
  }

  return (
    <BaseAlertDialog.Viewport
      ref={ref}
      className={viewportClassName}
      {...props}
    />
  )
})

AlertDialogViewport.displayName = "AlertDialogViewport"

const AlertDialogPopup = forwardRef<HTMLDivElement, AlertDialogPopupProps>(
  ({ className, ...props }, ref) => {
    const popupClassName: AlertDialogPopupProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(alertDialogPopupVariants(), userClassName)
    }

    return (
      <BaseAlertDialog.Popup ref={ref} className={popupClassName} {...props} />
    )
  },
)

AlertDialogPopup.displayName = "AlertDialogPopup"

const AlertDialogTitle = forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  ({ className, ...props }, ref) => {
    const titleClassName: AlertDialogTitleProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(alertDialogTitleVariants(), userClassName)
    }

    return (
      <BaseAlertDialog.Title ref={ref} className={titleClassName} {...props} />
    )
  },
)

AlertDialogTitle.displayName = "AlertDialogTitle"

const AlertDialogDescription = forwardRef<
  HTMLParagraphElement,
  AlertDialogDescriptionProps
>(({ className, ...props }, ref) => {
  const descriptionClassName: AlertDialogDescriptionProps["className"] = (
    state,
  ) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(alertDialogDescriptionVariants(), userClassName)
  }

  return (
    <BaseAlertDialog.Description
      ref={ref}
      className={descriptionClassName}
      {...props}
    />
  )
})

AlertDialogDescription.displayName = "AlertDialogDescription"

const AlertDialogClose = forwardRef<HTMLButtonElement, AlertDialogCloseProps>(
  ({ className, children, ...props }, ref) => {
    const closeClassName: AlertDialogCloseProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(alertDialogCloseVariants(), userClassName)
    }

    return (
      <BaseAlertDialog.Close ref={ref} className={closeClassName} {...props}>
        {children ?? <X aria-hidden="true" size={16} />}
      </BaseAlertDialog.Close>
    )
  },
)

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
