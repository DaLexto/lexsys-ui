import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { FormField } from "../../../src/components/blocks/FormField/FormField.js"

describe("FormField render", () => {
  it("composes Field and Input with label and placeholder", () => {
    render(
      <FormField
        label="Email"
        name="email"
        placeholder="you@example.com"
        className="custom-input"
      />,
    )

    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("you@example.com")).toHaveClass(
      "custom-input",
    )
  })

  it("renders description and marks input invalid when errorMessage is set", () => {
    render(
      <FormField
        label="Password"
        name="password"
        description="Minimum 8 characters"
        errorMessage="Password is required"
      />,
    )

    expect(screen.getByText("Minimum 8 characters")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "aria-invalid",
      "true",
    )
  })
})
