import type { Ref } from "react"
/**
 * OtpField.types.ts
 *
 * Public and internal types for OtpField component.
 */

import type { OTPFieldPreview as BaseOtpField } from "@base-ui/react/otp-field"

export type OtpFieldSize = "sm" | "md" | "lg"

export interface OtpFieldProps extends Omit<
  BaseOtpField.Root.Props,
  "className"
> {
  ref?: Ref<HTMLDivElement>
  className?: BaseOtpField.Root.Props["className"]
}

export interface OtpFieldInputProps extends Omit<
  BaseOtpField.Input.Props,
  "className" | "size"
> {
  ref?: Ref<HTMLInputElement>
  size?: OtpFieldSize
  className?: BaseOtpField.Input.Props["className"]
}

export type OtpFieldSeparatorProps = BaseOtpField.Separator.Props
