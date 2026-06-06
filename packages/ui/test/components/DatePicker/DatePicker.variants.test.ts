import { describe, expect, it } from "vitest"
import {
  datePickerCalendarVariants,
  datePickerDayVariants,
} from "../../../src/components/primitives/DatePicker/DatePicker.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("DatePicker variants", () => {
  it("uses token-backed calendar styling", () => {
    const className = datePickerCalendarVariants()

    expect(className).toContain(`bg-(--${p}-date-picker-calendar-background)`)
    expect(className).toContain(
      `border-(--${p}-date-picker-calendar-border-color)`,
    )
    expect(className).toContain(`w-(--${p}-date-picker-calendar-width)`)
  })

  it("maps day state variants through component tokens", () => {
    const selectedClassName = datePickerDayVariants({
      isSelected: true,
      isToday: true,
      isOutside: false,
    })

    expect(selectedClassName).toContain(
      `bg-(--${p}-date-picker-day-selected-background)`,
    )
    expect(selectedClassName).toContain(
      `text-(--${p}-date-picker-day-selected-foreground)`,
    )
    expect(selectedClassName).toContain(
      `border-(--${p}-date-picker-day-today-border-color)`,
    )

    const outsideClassName = datePickerDayVariants({ isOutside: true })

    expect(outsideClassName).toContain(
      `text-(--${p}-date-picker-day-outside-foreground)`,
    )
  })
})
