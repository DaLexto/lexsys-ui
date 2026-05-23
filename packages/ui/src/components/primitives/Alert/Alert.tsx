/**
 * Alert.tsx
 *
 * Reference Alert component implementation.
 */

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
import { cn } from "../../../utils/cn"

const Alert = ({
  ref,
  variant,
  className,
  role = "alert",
  ...props
}: AlertProps) => {
  return (
    <div
      ref={ref}
      role={role}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

Alert.displayName = "Alert"

const AlertTitle = ({ ref, className, ...props }: AlertTitleProps) => {
  return (
    <h3 ref={ref} className={cn(alertTitleClassName, className)} {...props} />
  )
}

AlertTitle.displayName = "AlertTitle"

const AlertDescription = ({
  ref,
  className,
  ...props
}: AlertDescriptionProps) => {
  return (
    <p
      ref={ref}
      className={cn(alertDescriptionClassName, className)}
      {...props}
    />
  )
}

AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
