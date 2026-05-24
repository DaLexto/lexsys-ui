import type { Ref } from "react"
import type { ComponentProps } from "react"
/**
 * Autocomplete.types.ts
 *
 * Public and internal types for Autocomplete component.
 */

import type { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete"

export type AutocompleteSize = "sm" | "md" | "lg"

export type AutocompleteProps = ComponentProps<
  typeof BaseAutocomplete.Root
>

export interface AutocompleteTriggerProps extends Omit<
  BaseAutocomplete.Trigger.Props,
  "className" | "size"
> {
  ref?: Ref<HTMLButtonElement>
  size?: AutocompleteSize
  className?: BaseAutocomplete.Trigger.Props["className"]
}

export interface AutocompleteInputGroupProps extends Omit<
  BaseAutocomplete.InputGroup.Props,
  "className" | "size"
> {
  ref?: Ref<HTMLDivElement>
  size?: AutocompleteSize
  className?: BaseAutocomplete.InputGroup.Props["className"]
}

export interface AutocompleteInputProps extends Omit<
  BaseAutocomplete.Input.Props,
  "className" | "size"
> {
  ref?: Ref<HTMLInputElement>
  size?: AutocompleteSize
  className?: BaseAutocomplete.Input.Props["className"]
}

export type AutocompleteValueProps = BaseAutocomplete.Value.Props

export type AutocompleteIconProps = BaseAutocomplete.Icon.Props

export type AutocompleteClearProps = BaseAutocomplete.Clear.Props

export type AutocompletePortalProps = BaseAutocomplete.Portal.Props

export type AutocompleteBackdropProps = BaseAutocomplete.Backdrop.Props

export type AutocompletePositionerProps = BaseAutocomplete.Positioner.Props

export type AutocompletePopupProps = BaseAutocomplete.Popup.Props

export type AutocompleteListProps = BaseAutocomplete.List.Props

export interface AutocompleteItemProps extends Omit<
  BaseAutocomplete.Item.Props,
  "className" | "ref"
> {
  ref?: Ref<HTMLDivElement>
  className?: BaseAutocomplete.Item.Props["className"]
}

export type AutocompleteArrowProps = BaseAutocomplete.Arrow.Props

export type AutocompleteGroupProps = BaseAutocomplete.Group.Props

export type AutocompleteGroupLabelProps = BaseAutocomplete.GroupLabel.Props

export type AutocompleteEmptyProps = BaseAutocomplete.Empty.Props

export type AutocompleteStatusProps = BaseAutocomplete.Status.Props

export type AutocompleteRowProps = BaseAutocomplete.Row.Props

export type AutocompleteCollectionProps = BaseAutocomplete.Collection.Props
