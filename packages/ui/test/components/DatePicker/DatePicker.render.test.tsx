import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerInput,
  DatePickerTrigger,
} from "../../../src/components/primitives/DatePicker/DatePicker.js"

describe("DatePicker render", () => {
  it("renders trigger input and calendar grid", () => {
    render(
      <DatePicker defaultOpen>
        <DatePickerTrigger>
          <DatePickerInput
            aria-label="Select date"
            placeholder="Pick a date"
            readOnly
          />
        </DatePickerTrigger>
        <DatePickerContent>
          <DatePickerCalendar />
        </DatePickerContent>
      </DatePicker>,
    )

    expect(screen.getByLabelText("Select date")).toBeInTheDocument()
    expect(screen.getByLabelText("Previous month")).toBeInTheDocument()
    expect(screen.getByLabelText("Next month")).toBeInTheDocument()
  })
})
