/**
 * Alert.tsx
 *
 * Reference Alert component implementation.
 */

import { forwardRef } from "react"
import type {
  AlertDescriptionProps,
  AlertProps,
  AlertTitleProps,
} from "./Alert.types"
import {
  alertDescriptionClassName,
  alertTitleClassName,
  alertVariants,
} from "./Alert.variants"
import { cn } from "@/lib/utils"

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ tone, className, role = "alert", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role={role}
        className={cn(alertVariants({ tone }), className)}
        {...props}
      />
    )
  },
)

Alert.displayName = "Alert"

export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3 ref={ref} className={cn(alertTitleClassName, className)} {...props} />
    )
  },
)

AlertTitle.displayName = "AlertTitle"

export const AlertDescription = forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(alertDescriptionClassName, className)}
      {...props}
    />
  )
})

AlertDescription.displayName = "AlertDescription"
