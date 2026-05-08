/**
 * Toast.tsx
 *
 * Reference Toast component implementation.
 */

import { forwardRef } from "react"
import { X } from "lucide-react"
import { Toast as BaseToast } from "@base-ui/react/toast"
import type {
  ToastActionProps,
  ToastArrowProps,
  ToastCloseProps,
  ToastContentProps,
  ToastDescriptionProps,
  ToastPortalProps,
  ToastPositionerProps,
  ToastProps,
  ToastProviderProps,
  ToastTitleProps,
  ToastViewportProps,
} from "./Toast.types"
import {
  toastActionVariants,
  toastArrowVariants,
  toastCloseVariants,
  toastContentVariants,
  toastDescriptionVariants,
  toastPositionerVariants,
  toastTitleVariants,
  toastVariants,
  toastViewportVariants,
} from "./Toast.variants"
import { cn } from "../../utils/cn"

const ToastProvider = (props: ToastProviderProps) => {
  return <BaseToast.Provider {...props} />
}

ToastProvider.displayName = "ToastProvider"

const ToastPortal = forwardRef<HTMLDivElement, ToastPortalProps>(
  (props, ref) => {
    return <BaseToast.Portal ref={ref} {...props} />
  },
)

ToastPortal.displayName = "ToastPortal"

const ToastViewport = forwardRef<HTMLDivElement, ToastViewportProps>(
  ({ placement, className, ...props }, ref) => {
    const viewportClassName: ToastViewportProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(toastViewportVariants({ placement }), userClassName)
    }

    return (
      <BaseToast.Viewport ref={ref} className={viewportClassName} {...props} />
    )
  },
)

ToastViewport.displayName = "ToastViewport"

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ className, ...props }, ref) => {
    const toastClassName: ToastProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(toastVariants(), userClassName)
    }

    return <BaseToast.Root ref={ref} className={toastClassName} {...props} />
  },
)

Toast.displayName = "Toast"

const ToastPositioner = forwardRef<HTMLDivElement, ToastPositionerProps>(
  ({ className, ...props }, ref) => {
    const positionerClassName: ToastPositionerProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(toastPositionerVariants(), userClassName)
    }

    return (
      <BaseToast.Positioner
        ref={ref}
        className={positionerClassName}
        {...props}
      />
    )
  },
)

ToastPositioner.displayName = "ToastPositioner"

const ToastContent = forwardRef<HTMLDivElement, ToastContentProps>(
  ({ className, ...props }, ref) => {
    const contentClassName: ToastContentProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(toastContentVariants(), userClassName)
    }

    return (
      <BaseToast.Content ref={ref} className={contentClassName} {...props} />
    )
  },
)

ToastContent.displayName = "ToastContent"

const ToastArrow = forwardRef<HTMLDivElement, ToastArrowProps>(
  ({ className, ...props }, ref) => {
    const arrowClassName: ToastArrowProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(toastArrowVariants(), userClassName)
    }

    return <BaseToast.Arrow ref={ref} className={arrowClassName} {...props} />
  },
)

ToastArrow.displayName = "ToastArrow"

const ToastTitle = forwardRef<HTMLHeadingElement, ToastTitleProps>(
  ({ className, ...props }, ref) => {
    const titleClassName: ToastTitleProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(toastTitleVariants(), userClassName)
    }

    return <BaseToast.Title ref={ref} className={titleClassName} {...props} />
  },
)

ToastTitle.displayName = "ToastTitle"

const ToastDescription = forwardRef<
  HTMLParagraphElement,
  ToastDescriptionProps
>(({ className, ...props }, ref) => {
  const descriptionClassName: ToastDescriptionProps["className"] = (state) => {
    const userClassName =
      typeof className === "function" ? className(state) : className

    return cn(toastDescriptionVariants(), userClassName)
  }

  return (
    <BaseToast.Description
      ref={ref}
      className={descriptionClassName}
      {...props}
    />
  )
})

ToastDescription.displayName = "ToastDescription"

const ToastAction = forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ className, ...props }, ref) => {
    const actionClassName: ToastActionProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(toastActionVariants(), userClassName)
    }

    return <BaseToast.Action ref={ref} className={actionClassName} {...props} />
  },
)

ToastAction.displayName = "ToastAction"

const ToastClose = forwardRef<HTMLButtonElement, ToastCloseProps>(
  ({ className, children, ...props }, ref) => {
    const closeClassName: ToastCloseProps["className"] = (state) => {
      const userClassName =
        typeof className === "function" ? className(state) : className

      return cn(toastCloseVariants(), userClassName)
    }

    return (
      <BaseToast.Close ref={ref} className={closeClassName} {...props}>
        {children ?? <X aria-hidden="true" size={16} />}
      </BaseToast.Close>
    )
  },
)

ToastClose.displayName = "ToastClose"

const useToastManager = BaseToast.useToastManager
const createToastManager = BaseToast.createToastManager

export {
  ToastProvider,
  ToastPortal,
  ToastViewport,
  Toast,
  ToastPositioner,
  ToastContent,
  ToastArrow,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  useToastManager,
  createToastManager,
}
