/**
 * FilterToolbar.tsx
 *
 * Reference FilterToolbar block — compound Toolbar filter row.
 */

import { Button } from "@/components/primitives/Button/Button"
import { Input } from "@/components/primitives/Input/Input"
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/primitives/Select/Select"
import { Toolbar, ToolbarGroup } from "@/components/primitives/Toolbar/Toolbar"
import type {
  FilterToolbarButtonProps,
  FilterToolbarGroupProps,
  FilterToolbarProps,
  FilterToolbarSearchProps,
  FilterToolbarSelectProps,
  FilterToolbarSelectTriggerProps,
  FilterToolbarSelectValueProps,
} from "./FilterToolbar.types"
import {
  filterToolbarClasses,
  filterToolbarSearchClasses,
  filterToolbarSelectTriggerClasses,
} from "./FilterToolbar.variants"
import { cn } from "@/lib/utils"

const FilterToolbar = ({
  ref,
  className,
  orientation = "horizontal",
  ...props
}: FilterToolbarProps) => {
  return (
    <Toolbar
      ref={ref}
      orientation={orientation}
      className={cn(filterToolbarClasses(), className)}
      {...props}
    />
  )
}

FilterToolbar.displayName = "FilterToolbar"

const FilterToolbarGroup = ({
  ref,
  className,
  ...props
}: FilterToolbarGroupProps) => {
  return <ToolbarGroup ref={ref} className={className} {...props} />
}

FilterToolbarGroup.displayName = "FilterToolbarGroup"

const FilterToolbarSearch = ({
  ref,
  className,
  ...props
}: FilterToolbarSearchProps) => {
  return (
    <Input
      ref={ref}
      className={cn(filterToolbarSearchClasses(), className)}
      {...props}
    />
  )
}

FilterToolbarSearch.displayName = "FilterToolbarSearch"

const FilterToolbarButton = ({
  ref,
  className,
  ...props
}: FilterToolbarButtonProps) => {
  return <Button ref={ref} className={className} {...props} />
}

FilterToolbarButton.displayName = "FilterToolbarButton"

const FilterToolbarSelect = <Value = string,>(
  props: FilterToolbarSelectProps<Value>,
) => {
  return <Select {...props} />
}

FilterToolbarSelect.displayName = "FilterToolbarSelect"

const FilterToolbarSelectTrigger = ({
  ref,
  className,
  ...props
}: FilterToolbarSelectTriggerProps) => {
  return (
    <SelectTrigger
      ref={ref}
      className={cn(filterToolbarSelectTriggerClasses(), className)}
      {...props}
    />
  )
}

FilterToolbarSelectTrigger.displayName = "FilterToolbarSelectTrigger"

const FilterToolbarSelectValue = ({
  className,
  ...props
}: FilterToolbarSelectValueProps) => {
  return <SelectValue className={className} {...props} />
}

FilterToolbarSelectValue.displayName = "FilterToolbarSelectValue"

export {
  FilterToolbar,
  FilterToolbarGroup,
  FilterToolbarSearch,
  FilterToolbarButton,
  FilterToolbarSelect,
  FilterToolbarSelectTrigger,
  FilterToolbarSelectValue,
}
