/**
 * DatePicker.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const datePickerContentVariants = cva("p-0")

export const datePickerInputEmbeddedClasses = (): string => {
  return [
    "h-(--lex-date-picker-trigger-input-embedded-height)",
    "border-0 bg-(--lex-date-picker-trigger-input-embedded-background) shadow-none",
    "px-(--lex-date-picker-trigger-input-embedded-padding-x)",
    "focus-visible:border-0 focus-visible:ring-0",
  ].join(" ")
}

export const datePickerCalendarVariants = cva(
  "flex w-(--lex-date-picker-calendar-width) flex-col gap-(--lex-date-picker-calendar-gap) rounded-(--lex-date-picker-calendar-radius) border border-(--lex-date-picker-calendar-border-color) bg-(--lex-date-picker-calendar-background) p-(--lex-date-picker-calendar-padding) text-(--lex-date-picker-calendar-foreground)",
)

export const datePickerHeaderVariants = cva(
  "flex items-center justify-between gap-(--lex-date-picker-calendar-gap)",
)

export const datePickerMonthLabelVariants = cva(
  "font-(--lex-date-picker-header-font-weight) text-(length:--lex-date-picker-header-font-size) leading-(--lex-date-picker-header-font-line-height) text-(--lex-date-picker-header-foreground)",
)

export const datePickerNavButtonVariants = cva(
  [
    "inline-flex h-(--lex-date-picker-nav-size) w-(--lex-date-picker-nav-size) items-center justify-center rounded-(--lex-date-picker-nav-radius)",
    "text-(--lex-date-picker-nav-foreground) transition-colors duration-(--lex-date-picker-transition-duration) ease-(--lex-date-picker-transition-easing)",
    "outline-none hover:bg-(--lex-date-picker-nav-hover-background) hover:text-(--lex-date-picker-nav-hover-foreground)",
    "focus-visible:ring-(length:--lex-date-picker-focus-ring-width) focus-visible:ring-(--lex-date-picker-focus-ring-color) focus-visible:ring-offset-(length:--lex-date-picker-focus-ring-offset) focus-visible:ring-offset-(--lex-date-picker-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const datePickerWeekdaysVariants = cva(
  "grid grid-cols-7 gap-(--lex-date-picker-calendar-grid-gap)",
)

export const datePickerWeekdayVariants = cva(
  "text-center text-(length:--lex-date-picker-weekday-font-size) font-(--lex-date-picker-weekday-font-weight) leading-(--lex-date-picker-weekday-font-line-height) text-(--lex-date-picker-weekday-foreground)",
)

export const datePickerGridVariants = cva(
  "grid grid-cols-7 gap-(--lex-date-picker-calendar-grid-gap)",
)

export const datePickerDayVariants = cva(
  [
    "inline-flex h-(--lex-date-picker-day-size) w-(--lex-date-picker-day-size) items-center justify-center rounded-(--lex-date-picker-day-radius)",
    "bg-(--lex-date-picker-day-background) text-(length:--lex-date-picker-day-font-size) font-(--lex-date-picker-day-font-weight) leading-(--lex-date-picker-day-font-line-height)",
    "transition-colors duration-(--lex-date-picker-transition-duration) ease-(--lex-date-picker-transition-easing)",
    "outline-none hover:bg-(--lex-date-picker-day-hover-background)",
    "focus-visible:ring-(length:--lex-date-picker-focus-ring-width) focus-visible:ring-(--lex-date-picker-focus-ring-color) focus-visible:ring-offset-(length:--lex-date-picker-focus-ring-offset) focus-visible:ring-offset-(--lex-date-picker-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
  {
    variants: {
      isSelected: {
        true: "bg-(--lex-date-picker-day-selected-background) text-(--lex-date-picker-day-selected-foreground) hover:bg-(--lex-date-picker-day-selected-background)",
        false: "text-(--lex-date-picker-day-foreground)",
      },
      isOutside: {
        true: "text-(--lex-date-picker-day-outside-foreground)",
        false: "",
      },
      isToday: {
        true: "border border-(--lex-date-picker-day-today-border-color)",
        false: "border border-transparent",
      },
    },
    defaultVariants: {
      isSelected: false,
      isOutside: false,
      isToday: false,
    },
  },
)
