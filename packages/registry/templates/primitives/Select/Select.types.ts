import type { Ref } from "react"
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

export type SelectLabelProps = BaseSelect.Label.Props & {
  ref?: Ref<HTMLDivElement>
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

export type SelectIconProps = BaseSelect.Icon.Props

export type SelectPortalProps = BaseSelect.Portal.Props

export type SelectBackdropProps = BaseSelect.Backdrop.Props

export type SelectPositionerProps = BaseSelect.Positioner.Props

export type SelectPopupProps = BaseSelect.Popup.Props

export type SelectListProps = BaseSelect.List.Props

export interface SelectItemProps extends Omit<
  BaseSelect.Item.Props,
  "className" | "ref"
> {
  ref?: Ref<HTMLDivElement>
  className?: BaseSelect.Item.Props["className"]
}

export interface SelectItemIndicatorProps extends Omit<
  BaseSelect.ItemIndicator.Props,
  "className"
> {
  className?: BaseSelect.ItemIndicator.Props["className"]
}

export type SelectItemTextProps = BaseSelect.ItemText.Props

export type SelectArrowProps = BaseSelect.Arrow.Props

export type SelectScrollArrowProps = BaseSelect.ScrollDownArrow.Props

export type SelectScrollUpArrowProps = SelectScrollArrowProps
export type SelectScrollDownArrowProps = SelectScrollArrowProps

export type SelectGroupProps = BaseSelect.Group.Props

export type SelectGroupLabelProps = BaseSelect.GroupLabel.Props
