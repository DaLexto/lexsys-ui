import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "../../../src/components/primitives/NumberField/NumberField.js"

describe("NumberField render", () => {
  it("renders number input with custom className", () => {
    render(
      <NumberField defaultValue={5} className="custom-number-field">
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label="Decrease" />
          <NumberFieldInput aria-label="Quantity" />
          <NumberFieldIncrement aria-label="Increase" />
        </NumberFieldGroup>
      </NumberField>,
    )

    expect(
      screen.getByRole("textbox", { name: "Quantity" }),
    ).toBeInTheDocument()
    expect(
      screen
        .getByRole("textbox", { name: "Quantity" })
        .closest(".custom-number-field"),
    ).not.toBeNull()
  })
})
