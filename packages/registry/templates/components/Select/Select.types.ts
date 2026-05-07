/**
 * Select.types.ts
 *
 * Public and internal types for Select component.
 */

import type { Select as BaseSelect } from "@base-ui/react/select"

export type SelectSize = "sm" | "md" | "lg"

export type SelectProps<
  Value = string,
  Multiple extends boolean | undefined = false,
> = BaseSelect.Root.Props<Value, Multiple>

export interface SelectLabelProps extends Omit<
  BaseSelect.Label.Props,
  "className"
> {
  className?: BaseSelect.Label.Props["className"]
}

export interface SelectTriggerProps extends Omit<
  BaseSelect.Trigger.Props,
  "className" | "size"
> {
  size?: SelectSize
  className?: BaseSelect.Trigger.Props["className"]
}

export interface SelectValueProps extends Omit<
  BaseSelect.Value.Props,
  "className"
> {
  className?: BaseSelect.Value.Props["className"]
}

export interface SelectIconProps extends Omit<
  BaseSelect.Icon.Props,
  "className"
> {
  className?: BaseSelect.Icon.Props["className"]
}

export type SelectPortalProps = BaseSelect.Portal.Props

export interface SelectBackdropProps extends Omit<
  BaseSelect.Backdrop.Props,
  "className"
> {
  className?: BaseSelect.Backdrop.Props["className"]
}

export interface SelectPositionerProps extends Omit<
  BaseSelect.Positioner.Props,
  "className"
> {
  className?: BaseSelect.Positioner.Props["className"]
}

export interface SelectPopupProps extends Omit<
  BaseSelect.Popup.Props,
  "className"
> {
  className?: BaseSelect.Popup.Props["className"]
}

export interface SelectListProps extends Omit<
  BaseSelect.List.Props,
  "className"
> {
  className?: BaseSelect.List.Props["className"]
}

export interface SelectItemProps extends Omit<
  BaseSelect.Item.Props,
  "className"
> {
  className?: BaseSelect.Item.Props["className"]
}

export interface SelectItemIndicatorProps extends Omit<
  BaseSelect.ItemIndicator.Props,
  "className"
> {
  className?: BaseSelect.ItemIndicator.Props["className"]
}

export interface SelectItemTextProps extends Omit<
  BaseSelect.ItemText.Props,
  "className"
> {
  className?: BaseSelect.ItemText.Props["className"]
}

export interface SelectArrowProps extends Omit<
  BaseSelect.Arrow.Props,
  "className"
> {
  className?: BaseSelect.Arrow.Props["className"]
}

export interface SelectScrollArrowProps extends Omit<
  BaseSelect.ScrollDownArrow.Props,
  "className"
> {
  className?: BaseSelect.ScrollDownArrow.Props["className"]
}

export type SelectScrollUpArrowProps = SelectScrollArrowProps
export type SelectScrollDownArrowProps = SelectScrollArrowProps

export interface SelectGroupProps extends Omit<
  BaseSelect.Group.Props,
  "className"
> {
  className?: BaseSelect.Group.Props["className"]
}

export interface SelectGroupLabelProps extends Omit<
  BaseSelect.GroupLabel.Props,
  "className"
> {
  className?: BaseSelect.GroupLabel.Props["className"]
}
