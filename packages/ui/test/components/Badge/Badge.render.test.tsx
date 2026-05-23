import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Badge } from "../../../src/components/Badge/Badge.js"

describe("Badge render", () => {
  it("renders badge text with custom className", () => {
    render(
      <Badge tone="neutral" className="custom-badge">
        New
      </Badge>,
    )

    expect(screen.getByText("New")).toHaveClass("custom-badge")
  })
})
