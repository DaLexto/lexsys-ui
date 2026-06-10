import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteTrigger,
} from "../../../src/components/primitives/Autocomplete/Autocomplete.js";

describe("Autocomplete render", () => {
  it("renders autocomplete input and list item when defaultOpen", () => {
    render(
      <Autocomplete defaultOpen>
        <AutocompleteInputGroup>
          <AutocompleteInput aria-label="Country" />
          <AutocompleteTrigger />
        </AutocompleteInputGroup>
        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup className="custom-autocomplete">
              <AutocompleteList>
                <AutocompleteItem value="us">United States</AutocompleteItem>
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>,
    );

    expect(
      screen.getByRole("combobox", { name: "Country" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "United States" }),
    ).toBeInTheDocument();
  });
});
