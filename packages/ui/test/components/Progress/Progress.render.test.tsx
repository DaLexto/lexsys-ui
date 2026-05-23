import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Progress } from "../../../src/components/primitives/Progress/Progress.js"

describe("Progress render", () => {
  it("renders progress label with custom className", () => {
    render(
      <Progress
        value={40}
        label="Uploading"
        aria-label="Upload progress"
        className="custom-progress"
      />,
    )

    expect(screen.getByText("Uploading")).toBeInTheDocument()
    expect(screen.getByRole("progressbar")).toHaveClass("custom-progress")
  })
})
