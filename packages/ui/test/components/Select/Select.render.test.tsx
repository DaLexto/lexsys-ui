import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Select,
  SelectItem,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from "../../../src/components/primitives/Select/Select.js"

describe("Select render", () => {
  it("renders trigger with accessible name", () => {
    render(
      <Select name="fruit" defaultValue="apple">
        <SelectTrigger aria-label="Fruit">
          <SelectValue />
        </SelectTrigger>
        <SelectPortal>
          <SelectPositioner sideOffset={8}>
            <SelectPopup>
              <SelectList>
                <SelectItem value="apple">
                  <SelectItemText>Apple</SelectItemText>
                </SelectItem>
              </SelectList>
            </SelectPopup>
          </SelectPositioner>
        </SelectPortal>
      </Select>,
    )

    expect(screen.getByRole("combobox", { name: "Fruit" })).toBeInTheDocument()
  })
})
