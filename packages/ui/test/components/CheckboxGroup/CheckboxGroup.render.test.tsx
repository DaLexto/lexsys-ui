import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Checkbox,
  CheckboxIndicator,
} from "../../../src/components/primitives/Checkbox/Checkbox.js";
import { CheckboxGroup } from "../../../src/components/primitives/CheckboxGroup/CheckboxGroup.js";

describe("CheckboxGroup render", () => {
  it("renders checkbox group with child checkbox and custom className", () => {
    render(
      <CheckboxGroup
        aria-label="Notification channels"
        className="custom-checkbox-group"
      >
        <Checkbox value="email">
          <CheckboxIndicator />
        </Checkbox>
      </CheckboxGroup>,
    );

    expect(screen.getByRole("group")).toHaveClass("custom-checkbox-group");
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });
});
