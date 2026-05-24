import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Checkbox,
  CheckboxIndicator,
} from "../../../src/components/primitives/Checkbox/Checkbox.js"
import {
  Field,
  FieldItem,
  FieldLabel,
} from "../../../src/components/primitives/Field/Field.js"

describe("Checkbox render", () => {
  it("renders checkbox compound with field label and custom className", () => {
    render(
      <Field>
        <FieldItem className="flex items-center gap-2">
          <Checkbox defaultChecked className="custom-checkbox">
            <CheckboxIndicator />
          </Checkbox>
          <FieldLabel>Accept terms</FieldLabel>
        </FieldItem>
      </Field>,
    )

    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toHaveClass("custom-checkbox")
    expect(screen.getByText("Accept terms")).toBeInTheDocument()
  })
})
