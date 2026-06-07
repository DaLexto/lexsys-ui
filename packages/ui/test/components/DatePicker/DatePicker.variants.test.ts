import { describe, expect, it } from "vitest"
import { datePickerInputEmbeddedClasses } from "../../../src/components/primitives/DatePicker/DatePicker.variants"
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
})
