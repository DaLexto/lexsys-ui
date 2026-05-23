import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../src/components/primitives/Alert/Alert.js"

describe("Alert render", () => {
  it("renders title and description with alert role", () => {
    render(
      <Alert variant="neutral" className="custom-alert">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something needs your attention.</AlertDescription>
      </Alert>,
    )

    expect(screen.getByRole("alert")).toBeInTheDocument()
    expect(screen.getByText("Heads up")).toBeInTheDocument()
    expect(
      screen.getByText("Something needs your attention."),
    ).toBeInTheDocument()
    expect(screen.getByRole("alert")).toHaveClass("custom-alert")
  })
})
