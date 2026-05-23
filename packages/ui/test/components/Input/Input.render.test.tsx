import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Input } from "../../../src/components/Input/Input.js"

describe("Input render", () => {
  it("renders input with accessible name and custom className", () => {
    render(
      <Input
        aria-label="Email address"
        placeholder="you@example.com"
        className="custom-input"
      />,
    )

    expect(screen.getByRole("textbox", { name: "Email address" })).toHaveClass(
      "custom-input",
    )
  })
})
