import { describe, expect, it } from "vitest";
import {
  pageHeaderActionsClasses,
  pageHeaderClasses,
  pageHeaderHeadingClasses,
  pageHeaderTopClasses,
} from "../../../src/components/blocks/PageHeader/PageHeader.variants";
import { testCssVarPrefix as p } from "../../config/prefix.js";

describe("PageHeader variants", () => {
  it("uses page-header component tokens for root shell rhythm", () => {
    expect(pageHeaderClasses()).toContain(`gap-(--${p}-page-header-root-gap)`);
    expect(pageHeaderClasses()).toContain(
      `border-(--${p}-page-header-root-border-color)`,
    );
    expect(pageHeaderClasses()).toContain(
      `pb-(--${p}-page-header-root-padding-bottom)`,
    );
    expect(pageHeaderClasses()).not.toContain(`--${p}-space-`);
  });

  it("uses page-header component tokens for nested layout gaps", () => {
    expect(pageHeaderTopClasses()).toContain(
      `gap-(--${p}-page-header-top-gap)`,
    );
    expect(pageHeaderHeadingClasses()).toContain(
      `gap-(--${p}-page-header-heading-gap)`,
    );
    expect(pageHeaderActionsClasses()).toContain(
      `gap-(--${p}-page-header-actions-gap)`,
    );
    expect(pageHeaderTopClasses()).not.toContain(`--${p}-space-`);
  });
});
