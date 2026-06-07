import { describe, expect, it } from "vitest"
import {
  datePickerGridVariants,
  datePickerInputEmbeddedClasses,
  datePickerWeekdaysVariants,
} from "../../../src/components/primitives/DatePicker/DatePicker.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("DatePicker variants", () => {
  it("uses embedded trigger input tokens for toolbar slots", () => {
    const classes = datePickerInputEmbeddedClasses()

    expect(classes).toContain(
      `h-(--${p}-date-picker-trigger-input-embedded-height)`,
    )
    expect(classes).toContain(
      `bg-(--${p}-date-picker-trigger-input-embedded-background)`,
    )
    expect(classes).toContain("border-0")
    expect(classes).toContain("focus-visible:ring-0")
  })

  it("uses date-picker calendar grid gap for weekday and day grids", () => {
    expect(datePickerWeekdaysVariants()).toContain(
      `gap-(--${p}-date-picker-calendar-grid-gap)`,
    )
    expect(datePickerGridVariants()).toContain(
      `gap-(--${p}-date-picker-calendar-grid-gap)`,
    )
    expect(datePickerGridVariants()).not.toContain(`--${p}-space-`)
  })
})
