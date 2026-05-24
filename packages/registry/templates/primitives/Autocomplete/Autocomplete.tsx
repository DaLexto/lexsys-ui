/**
 * Autocomplete.tsx
 *
 * Reference Autocomplete component implementation.
 */

import { ChevronDown, X } from "lucide-react"
import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete"
import type {
  AutocompleteArrowProps,
  AutocompleteBackdropProps,
  AutocompleteClearProps,
  AutocompleteCollectionProps,
  AutocompleteEmptyProps,
  AutocompleteGroupLabelProps,
  AutocompleteGroupProps,
  AutocompleteIconProps,
  AutocompleteInputGroupProps,
  AutocompleteInputProps,
  AutocompleteItemProps,
  AutocompleteListProps,
  AutocompletePopupProps,
  AutocompletePortalProps,
  AutocompletePositionerProps,
  AutocompleteProps,
  AutocompleteRowProps,
  AutocompleteStatusProps,
  AutocompleteTriggerProps,
  AutocompleteValueProps,
} from "./Autocomplete.types"
import {
  autocompleteArrowVariants,
  autocompleteBackdropVariants,
  autocompleteClearVariants,
  autocompleteEmptyVariants,
  autocompleteGroupLabelVariants,
  autocompleteGroupVariants,
  autocompleteIconVariants,
  autocompleteInputGroupVariants,
  autocompleteInputVariants,
  autocompleteItemVariants,
  autocompleteListVariants,
  autocompletePopupVariants,
  autocompletePositionerVariants,
  autocompleteRowVariants,
  autocompleteStatusVariants,
  autocompleteTriggerVariants,
} from "./Autocomplete.variants"
import { mergeClassName } from "@/lib/utils"
import { overlayPositionerSideOffset } from "@/lib/utils"

const Autocomplete = (props: AutocompleteProps) => {
  return <BaseAutocomplete.Root {...props} />
}

Autocomplete.displayName = "Autocomplete"

const AutocompleteTrigger = ({
  ref,
  size,
  className,
  ...props
}: AutocompleteTriggerProps) => {
  return (
    <BaseAutocomplete.Trigger
      ref={ref}
      className={mergeClassName(
        autocompleteTriggerVariants({ size }),
        className,
      )}
      {...props}
    />
  )
}

AutocompleteTrigger.displayName = "AutocompleteTrigger"

const AutocompleteInputGroup = ({
  ref,
  size,
  className,
  ...props
}: AutocompleteInputGroupProps) => {
  return (
    <BaseAutocomplete.InputGroup
      ref={ref}
      className={mergeClassName(
        autocompleteInputGroupVariants({ size }),
        className,
      )}
      {...props}
    />
  )
}

AutocompleteInputGroup.displayName = "AutocompleteInputGroup"

const AutocompleteInput = ({
  ref,
  size,
  className,
  ...props
}: AutocompleteInputProps) => {
  return (
    <BaseAutocomplete.Input
      ref={ref}
      className={mergeClassName(autocompleteInputVariants({ size }), className)}
      {...props}
    />
  )
}

AutocompleteInput.displayName = "AutocompleteInput"

const AutocompleteValue = (props: AutocompleteValueProps) => {
  return <BaseAutocomplete.Value {...props} />
}

AutocompleteValue.displayName = "AutocompleteValue"

const AutocompleteIcon = ({
  ref,
  className,
  children,
  ...props
}: AutocompleteIconProps) => {
  return (
    <BaseAutocomplete.Icon
      ref={ref}
      className={mergeClassName(autocompleteIconVariants(), className)}
      {...props}
    >
      {children ?? <ChevronDown aria-hidden="true" size={16} />}
    </BaseAutocomplete.Icon>
  )
}

AutocompleteIcon.displayName = "AutocompleteIcon"

const AutocompleteClear = ({
  ref,
  className,
  children,
  ...props
}: AutocompleteClearProps) => {
  return (
    <BaseAutocomplete.Clear
      ref={ref}
      className={mergeClassName(autocompleteClearVariants(), className)}
      {...props}
    >
      {children ?? <X aria-hidden="true" size={14} />}
    </BaseAutocomplete.Clear>
  )
}

AutocompleteClear.displayName = "AutocompleteClear"

const AutocompletePortal = (props: AutocompletePortalProps) => {
  return <BaseAutocomplete.Portal {...props} />
}

AutocompletePortal.displayName = "AutocompletePortal"

const AutocompleteBackdrop = ({
  ref,
  className,
  ...props
}: AutocompleteBackdropProps) => {
  return (
    <BaseAutocomplete.Backdrop
      ref={ref}
      className={mergeClassName(autocompleteBackdropVariants(), className)}
      {...props}
    />
  )
}

AutocompleteBackdrop.displayName = "AutocompleteBackdrop"

const AutocompletePositioner = ({
  ref,
  className,
  sideOffset = overlayPositionerSideOffset,
  ...props
}: AutocompletePositionerProps) => {
  return (
    <BaseAutocomplete.Positioner
      ref={ref}
      sideOffset={sideOffset}
      className={mergeClassName(autocompletePositionerVariants(), className)}
      {...props}
    />
  )
}

AutocompletePositioner.displayName = "AutocompletePositioner"

const AutocompletePopup = ({
  ref,
  className,
  ...props
}: AutocompletePopupProps) => {
  return (
    <BaseAutocomplete.Popup
      ref={ref}
      className={mergeClassName(autocompletePopupVariants(), className)}
      {...props}
    />
  )
}

AutocompletePopup.displayName = "AutocompletePopup"

const AutocompleteList = ({ ref, className, ...props }: AutocompleteListProps) => {
  return (
    <BaseAutocomplete.List
      ref={ref}
      className={mergeClassName(autocompleteListVariants(), className)}
      {...props}
    />
  )
}

AutocompleteList.displayName = "AutocompleteList"

const AutocompleteItem = ({
  ref,
  className,
  ...props
}: AutocompleteItemProps) => {
  return (
    <BaseAutocomplete.Item
      ref={ref}
      className={mergeClassName(autocompleteItemVariants(), className)}
      {...props}
    />
  )
}

AutocompleteItem.displayName = "AutocompleteItem"

const AutocompleteArrow = ({
  ref,
  className,
  ...props
}: AutocompleteArrowProps) => {
  return (
    <BaseAutocomplete.Arrow
      ref={ref}
      className={mergeClassName(autocompleteArrowVariants(), className)}
      {...props}
    />
  )
}

AutocompleteArrow.displayName = "AutocompleteArrow"

const AutocompleteGroup = ({
  ref,
  className,
  ...props
}: AutocompleteGroupProps) => {
  return (
    <BaseAutocomplete.Group
      ref={ref}
      className={mergeClassName(autocompleteGroupVariants(), className)}
      {...props}
    />
  )
}

AutocompleteGroup.displayName = "AutocompleteGroup"

const AutocompleteGroupLabel = ({
  ref,
  className,
  ...props
}: AutocompleteGroupLabelProps) => {
  return (
    <BaseAutocomplete.GroupLabel
      ref={ref}
      className={mergeClassName(autocompleteGroupLabelVariants(), className)}
      {...props}
    />
  )
}

AutocompleteGroupLabel.displayName = "AutocompleteGroupLabel"

const AutocompleteEmpty = ({
  ref,
  className,
  ...props
}: AutocompleteEmptyProps) => {
  return (
    <BaseAutocomplete.Empty
      ref={ref}
      className={mergeClassName(autocompleteEmptyVariants(), className)}
      {...props}
    />
  )
}

AutocompleteEmpty.displayName = "AutocompleteEmpty"

const AutocompleteStatus = ({
  ref,
  className,
  ...props
}: AutocompleteStatusProps) => {
  return (
    <BaseAutocomplete.Status
      ref={ref}
      className={mergeClassName(autocompleteStatusVariants(), className)}
      {...props}
    />
  )
}

AutocompleteStatus.displayName = "AutocompleteStatus"

const AutocompleteRow = ({ ref, className, ...props }: AutocompleteRowProps) => {
  return (
    <BaseAutocomplete.Row
      ref={ref}
      className={mergeClassName(autocompleteRowVariants(), className)}
      {...props}
    />
  )
}

AutocompleteRow.displayName = "AutocompleteRow"

const AutocompleteCollection = (props: AutocompleteCollectionProps) => {
  return <BaseAutocomplete.Collection {...props} />
}

AutocompleteCollection.displayName = "AutocompleteCollection"

export {
  Autocomplete,
  AutocompleteTrigger,
  AutocompleteInputGroup,
  AutocompleteInput,
  AutocompleteValue,
  AutocompleteIcon,
  AutocompleteClear,
  AutocompletePortal,
  AutocompleteBackdrop,
  AutocompletePositioner,
  AutocompletePopup,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteArrow,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteEmpty,
  AutocompleteStatus,
  AutocompleteRow,
  AutocompleteCollection,
}
