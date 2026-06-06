/**
 * FilterToolbar.types.ts
 *
 * Public types for the FilterToolbar block.
 */

import type { ButtonProps } from "../../primitives/Button/Button.types"
import type { InputProps } from "../../primitives/Input/Input.types"
import type {
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
} from "../../primitives/Select/Select.types"
import type {
  ToolbarGroupProps,
  ToolbarProps,
} from "../../primitives/Toolbar/Toolbar.types"

export type FilterToolbarProps = ToolbarProps

export type FilterToolbarGroupProps = ToolbarGroupProps

export type FilterToolbarSearchProps = InputProps

export type FilterToolbarButtonProps = ButtonProps

export type FilterToolbarSelectProps<Value = string> = SelectProps<Value>

export type FilterToolbarSelectTriggerProps = SelectTriggerProps

export type FilterToolbarSelectValueProps = SelectValueProps
