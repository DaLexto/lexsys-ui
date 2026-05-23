import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Slider } from "../../../src/components/primitives/Slider/Slider.js"

describe("Slider render", () => {
  it("renders slider with custom className", () => {
    render(
      <Slider
        defaultValue={30}
        min={0}
        max={100}
        aria-label="Volume"
        className="custom-slider"
      />,
    )

    expect(screen.getByRole("group", { name: "Volume" })).toHaveClass(
      "custom-slider",
    )
  })
})
