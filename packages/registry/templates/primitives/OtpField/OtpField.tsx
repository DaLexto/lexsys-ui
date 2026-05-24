/**
 * OtpField.tsx
 *
 * Reference OtpField component implementation.
 */

import { OTPFieldPreview as BaseOtpField } from "@base-ui/react/otp-field"
import type {
  OtpFieldInputProps,
  OtpFieldProps,
  OtpFieldSeparatorProps,
} from "./OtpField.types"
import {
  otpFieldInputVariants,
  otpFieldSeparatorVariants,
  otpFieldVariants,
} from "./OtpField.variants"
import { mergeClassName } from "@/lib/utils"

const OtpField = ({ ref, className, ...props }: OtpFieldProps) => {
  return (
    <BaseOtpField.Root
      ref={ref}
      className={mergeClassName(otpFieldVariants(), className)}
      {...props}
    />
  )
}

OtpField.displayName = "OtpField"

const OtpFieldInput = ({
  ref,
  size,
  className,
  ...props
}: OtpFieldInputProps) => {
  return (
    <BaseOtpField.Input
      ref={ref}
      className={mergeClassName(otpFieldInputVariants({ size }), className)}
      {...props}
    />
  )
}

OtpFieldInput.displayName = "OtpFieldInput"

const OtpFieldSeparator = ({
  ref,
  className,
  ...props
}: OtpFieldSeparatorProps) => {
  return (
    <BaseOtpField.Separator
      ref={ref}
      className={mergeClassName(otpFieldSeparatorVariants(), className)}
      {...props}
    />
  )
}

OtpFieldSeparator.displayName = "OtpFieldSeparator"

export { OtpField, OtpFieldInput, OtpFieldSeparator }
