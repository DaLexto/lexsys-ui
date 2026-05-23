import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Toggle } from "../../../src/components/Toggle/Toggle.js"
import { ToggleGroup } from "../../../src/components/ToggleGroup/ToggleGroup.js"

describe("ToggleGroup render", () => {
  it("renders toggle group with custom className", () => {
    render(
      <ToggleGroup className="custom-toggle-group">
        <Toggle value="left" aria-label="Align left">
          L
        </Toggle>
        <Toggle value="right" aria-label="Align right">
          R
        </Toggle>
      </ToggleGroup>,
    )

    expect(screen.getByRole("group")).toHaveClass("custom-toggle-group")
    expect(
      screen.getByRole("button", { name: "Align left" }),
    ).toBeInTheDocument()
  })
})
