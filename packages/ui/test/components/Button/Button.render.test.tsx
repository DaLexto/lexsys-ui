import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Button } from "../../../src/components/Button/Button.js"

describe("Button render", () => {
  it("renders button label with custom className", () => {
    render(
      <Button variant="primary" className="custom-button">
        Save changes
      </Button>,
    )

    expect(
      screen.getByRole("button", { name: "Save changes" }),
    ).toHaveClass("custom-button")
  })
})
