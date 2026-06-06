import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Combobox,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
} from "../../../src/components/primitives/Combobox/Combobox.js"

describe("Combobox render", () => {
  it("renders combobox input and list item when defaultOpen", () => {
    render(
      <Combobox defaultOpen>
        <ComboboxInputGroup>
          <ComboboxInput aria-label="City" />
          <ComboboxTrigger />
        </ComboboxInputGroup>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup className="custom-combobox">
              <ComboboxList>
                <ComboboxItem value="nyc">New York</ComboboxItem>
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>,
    )

    expect(screen.getByRole("combobox", { name: "City" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "New York" })).toBeInTheDocument()
  })
})
