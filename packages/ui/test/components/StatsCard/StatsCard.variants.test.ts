import { describe, expect, it } from "vitest";
import {
  statsCardTrendClasses,
  statsCardValueClasses,
} from "../../../src/components/blocks/StatsCard/StatsCard.variants";
import { testCssVarPrefix as p } from "../../config/prefix.js";

describe("StatsCard variants", () => {
  it("uses stats-card component tokens for value and trend typography", () => {
    expect(statsCardValueClasses()).toContain(
      `text-(length:--${p}-stats-card-value-font-size)`,
    );
    expect(statsCardValueClasses()).toContain(
      `text-(--${p}-stats-card-value-foreground)`,
    );
    expect(statsCardTrendClasses()).toContain(
      `text-(length:--${p}-stats-card-trend-font-size)`,
    );
    expect(statsCardTrendClasses()).toContain(
      `text-(--${p}-stats-card-trend-foreground)`,
    );
    expect(statsCardValueClasses()).not.toContain(
      `--${p}-typography-heading-md`,
    );
  });
});
