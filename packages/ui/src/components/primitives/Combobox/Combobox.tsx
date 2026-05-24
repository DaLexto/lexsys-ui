/**
 * Combobox.tsx
 *
 * Reference Combobox component implementation.
 */

import { Check, ChevronDown, X } from "lucide-react"
import { Combobox as BaseCombobox } from "@base-ui/react/combobox"
import type {
  ComboboxArrowProps,
  ComboboxBackdropProps,
  ComboboxChipProps,
  ComboboxChipRemoveProps,
  ComboboxChipsProps,
  ComboboxClearProps,
  ComboboxCollectionProps,
  ComboboxEmptyProps,
  ComboboxGroupLabelProps,
  ComboboxGroupProps,
  ComboboxIconProps,
  ComboboxInputGroupProps,
  ComboboxInputProps,
  ComboboxItemIndicatorProps,
  ComboboxItemProps,
  ComboboxLabelProps,
  ComboboxListProps,
  ComboboxPopupProps,
  ComboboxPortalProps,
  ComboboxPositionerProps,
  ComboboxProps,
  ComboboxRowProps,
  ComboboxSeparatorProps,
  ComboboxStatusProps,
  ComboboxTriggerProps,
  ComboboxValueProps,
} from "./Combobox.types"
import {
  comboboxArrowVariants,
  comboboxBackdropVariants,
  comboboxChipRemoveVariants,
  comboboxChipVariants,
  comboboxChipsVariants,
  comboboxClearVariants,
  comboboxEmptyVariants,
  comboboxGroupLabelVariants,
  comboboxGroupVariants,
  comboboxIconVariants,
  comboboxInputGroupVariants,
  comboboxInputVariants,
  comboboxItemIndicatorVariants,
  comboboxItemVariants,
  comboboxLabelVariants,
  comboboxListVariants,
  comboboxPopupVariants,
  comboboxPositionerVariants,
  comboboxRowVariants,
  comboboxSeparatorVariants,
  comboboxStatusVariants,
  comboboxTriggerVariants,
} from "./Combobox.variants"
import { mergeClassName } from "../../../utils/merge-class-name"
import { overlayPositionerSideOffset } from "../../../utils/cn"

const Combobox = <Value = string, Multiple extends boolean | undefined = false>(
  props: ComboboxProps<Value, Multiple>,
) => {
  return <BaseCombobox.Root {...props} />
}

Combobox.displayName = "Combobox"

const ComboboxLabel = ({ ref, className, ...props }: ComboboxLabelProps) => {
  return (
    <BaseCombobox.Label
      ref={ref}
      className={mergeClassName(comboboxLabelVariants(), className)}
      {...props}
    />
  )
}

ComboboxLabel.displayName = "ComboboxLabel"

const ComboboxTrigger = ({
  ref,
  size,
  className,
  ...props
}: ComboboxTriggerProps) => {
  return (
    <BaseCombobox.Trigger
      ref={ref}
      className={mergeClassName(comboboxTriggerVariants({ size }), className)}
      {...props}
    />
  )
}

ComboboxTrigger.displayName = "ComboboxTrigger"

const ComboboxInputGroup = ({
  ref,
  size,
  className,
  ...props
}: ComboboxInputGroupProps) => {
  return (
    <BaseCombobox.InputGroup
      ref={ref}
      className={mergeClassName(
        comboboxInputGroupVariants({ size }),
        className,
      )}
      {...props}
    />
  )
}

ComboboxInputGroup.displayName = "ComboboxInputGroup"

const ComboboxInput = ({
  ref,
  size,
  className,
  ...props
}: ComboboxInputProps) => {
  return (
    <BaseCombobox.Input
      ref={ref}
      className={mergeClassName(comboboxInputVariants({ size }), className)}
      {...props}
    />
  )
}

ComboboxInput.displayName = "ComboboxInput"

const ComboboxValue = (props: ComboboxValueProps) => {
  return <BaseCombobox.Value {...props} />
}

ComboboxValue.displayName = "ComboboxValue"

const ComboboxIcon = ({
  ref,
  className,
  children,
  ...props
}: ComboboxIconProps) => {
  return (
    <BaseCombobox.Icon
      ref={ref}
      className={mergeClassName(comboboxIconVariants(), className)}
      {...props}
    >
      {children ?? <ChevronDown aria-hidden="true" size={16} />}
    </BaseCombobox.Icon>
  )
}

ComboboxIcon.displayName = "ComboboxIcon"

const ComboboxClear = ({
  ref,
  className,
  children,
  ...props
}: ComboboxClearProps) => {
  return (
    <BaseCombobox.Clear
      ref={ref}
      className={mergeClassName(comboboxClearVariants(), className)}
      {...props}
    >
      {children ?? <X aria-hidden="true" size={14} />}
    </BaseCombobox.Clear>
  )
}

ComboboxClear.displayName = "ComboboxClear"

const ComboboxPortal = (props: ComboboxPortalProps) => {
  return <BaseCombobox.Portal {...props} />
}

ComboboxPortal.displayName = "ComboboxPortal"

const ComboboxBackdrop = ({
  ref,
  className,
  ...props
}: ComboboxBackdropProps) => {
  return (
    <BaseCombobox.Backdrop
      ref={ref}
      className={mergeClassName(comboboxBackdropVariants(), className)}
      {...props}
    />
  )
}

ComboboxBackdrop.displayName = "ComboboxBackdrop"

const ComboboxPositioner = ({
  ref,
  className,
  sideOffset = overlayPositionerSideOffset,
  ...props
}: ComboboxPositionerProps) => {
  return (
    <BaseCombobox.Positioner
      ref={ref}
      sideOffset={sideOffset}
      className={mergeClassName(comboboxPositionerVariants(), className)}
      {...props}
    />
  )
}

ComboboxPositioner.displayName = "ComboboxPositioner"

const ComboboxPopup = ({ ref, className, ...props }: ComboboxPopupProps) => {
  return (
    <BaseCombobox.Popup
      ref={ref}
      className={mergeClassName(comboboxPopupVariants(), className)}
      {...props}
    />
  )
}

ComboboxPopup.displayName = "ComboboxPopup"

const ComboboxList = ({ ref, className, ...props }: ComboboxListProps) => {
  return (
    <BaseCombobox.List
      ref={ref}
      className={mergeClassName(comboboxListVariants(), className)}
      {...props}
    />
  )
}

ComboboxList.displayName = "ComboboxList"

const ComboboxItem = ({ ref, className, ...props }: ComboboxItemProps) => {
  return (
    <BaseCombobox.Item
      ref={ref}
      className={mergeClassName(comboboxItemVariants(), className)}
      {...props}
    />
  )
}

ComboboxItem.displayName = "ComboboxItem"

const ComboboxItemIndicator = ({
  ref,
  className,
  children,
  ...props
}: ComboboxItemIndicatorProps) => {
  return (
    <BaseCombobox.ItemIndicator
      ref={ref}
      className={mergeClassName(comboboxItemIndicatorVariants(), className)}
      {...props}
    >
      {children ?? <Check aria-hidden="true" size={14} />}
    </BaseCombobox.ItemIndicator>
  )
}

ComboboxItemIndicator.displayName = "ComboboxItemIndicator"

const ComboboxArrow = ({ ref, className, ...props }: ComboboxArrowProps) => {
  return (
    <BaseCombobox.Arrow
      ref={ref}
      className={mergeClassName(comboboxArrowVariants(), className)}
      {...props}
    />
  )
}

ComboboxArrow.displayName = "ComboboxArrow"

const ComboboxGroup = ({ ref, className, ...props }: ComboboxGroupProps) => {
  return (
    <BaseCombobox.Group
      ref={ref}
      className={mergeClassName(comboboxGroupVariants(), className)}
      {...props}
    />
  )
}

ComboboxGroup.displayName = "ComboboxGroup"

const ComboboxGroupLabel = ({
  ref,
  className,
  ...props
}: ComboboxGroupLabelProps) => {
  return (
    <BaseCombobox.GroupLabel
      ref={ref}
      className={mergeClassName(comboboxGroupLabelVariants(), className)}
      {...props}
    />
  )
}

ComboboxGroupLabel.displayName = "ComboboxGroupLabel"

const ComboboxEmpty = ({ ref, className, ...props }: ComboboxEmptyProps) => {
  return (
    <BaseCombobox.Empty
      ref={ref}
      className={mergeClassName(comboboxEmptyVariants(), className)}
      {...props}
    />
  )
}

ComboboxEmpty.displayName = "ComboboxEmpty"

const ComboboxStatus = ({ ref, className, ...props }: ComboboxStatusProps) => {
  return (
    <BaseCombobox.Status
      ref={ref}
      className={mergeClassName(comboboxStatusVariants(), className)}
      {...props}
    />
  )
}

ComboboxStatus.displayName = "ComboboxStatus"

const ComboboxChips = ({ ref, className, ...props }: ComboboxChipsProps) => {
  return (
    <BaseCombobox.Chips
      ref={ref}
      className={mergeClassName(comboboxChipsVariants(), className)}
      {...props}
    />
  )
}

ComboboxChips.displayName = "ComboboxChips"

const ComboboxChip = ({ ref, className, ...props }: ComboboxChipProps) => {
  return (
    <BaseCombobox.Chip
      ref={ref}
      className={mergeClassName(comboboxChipVariants(), className)}
      {...props}
    />
  )
}

ComboboxChip.displayName = "ComboboxChip"

const ComboboxChipRemove = ({
  ref,
  className,
  children,
  ...props
}: ComboboxChipRemoveProps) => {
  return (
    <BaseCombobox.ChipRemove
      ref={ref}
      className={mergeClassName(comboboxChipRemoveVariants(), className)}
      {...props}
    >
      {children ?? <X aria-hidden="true" size={12} />}
    </BaseCombobox.ChipRemove>
  )
}

ComboboxChipRemove.displayName = "ComboboxChipRemove"

const ComboboxRow = ({ ref, className, ...props }: ComboboxRowProps) => {
  return (
    <BaseCombobox.Row
      ref={ref}
      className={mergeClassName(comboboxRowVariants(), className)}
      {...props}
    />
  )
}

ComboboxRow.displayName = "ComboboxRow"

const ComboboxCollection = (props: ComboboxCollectionProps) => {
  return <BaseCombobox.Collection {...props} />
}

ComboboxCollection.displayName = "ComboboxCollection"

const ComboboxSeparator = ({
  ref,
  className,
  ...props
}: ComboboxSeparatorProps) => {
  return (
    <BaseCombobox.Separator
      ref={ref}
      className={mergeClassName(comboboxSeparatorVariants(), className)}
      {...props}
    />
  )
}

ComboboxSeparator.displayName = "ComboboxSeparator"

const useComboboxFilter = BaseCombobox.useFilter
const useComboboxFilteredItems = BaseCombobox.useFilteredItems

export {
  Combobox,
  ComboboxLabel,
  ComboboxTrigger,
  ComboboxInputGroup,
  ComboboxInput,
  ComboboxValue,
  ComboboxIcon,
  ComboboxClear,
  ComboboxPortal,
  ComboboxBackdrop,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxList,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxArrow,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxEmpty,
  ComboboxStatus,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxRow,
  ComboboxCollection,
  ComboboxSeparator,
  useComboboxFilter,
  useComboboxFilteredItems,
}
