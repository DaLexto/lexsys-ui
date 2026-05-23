import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Meter } from "../../../src/components/primitives/Meter/Meter.js"

describe("Meter render", () => {
  it("renders meter label with custom className", () => {
    render(
      <Meter
        value={65}
        min={0}
        max={100}
        label="Storage used"
        className="custom-meter"
      />,
    )

    expect(screen.getByText("Storage used")).toBeInTheDocument()
    expect(screen.getByRole("meter")).toHaveClass("custom-meter")
  })
})
