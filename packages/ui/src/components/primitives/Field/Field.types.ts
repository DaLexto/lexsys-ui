import type { Ref } from "react"
/**
 * Field.types.ts
 *
 * Public and internal types for Field component.
 */

import type { Field as BaseField } from "@base-ui/react/field"

export interface FieldProps extends Omit<BaseField.Root.Props, "className"> {
  ref?: Ref<HTMLDivElement>
  className?: BaseField.Root.Props["className"]
}

export type FieldLabelProps = BaseField.Label.Props

export type FieldControlVariant = "default" | "ghost"

export type FieldControlSize = "sm" | "md" | "lg"

export interface FieldControlProps extends Omit<
  BaseField.Control.Props,
  "aria-invalid" | "className" | "size"
> {
  variant?: FieldControlVariant
  size?: FieldControlSize
  isInvalid?: boolean
  "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling"
  className?: BaseField.Control.Props["className"]
}

export interface FieldDescriptionProps extends Omit<
  BaseField.Description.Props,
  "className"
> {
  className?: BaseField.Description.Props["className"]
}

export type FieldItemProps = BaseField.Item.Props

export type FieldErrorProps = BaseField.Error.Props

export type FieldValidityProps = BaseField.Validity.Props
