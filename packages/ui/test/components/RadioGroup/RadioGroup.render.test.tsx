import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../src/components/RadioGroup/RadioGroup.js"

describe("RadioGroup render", () => {
  it("renders radio group with custom className", () => {
    render(
      <RadioGroup defaultValue="a" className="custom-radio-group">
        <RadioGroupItem value="a">Option A</RadioGroupItem>
        <RadioGroupItem value="b">Option B</RadioGroupItem>
      </RadioGroup>,
    )

    expect(screen.getByRole("radiogroup")).toHaveClass("custom-radio-group")
    expect(screen.getByText("Option A")).toBeInTheDocument()
  })
})
