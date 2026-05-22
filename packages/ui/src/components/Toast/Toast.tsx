/**
 * Toast.tsx
 *
 * Reference Toast component implementation.
 */

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
import { mergeClassName } from "../../utils/merge-class-name"

const ToastProvider = (props: ToastProviderProps) => {
  return <BaseToast.Provider {...props} />
}

ToastProvider.displayName = "ToastProvider"

const ToastPortal = ({ ref, ...props }: ToastPortalProps) => {
  return <BaseToast.Portal ref={ref} {...props} />
}

ToastPortal.displayName = "ToastPortal"

const ToastViewport = ({
  ref,
  placement,
  className,
  ...props
}: ToastViewportProps) => {
  return (
    <BaseToast.Viewport
      ref={ref}
      className={mergeClassName(
        toastViewportVariants({ placement }),
        className,
      )}
      {...props}
    />
  )
}

ToastViewport.displayName = "ToastViewport"

const Toast = ({ ref, className, ...props }: ToastProps) => {
  return (
    <BaseToast.Root
      ref={ref}
      className={mergeClassName(toastVariants(), className)}
      {...props}
    />
  )
}

Toast.displayName = "Toast"

const ToastPositioner = ({
  ref,
  className,
  ...props
}: ToastPositionerProps) => {
  return (
    <BaseToast.Positioner
      ref={ref}
      className={mergeClassName(toastPositionerVariants(), className)}
      {...props}
    />
  )
}

ToastPositioner.displayName = "ToastPositioner"

const ToastContent = ({ ref, className, ...props }: ToastContentProps) => {
  return (
    <BaseToast.Content
      ref={ref}
      className={mergeClassName(toastContentVariants(), className)}
      {...props}
    />
  )
}

ToastContent.displayName = "ToastContent"

const ToastArrow = ({ ref, className, ...props }: ToastArrowProps) => {
  return (
    <BaseToast.Arrow
      ref={ref}
      className={mergeClassName(toastArrowVariants(), className)}
      {...props}
    />
  )
}

ToastArrow.displayName = "ToastArrow"

const ToastTitle = ({ ref, className, ...props }: ToastTitleProps) => {
  return (
    <BaseToast.Title
      ref={ref}
      className={mergeClassName(toastTitleVariants(), className)}
      {...props}
    />
  )
}

ToastTitle.displayName = "ToastTitle"

const ToastDescription = ({
  ref,
  className,
  ...props
}: ToastDescriptionProps) => {
  return (
    <BaseToast.Description
      ref={ref}
      className={mergeClassName(toastDescriptionVariants(), className)}
      {...props}
    />
  )
}

ToastDescription.displayName = "ToastDescription"

const ToastAction = ({ ref, className, ...props }: ToastActionProps) => {
  return (
    <BaseToast.Action
      ref={ref}
      className={mergeClassName(toastActionVariants(), className)}
      {...props}
    />
  )
}

ToastAction.displayName = "ToastAction"

const ToastClose = ({
  ref,
  className,
  children,
  ...props
}: ToastCloseProps) => {
  return (
    <BaseToast.Close
      ref={ref}
      className={mergeClassName(toastCloseVariants(), className)}
      {...props}
    >
      {children ?? <X aria-hidden="true" size={16} />}
    </BaseToast.Close>
  )
}

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
