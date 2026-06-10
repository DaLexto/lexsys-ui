/**
 * DatePicker.tsx
 *
 * Reference DatePicker component implementation.
 */

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "../Input/Input";
import {
  Popover,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
  PopoverTrigger,
} from "../Popover/Popover";
import type {
  DatePickerCalendarProps,
  DatePickerContentProps,
  DatePickerDayProps,
  DatePickerInputProps,
  DatePickerProps,
  DatePickerTriggerProps,
} from "./DatePicker.types";
import {
  datePickerCalendarVariants,
  datePickerContentVariants,
  datePickerDayVariants,
  datePickerGridVariants,
  datePickerHeaderVariants,
  datePickerInputEmbeddedClasses,
  datePickerMonthLabelVariants,
  datePickerNavButtonVariants,
  datePickerWeekdayVariants,
  datePickerWeekdaysVariants,
} from "./DatePicker.variants";
import { cn } from "../../../utils/cn";

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

const isSameDay = (left: Date, right: Date): boolean => {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
};

const buildCalendarDays = (
  month: Date,
): Array<{ date: Date; inMonth: boolean }> => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const startOffset = firstDay.getDay();
  const days: Array<{ date: Date; inMonth: boolean }> = [];

  for (let offset = startOffset - 1; offset >= 0; offset -= 1) {
    days.push({
      date: new Date(year, monthIndex, -offset),
      inMonth: false,
    });
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push({
      date: new Date(year, monthIndex, day),
      inMonth: true,
    });
  }

  while (days.length % 7 !== 0) {
    const trailingDay = days.length - startOffset - lastDay.getDate() + 1;
    days.push({
      date: new Date(year, monthIndex + 1, trailingDay),
      inMonth: false,
    });
  }

  return days;
};

const formatMonthLabel = (month: Date): string => {
  return month.toLocaleString("default", { month: "long", year: "numeric" });
};

const DatePicker = <Payload = unknown,>(props: DatePickerProps<Payload>) => {
  return <Popover {...props} />;
};

DatePicker.displayName = "DatePicker";

const DatePickerTrigger = <Payload = unknown,>({
  ref,
  ...props
}: DatePickerTriggerProps<Payload>) => {
  return <PopoverTrigger ref={ref} {...props} />;
};

DatePickerTrigger.displayName = "DatePickerTrigger";

const DatePickerInput = ({
  ref,
  className,
  embedded = false,
  size,
  ...props
}: DatePickerInputProps) => {
  return (
    <Input
      ref={ref}
      size={size ?? (embedded ? "sm" : undefined)}
      className={cn(embedded && datePickerInputEmbeddedClasses(), className)}
      {...props}
    />
  );
};

DatePickerInput.displayName = "DatePickerInput";

const DatePickerContent = ({
  ref,
  className,
  children,
  ...props
}: DatePickerContentProps) => {
  return (
    <PopoverPortal>
      <PopoverPositioner>
        <PopoverPopup
          ref={ref}
          className={cn(datePickerContentVariants(), className)}
          {...props}
        >
          {children}
        </PopoverPopup>
      </PopoverPositioner>
    </PopoverPortal>
  );
};

DatePickerContent.displayName = "DatePickerContent";

const DatePickerDay = ({
  ref,
  className,
  date,
  isSelected,
  isOutside,
  isToday,
  type = "button",
  ...props
}: DatePickerDayProps) => {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        datePickerDayVariants({ isSelected, isOutside, isToday }),
        className,
      )}
      {...props}
    >
      {date.getDate()}
    </button>
  );
};

DatePickerDay.displayName = "DatePickerDay";

const DatePickerCalendar = ({
  ref,
  className,
  value,
  defaultMonth,
  month,
  onMonthChange,
  onSelect,
  ...props
}: DatePickerCalendarProps) => {
  const [internalMonth, setInternalMonth] = useState(
    () => defaultMonth ?? value ?? new Date(),
  );
  const viewedMonth = month ?? internalMonth;
  const today = new Date();
  const days = buildCalendarDays(viewedMonth);

  const setMonth = (nextMonth: Date) => {
    if (month === undefined) {
      setInternalMonth(nextMonth);
    }
    onMonthChange?.(nextMonth);
  };

  return (
    <div
      ref={ref}
      className={cn(datePickerCalendarVariants(), className)}
      {...props}
    >
      <div className={datePickerHeaderVariants()}>
        <button
          type="button"
          aria-label="Previous month"
          className={datePickerNavButtonVariants()}
          onClick={() =>
            setMonth(
              new Date(
                viewedMonth.getFullYear(),
                viewedMonth.getMonth() - 1,
                1,
              ),
            )
          }
        >
          <ChevronLeft aria-hidden="true" size={16} />
        </button>
        <div className={datePickerMonthLabelVariants()}>
          {formatMonthLabel(viewedMonth)}
        </div>
        <button
          type="button"
          aria-label="Next month"
          className={datePickerNavButtonVariants()}
          onClick={() =>
            setMonth(
              new Date(
                viewedMonth.getFullYear(),
                viewedMonth.getMonth() + 1,
                1,
              ),
            )
          }
        >
          <ChevronRight aria-hidden="true" size={16} />
        </button>
      </div>

      <div className={datePickerWeekdaysVariants()}>
        {WEEKDAY_LABELS.map((label) => (
          <span key={label} className={datePickerWeekdayVariants()}>
            {label}
          </span>
        ))}
      </div>

      <div className={datePickerGridVariants()}>
        {days.map(({ date, inMonth }) => (
          <DatePickerDay
            key={date.toISOString()}
            date={date}
            isOutside={!inMonth}
            isSelected={value ? isSameDay(date, value) : false}
            isToday={isSameDay(date, today)}
            onClick={() => onSelect?.(date)}
          />
        ))}
      </div>
    </div>
  );
};

DatePickerCalendar.displayName = "DatePickerCalendar";

export {
  DatePicker,
  DatePickerTrigger,
  DatePickerInput,
  DatePickerContent,
  DatePickerCalendar,
  DatePickerDay,
};
