import { describe, expect, it } from "vitest";
import {
  filterToolbarClasses,
  filterToolbarGroupClasses,
} from "../../../src/components/blocks/FilterToolbar/FilterToolbar.variants";
import { testCssVarPrefix as p } from "../../config/prefix.js";

describe("FilterToolbar variants", () => {
  it("uses toolbar component tokens for root chrome", () => {
    expect(filterToolbarClasses()).toContain(`gap-(--${p}-toolbar-root-gap)`);
    expect(filterToolbarClasses()).toContain(
      `border-(--${p}-toolbar-root-border-color)`,
    );
    expect(filterToolbarClasses()).toContain(
      `bg-(--${p}-toolbar-root-background)`,
    );
    expect(filterToolbarClasses()).toContain(`p-(--${p}-toolbar-root-padding)`);
    expect(filterToolbarClasses()).not.toContain(`--${p}-space-2`);
  });

  it("uses toolbar group gap for child clusters", () => {
    expect(filterToolbarGroupClasses()).toContain(
      `gap-(--${p}-toolbar-group-gap)`,
    );
  });
});
