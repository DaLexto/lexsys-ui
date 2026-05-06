/**
 * Field.types.ts
 *
 * Public and internal types for Field component.
 */

import type { Field as BaseField } from "@base-ui/react/field"

export interface FieldProps extends Omit<BaseField.Root.Props, "className"> {
  className?: BaseField.Root.Props["className"]
}

export interface FieldLabelProps extends Omit<
  BaseField.Label.Props,
  "className"
> {
  className?: BaseField.Label.Props["className"]
}

export interface FieldControlProps extends Omit<
  BaseField.Control.Props,
  "aria-invalid" | "className" | "size"
> {
  variant?: "default" | "ghost"
  size?: "sm" | "md" | "lg"
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

export interface FieldItemProps extends Omit<
  BaseField.Item.Props,
  "className"
> {
  className?: BaseField.Item.Props["className"]
}

export interface FieldErrorProps extends Omit<
  BaseField.Error.Props,
  "className"
> {
  className?: BaseField.Error.Props["className"]
}

export type FieldValidityProps = BaseField.Validity.Props
