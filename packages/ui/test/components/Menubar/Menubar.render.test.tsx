import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Menubar } from "../../../src/components/primitives/Menubar/Menubar.js";

describe("Menubar render", () => {
  it("renders menubar with custom className", () => {
    render(
      <Menubar aria-label="Application" className="custom-menubar">
        <button type="button">File</button>
      </Menubar>,
    );

    expect(screen.getByRole("menubar")).toHaveClass("custom-menubar");
    expect(screen.getByRole("button", { name: "File" })).toBeInTheDocument();
  });
});
