import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Toolbar,
  ToolbarButton,
} from "../../../src/components/primitives/Toolbar/Toolbar.js";

describe("Toolbar render", () => {
  it("renders toolbar button with custom className", () => {
    render(
      <Toolbar aria-label="Formatting" className="custom-toolbar">
        <ToolbarButton>Bold</ToolbarButton>
      </Toolbar>,
    );

    expect(screen.getByRole("toolbar")).toHaveClass("custom-toolbar");
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
  });
});
