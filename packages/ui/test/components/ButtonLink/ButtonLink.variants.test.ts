import { describe, expect, test } from "vitest";
import { buttonVariants } from "../../../src/components/primitives/ButtonLink/ButtonLink.variants.js";
import { testCssVarPrefix as p } from "../../config/prefix.js";

describe("buttonLinkVariants", () => {
  test("reuses token-backed Button variant classes", () => {
    const className = buttonVariants();

    expect(className).toContain(`bg-(--${p}-button-primary-background)`);
    expect(className).toContain(`text-(--${p}-button-primary-foreground)`);
    expect(className).toContain(`rounded-(--${p}-button-radius)`);
  });
});
