import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Form } from "../../../src/components/primitives/Form/Form.js"
import {
  Field,
  FieldControl,
  FieldLabel,
} from "../../../src/components/primitives/Field/Field.js"

describe("Form render", () => {
  it("renders form field with custom className", () => {
    render(
      <Form className="custom-form">
        <Field name="username">
          <FieldLabel>Username</FieldLabel>
          <FieldControl placeholder="Enter username" />
        </Field>
      </Form>,
    )

    expect(screen.getByText("Username")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument()
    expect(screen.getByText("Username").closest(".custom-form")).not.toBeNull()
  })
})
