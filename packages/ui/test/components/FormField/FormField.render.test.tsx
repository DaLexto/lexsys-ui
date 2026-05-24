import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  FormField,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
  FormFieldItem,
  FormFieldLabel,
} from "../../../src/components/blocks/FormField/FormField.js"

describe("FormField render", () => {
  it("composes Field compound parts with label and placeholder", () => {
    render(
      <FormField>
        <FormFieldItem>
          <FormFieldLabel>Email</FormFieldLabel>
          <FormFieldControl
            name="email"
            placeholder="you@example.com"
            className="custom-input"
          />
        </FormFieldItem>
      </FormField>,
    )

    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("you@example.com")).toHaveClass(
      "custom-input",
    )
  })

  it("renders description and marks control invalid when error is set", () => {
    render(
      <FormField>
        <FormFieldItem>
          <FormFieldLabel>Password</FormFieldLabel>
          <FormFieldControl name="password" isInvalid />
        </FormFieldItem>
        <FormFieldDescription>Minimum 8 characters</FormFieldDescription>
        <FormFieldError>Password is required</FormFieldError>
      </FormField>,
    )

    expect(screen.getByText("Minimum 8 characters")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "aria-invalid",
      "true",
    )
  })
})
