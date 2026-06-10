import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  OtpField,
  OtpFieldInput,
} from "../../../src/components/primitives/OtpField/OtpField.js";

describe("OtpField render", () => {
  it("renders otp inputs with custom className", () => {
    render(
      <OtpField length={1} className="custom-otp-field">
        <OtpFieldInput />
      </OtpField>,
    );

    expect(screen.getByRole("group")).toHaveClass("custom-otp-field");
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
