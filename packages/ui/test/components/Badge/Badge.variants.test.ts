import { describe, expect, test } from "vitest";
import { badgeVariants } from "../../../src/components/primitives/Badge/Badge.variants.js";
import { testCssVarPrefix as p } from "../../config/prefix.js";

describe("badgeVariants", () => {
  test("uses token-backed base classes", () => {
    const className = badgeVariants();

    expect(className).toContain(`rounded-(--${p}-badge-radius)`);
    expect(className).toContain(`font-(--${p}-badge-font-weight)`);
    expect(className).toContain(`duration-(--${p}-badge-transition-duration)`);
  });

  test("default variant is neutral solid sm", () => {
    const className = badgeVariants();

    expect(className).toContain(`bg-(--${p}-badge-neutral-background)`);
    expect(className).toContain(`text-(--${p}-badge-neutral-foreground)`);
    expect(className).toContain(`border-(--${p}-badge-neutral-border-color)`);
    expect(className).toContain(`h-(--${p}-badge-height-sm)`);
    expect(className).toContain(`text-(length:--${p}-badge-font-size-sm)`);
  });

  test("size scale xs → xl maps distinct token slots", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

    for (const size of sizes) {
      const className = badgeVariants({ size });

      expect(className).toContain(`h-(--${p}-badge-height-${size})`);
      expect(className).toContain(`px-(--${p}-badge-padding-x-${size})`);
      expect(className).toContain(
        `text-(length:--${p}-badge-font-size-${size})`,
      );
    }
  });

  test("solid appearance: primary uses solid background and inverse text", () => {
    const className = badgeVariants({
      variant: "primary",
      appearance: "solid",
    });

    expect(className).toContain(`bg-(--${p}-badge-primary-background)`);
    expect(className).toContain(`text-(--${p}-badge-primary-foreground)`);
    expect(className).toContain(`border-(--${p}-badge-primary-border-color)`);
  });

  test("subtle appearance: primary uses subtle background and primary text", () => {
    const className = badgeVariants({
      variant: "primary",
      appearance: "subtle",
    });

    expect(className).toContain(`bg-(--${p}-badge-primary-subtle-background)`);
    expect(className).toContain(
      `text-(--${p}-badge-primary-subtle-foreground)`,
    );
    expect(className).toContain("border-transparent");
  });

  test("subtle appearance: neutral uses subtle background and secondary text", () => {
    const className = badgeVariants({
      variant: "neutral",
      appearance: "subtle",
    });

    expect(className).toContain(`bg-(--${p}-badge-neutral-subtle-background)`);
    expect(className).toContain(
      `text-(--${p}-badge-neutral-subtle-foreground)`,
    );
    expect(className).toContain("border-transparent");
  });

  test("outline appearance: transparent background with variant border", () => {
    const className = badgeVariants({
      variant: "primary",
      appearance: "outline",
    });

    expect(className).toContain(`bg-(--${p}-badge-outline-background)`);
    expect(className).toContain(`border-(--${p}-badge-primary-border-color)`);
    expect(className).not.toContain(`bg-(--${p}-badge-primary-background)`);
  });

  test("ghost appearance: no background, no border, variant-toned text", () => {
    const primary = badgeVariants({ variant: "primary", appearance: "ghost" });

    expect(primary).toContain("bg-transparent");
    expect(primary).toContain("border-transparent");
    expect(primary).toContain(`text-(--${p}-badge-primary-ghost-foreground)`);

    const neutral = badgeVariants({ variant: "neutral", appearance: "ghost" });

    expect(neutral).toContain(`text-(--${p}-badge-neutral-ghost-foreground)`);
  });

  test("success and warning appearances use feedback tokens", () => {
    const successSolid = badgeVariants({
      variant: "success",
      appearance: "solid",
    });

    expect(successSolid).toContain(
      `bg-(--${p}-color-feedback-success-background)`,
    );
    expect(successSolid).toContain(
      `text-(--${p}-color-feedback-success-foreground)`,
    );

    const warningSubtle = badgeVariants({
      variant: "warning",
      appearance: "subtle",
    });

    expect(warningSubtle).toContain(
      `bg-(--${p}-color-feedback-warning-background)`,
    );
    expect(warningSubtle).toContain("border-transparent");

    const dangerGhost = badgeVariants({
      variant: "danger",
      appearance: "ghost",
    });

    expect(dangerGhost).toContain("bg-transparent");
    expect(dangerGhost).toContain(
      `text-(--${p}-color-feedback-danger-foreground)`,
    );
  });
});
