import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Field,
  FieldControl,
  FieldLabel,
} from "../../../src/components/primitives/Field/Field.js"

describe("Field render", () => {
  it("renders label and control", () => {
    render(
      <Field name="email" className="custom-field">
        <FieldLabel>Email</FieldLabel>
        <FieldControl placeholder="you@example.com" />
      </Field>,
    )

    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument()
  })
})
