/**
 * FilterToolbar.types.ts
 *
 * Public types for the FilterToolbar block.
 */

import type { ButtonProps } from "@/components/primitives/Button"
import type { InputProps } from "@/components/primitives/Input"
import type {
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
} from "@/components/primitives/Select"
import type {
  ToolbarGroupProps,
  ToolbarProps,
} from "@/components/primitives/Toolbar"

export type FilterToolbarProps = ToolbarProps

export type FilterToolbarGroupProps = ToolbarGroupProps

export type FilterToolbarSearchProps = InputProps

export type FilterToolbarButtonProps = ButtonProps

export type FilterToolbarSelectProps<Value = string> = SelectProps<Value>

export type FilterToolbarSelectTriggerProps = SelectTriggerProps

export type FilterToolbarSelectValueProps = SelectValueProps
