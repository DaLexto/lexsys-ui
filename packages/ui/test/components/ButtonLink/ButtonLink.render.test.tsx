import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ButtonLink } from "../../../src/components/primitives/ButtonLink/ButtonLink.js";

describe("ButtonLink render", () => {
  it("renders anchor host with href and button variant classes", () => {
    render(
      <ButtonLink href="/profile" variant="outline" className="custom-link">
        Profile
      </ButtonLink>,
    );

    // Base UI Button keeps button semantics on custom hosts (role="button" on <a>).
    const control = screen.getByRole("button", { name: "Profile" });

    expect(control.tagName).toBe("A");
    expect(control).toHaveAttribute("href", "/profile");
    expect(control).toHaveClass("custom-link");
    expect(control.className).toContain(
      "border-(--lex-button-secondary-border-color)",
    );
  });
});
