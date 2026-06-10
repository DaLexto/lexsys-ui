import { describe, expect, it } from "vitest";
import {
  breadcrumbLinkVariants,
  breadcrumbPageVariants,
} from "../../../src/components/primitives/Breadcrumb/Breadcrumb.variants.js";
import { testCssVarPrefix as p } from "../../config/prefix.js";

describe("Breadcrumb variants", () => {
  it("uses token-backed link styling", () => {
    const className = breadcrumbLinkVariants();

    expect(className).toContain(`text-(--${p}-breadcrumb-link-foreground)`);
    expect(className).toContain(
      `hover:text-(--${p}-breadcrumb-link-hover-foreground)`,
    );
  });

  it("uses token-backed page styling", () => {
    expect(breadcrumbPageVariants()).toContain(
      `text-(--${p}-breadcrumb-page-foreground)`,
    );
    expect(breadcrumbPageVariants()).toContain(
      `font-(--${p}-breadcrumb-page-font-weight)`,
    );
  });
});
