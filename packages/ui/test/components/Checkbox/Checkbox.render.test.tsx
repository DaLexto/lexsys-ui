import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Checkbox } from "../../../src/components/primitives/Checkbox/Checkbox.js"

describe("Checkbox render", () => {
  it("renders checkbox with label and custom className", () => {
    render(
      <Checkbox defaultChecked className="custom-checkbox">
        Accept terms
      </Checkbox>,
    )

    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toHaveClass("custom-checkbox")
    expect(screen.getByText("Accept terms")).toBeInTheDocument()
  })
})
