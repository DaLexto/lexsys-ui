import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Textarea } from "../../../src/components/Textarea/Textarea.js"

describe("Textarea render", () => {
  it("renders textarea with accessible name and custom className", () => {
    render(
      <Textarea
        aria-label="Notes"
        placeholder="Add details"
        className="custom-textarea"
      />,
    )

    expect(screen.getByRole("textbox", { name: "Notes" })).toHaveClass(
      "custom-textarea",
    )
  })
})
