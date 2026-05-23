import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Fieldset,
  FieldsetLegend,
} from "../../../src/components/primitives/Fieldset/Fieldset.js"

describe("Fieldset render", () => {
  it("renders legend with custom className", () => {
    render(
      <Fieldset className="custom-fieldset">
        <FieldsetLegend>Account settings</FieldsetLegend>
      </Fieldset>,
    )

    expect(screen.getByText("Account settings")).toBeInTheDocument()
    expect(
      screen.getByText("Account settings").closest(".custom-fieldset"),
    ).not.toBeNull()
  })
})
