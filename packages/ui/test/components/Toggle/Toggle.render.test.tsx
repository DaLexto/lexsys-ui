import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Toggle } from "../../../src/components/Toggle/Toggle.js"

describe("Toggle render", () => {
  it("renders toggle with accessible name and custom className", () => {
    render(
      <Toggle aria-label="Bold text" defaultPressed className="custom-toggle">
        B
      </Toggle>,
    )

    expect(screen.getByRole("button", { name: "Bold text" })).toHaveClass(
      "custom-toggle",
    )
  })
})
