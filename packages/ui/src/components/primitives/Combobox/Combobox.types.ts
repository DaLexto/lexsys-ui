import type { Ref } from "react"
/**
 * Combobox.types.ts
 *
 * Public and internal types for Combobox component.
 */

import type { Combobox as BaseCombobox } from "@base-ui/react/combobox"

export type ComboboxSize = "sm" | "md" | "lg"

export type ComboboxProps<
  Value = string,
  Multiple extends boolean | undefined = false,
> = BaseCombobox.Root.Props<Value, Multiple>

export type ComboboxLabelProps = BaseCombobox.Label.Props & {
  ref?: Ref<HTMLDivElement>
}

export interface ComboboxTriggerProps extends Omit<
  BaseCombobox.Trigger.Props,
  "className" | "size"
> {
  ref?: Ref<HTMLButtonElement>
  size?: ComboboxSize
  className?: BaseCombobox.Trigger.Props["className"]
}

export interface ComboboxInputGroupProps extends Omit<
  BaseCombobox.InputGroup.Props,
  "className" | "size"
> {
  ref?: Ref<HTMLDivElement>
  size?: ComboboxSize
  className?: BaseCombobox.InputGroup.Props["className"]
}

export interface ComboboxInputProps extends Omit<
  BaseCombobox.Input.Props,
  "className" | "size"
> {
  ref?: Ref<HTMLInputElement>
  size?: ComboboxSize
  className?: BaseCombobox.Input.Props["className"]
}

export type ComboboxValueProps = BaseCombobox.Value.Props

export type ComboboxIconProps = BaseCombobox.Icon.Props

export type ComboboxPortalProps = BaseCombobox.Portal.Props

export type ComboboxBackdropProps = BaseCombobox.Backdrop.Props

export type ComboboxPositionerProps = BaseCombobox.Positioner.Props

export type ComboboxPopupProps = BaseCombobox.Popup.Props

export type ComboboxListProps = BaseCombobox.List.Props

export interface ComboboxItemProps extends Omit<
  BaseCombobox.Item.Props,
  "className" | "ref"
> {
  ref?: Ref<HTMLDivElement>
  className?: BaseCombobox.Item.Props["className"]
}

export interface ComboboxItemIndicatorProps extends Omit<
  BaseCombobox.ItemIndicator.Props,
  "className"
> {
  className?: BaseCombobox.ItemIndicator.Props["className"]
}

export type ComboboxArrowProps = BaseCombobox.Arrow.Props

export type ComboboxGroupProps = BaseCombobox.Group.Props

export type ComboboxGroupLabelProps = BaseCombobox.GroupLabel.Props

export type ComboboxEmptyProps = BaseCombobox.Empty.Props

export type ComboboxClearProps = BaseCombobox.Clear.Props

export type ComboboxStatusProps = BaseCombobox.Status.Props

export type ComboboxChipsProps = BaseCombobox.Chips.Props

export type ComboboxChipProps = BaseCombobox.Chip.Props

export type ComboboxChipRemoveProps = BaseCombobox.ChipRemove.Props

export type ComboboxRowProps = BaseCombobox.Row.Props

export type ComboboxCollectionProps = BaseCombobox.Collection.Props

export type ComboboxSeparatorProps = BaseCombobox.Separator.Props
