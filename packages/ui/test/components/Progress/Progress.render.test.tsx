import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
} from "../../../src/components/primitives/Progress/Progress.js"

describe("Progress render", () => {
  it("renders progress compound with custom className", () => {
    render(
      <Progress
        value={40}
        aria-label="Upload progress"
        className="custom-progress"
      >
        <ProgressLabel>Uploading</ProgressLabel>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>,
    )

    expect(screen.getByText("Uploading")).toBeInTheDocument()
    expect(screen.getByRole("progressbar")).toHaveClass("custom-progress")
  })
})
