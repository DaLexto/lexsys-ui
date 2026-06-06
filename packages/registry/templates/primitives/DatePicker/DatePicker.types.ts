import type { ButtonHTMLAttributes, HTMLAttributes, Ref } from "react"
/**
 * DatePicker.types.ts
 *
 * Public and internal types for DatePicker component.
 */

import type { InputProps } from "../Input/Input.types"
import type {
  PopoverProps,
  PopoverTriggerProps,
} from "../Popover/Popover.types"

export type DatePickerProps<Payload = unknown> = PopoverProps<Payload>

export type DatePickerTriggerProps<Payload = unknown> =
  PopoverTriggerProps<Payload>

export type DatePickerInputProps = InputProps

export interface DatePickerContentProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "className"
> {
  ref?: Ref<HTMLDivElement>
  className?: string
}

export interface DatePickerCalendarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "className" | "onSelect"
> {
  ref?: Ref<HTMLDivElement>
  className?: string
  value?: Date
  defaultMonth?: Date
  month?: Date
  onMonthChange?: (month: Date) => void
  onSelect?: (date: Date) => void
}

export interface DatePickerDayProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> {
  ref?: Ref<HTMLButtonElement>
  className?: string
  date: Date
  isSelected?: boolean
  isOutside?: boolean
  isToday?: boolean
}
