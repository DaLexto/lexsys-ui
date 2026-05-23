/**
 * Select.tsx
 *
 * Reference Select component implementation.
 */

import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { Select as BaseSelect } from "@base-ui/react/select"
import type {
  SelectArrowProps,
  SelectBackdropProps,
  SelectGroupLabelProps,
  SelectGroupProps,
  SelectIconProps,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectLabelProps,
  SelectListProps,
  SelectPopupProps,
  SelectPortalProps,
  SelectPositionerProps,
  SelectProps,
  SelectScrollDownArrowProps,
  SelectScrollUpArrowProps,
  SelectTriggerProps,
  SelectValueProps,
} from "./Select.types"
import {
  selectArrowVariants,
  selectBackdropVariants,
  selectGroupLabelVariants,
  selectGroupVariants,
  selectIconVariants,
  selectItemIndicatorVariants,
  selectItemTextVariants,
  selectItemVariants,
  selectLabelVariants,
  selectListVariants,
  selectPopupVariants,
  selectPositionerVariants,
  selectScrollArrowVariants,
  selectTriggerVariants,
  selectValueVariants,
} from "./Select.variants"
import { mergeClassName } from "../../utils/merge-class-name"
import { overlayPositionerSideOffset } from "../../utils/cn"

const Select = <Value = string, Multiple extends boolean | undefined = false>(
  props: SelectProps<Value, Multiple>,
) => {
  return <BaseSelect.Root {...props} />
}

Select.displayName = "Select"

const SelectLabel = ({ ref, className, ...props }: SelectLabelProps) => {
  return (
    <BaseSelect.Label
      ref={ref}
      className={mergeClassName(selectLabelVariants(), className)}
      {...props}
    />
  )
}

SelectLabel.displayName = "SelectLabel"

const SelectTrigger = ({
  ref,
  size,
  className,
  ...props
}: SelectTriggerProps) => {
  return (
    <BaseSelect.Trigger
      ref={ref}
      className={mergeClassName(selectTriggerVariants({ size }), className)}
      {...props}
    />
  )
}

SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ ref, className, ...props }: SelectValueProps) => {
  return (
    <BaseSelect.Value
      ref={ref}
      className={mergeClassName(selectValueVariants(), className)}
      {...props}
    />
  )
}

SelectValue.displayName = "SelectValue"

const SelectIcon = ({
  ref,
  className,
  children,
  ...props
}: SelectIconProps) => {
  return (
    <BaseSelect.Icon
      ref={ref}
      className={mergeClassName(selectIconVariants(), className)}
      {...props}
    >
      {children ?? <ChevronDown aria-hidden="true" size={16} />}
    </BaseSelect.Icon>
  )
}

SelectIcon.displayName = "SelectIcon"

const SelectPortal = (props: SelectPortalProps) => {
  return <BaseSelect.Portal {...props} />
}

SelectPortal.displayName = "SelectPortal"

const SelectBackdrop = ({ ref, className, ...props }: SelectBackdropProps) => {
  return (
    <BaseSelect.Backdrop
      ref={ref}
      className={mergeClassName(selectBackdropVariants(), className)}
      {...props}
    />
  )
}

SelectBackdrop.displayName = "SelectBackdrop"

const SelectPositioner = ({
  ref,
  className,
  alignItemWithTrigger = false,
  sideOffset = overlayPositionerSideOffset,
  ...props
}: SelectPositionerProps) => {
  return (
    <BaseSelect.Positioner
      ref={ref}
      alignItemWithTrigger={alignItemWithTrigger}
      sideOffset={sideOffset}
      className={mergeClassName(selectPositionerVariants(), className)}
      {...props}
    />
  )
}

SelectPositioner.displayName = "SelectPositioner"

const SelectPopup = ({ ref, className, ...props }: SelectPopupProps) => {
  return (
    <BaseSelect.Popup
      ref={ref}
      className={mergeClassName(selectPopupVariants(), className)}
      {...props}
    />
  )
}

SelectPopup.displayName = "SelectPopup"

const SelectList = ({ ref, className, ...props }: SelectListProps) => {
  return (
    <BaseSelect.List
      ref={ref}
      className={mergeClassName(selectListVariants(), className)}
      {...props}
    />
  )
}

SelectList.displayName = "SelectList"

const SelectItem = ({ ref, className, ...props }: SelectItemProps) => {
  return (
    <BaseSelect.Item
      ref={ref}
      className={mergeClassName(selectItemVariants(), className)}
      {...props}
    />
  )
}

SelectItem.displayName = "SelectItem"

const SelectItemIndicator = ({
  ref,
  className,
  children,
  ...props
}: SelectItemIndicatorProps) => {
  return (
    <BaseSelect.ItemIndicator
      ref={ref}
      className={mergeClassName(selectItemIndicatorVariants(), className)}
      {...props}
    >
      {children ?? <Check aria-hidden="true" size={14} />}
    </BaseSelect.ItemIndicator>
  )
}

SelectItemIndicator.displayName = "SelectItemIndicator"

const SelectItemText = ({ ref, className, ...props }: SelectItemTextProps) => {
  return (
    <BaseSelect.ItemText
      ref={ref}
      className={mergeClassName(selectItemTextVariants(), className)}
      {...props}
    />
  )
}

SelectItemText.displayName = "SelectItemText"

const SelectArrow = ({ ref, className, ...props }: SelectArrowProps) => {
  return (
    <BaseSelect.Arrow
      ref={ref}
      className={mergeClassName(selectArrowVariants(), className)}
      {...props}
    />
  )
}

SelectArrow.displayName = "SelectArrow"

const SelectScrollUpArrow = ({
  ref,
  className,
  children,
  ...props
}: SelectScrollUpArrowProps) => {
  return (
    <BaseSelect.ScrollUpArrow
      ref={ref}
      className={mergeClassName(selectScrollArrowVariants(), className)}
      {...props}
    >
      {children ?? <ChevronUp aria-hidden="true" size={16} />}
    </BaseSelect.ScrollUpArrow>
  )
}

SelectScrollUpArrow.displayName = "SelectScrollUpArrow"

const SelectScrollDownArrow = ({
  ref,
  className,
  children,
  ...props
}: SelectScrollDownArrowProps) => {
  return (
    <BaseSelect.ScrollDownArrow
      ref={ref}
      className={mergeClassName(selectScrollArrowVariants(), className)}
      {...props}
    >
      {children ?? <ChevronDown aria-hidden="true" size={16} />}
    </BaseSelect.ScrollDownArrow>
  )
}

SelectScrollDownArrow.displayName = "SelectScrollDownArrow"

const SelectGroup = ({ ref, className, ...props }: SelectGroupProps) => {
  return (
    <BaseSelect.Group
      ref={ref}
      className={mergeClassName(selectGroupVariants(), className)}
      {...props}
    />
  )
}

SelectGroup.displayName = "SelectGroup"

const SelectGroupLabel = ({
  ref,
  className,
  ...props
}: SelectGroupLabelProps) => {
  return (
    <BaseSelect.GroupLabel
      ref={ref}
      className={mergeClassName(selectGroupLabelVariants(), className)}
      {...props}
    />
  )
}

SelectGroupLabel.displayName = "SelectGroupLabel"

export {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectPositioner,
  SelectPopup,
  SelectList,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectArrow,
  SelectScrollUpArrow,
  SelectScrollDownArrow,
  SelectGroup,
  SelectGroupLabel,
}
