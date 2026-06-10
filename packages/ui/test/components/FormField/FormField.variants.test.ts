import { describe, expect, it } from "vitest";
import { formFieldClasses } from "../../../src/components/blocks/FormField/FormField.variants";
import { testCssVarPrefix as p } from "../../config/prefix.js";

describe("FormField variants", () => {
  it("uses form-field component tokens for root gap", () => {
    expect(formFieldClasses()).toContain(`gap-(--${p}-form-field-root-gap)`);
    expect(formFieldClasses()).not.toContain(`--${p}-space-`);
  });
});
