import type { RegistryItem } from "@dalexto/lexsys-registry";
import { describe, expect, test, vi } from "vitest";

import {
  computeRemoteRegistryChecksum,
  isRegistryUrlAllowed,
  parseRemoteRegistry,
  verifyRemoteRegistryChecksum,
  type RemoteRegistryManifest,
} from "../../src/registry/remote.js";

const item: RegistryItem = {
  name: "button",
  canonicalName: "Button",
  type: "component",
  category: "actions",
  aliases: ["btn"],
  files: ["primitives/Button/Button.tsx"],
  dependencies: [],
  registryDependencies: [],
  utilities: [],
  styles: [],
  target: "src/components/ui/Button",
};

describe("parseRemoteRegistry", () => {
  test("accepts a manifest object with version and items", () => {
    const manifest: RemoteRegistryManifest = {
      version: "1.0.0",
      items: [item],
    };

    expect(parseRemoteRegistry(manifest)).toEqual(manifest);
  });

  test("accepts a legacy bare items array", () => {
    expect(parseRemoteRegistry([item])).toEqual({
      version: "unknown",
      items: [item],
    });
  });

  test("accepts optional styles array on manifest objects", () => {
    expect(
      parseRemoteRegistry({
        version: "1.0.0",
        items: [item],
        styles: [
          {
            name: "theme",
            version: "0.0.1",
            files: [{ path: "styles/theme.css", target: "styles/theme.css" }],
          },
        ],
      }),
    ).toEqual({
      version: "1.0.0",
      items: [item],
      styles: [
        {
          name: "theme",
          version: "0.0.1",
          files: [{ path: "styles/theme.css", target: "styles/theme.css" }],
        },
      ],
    });
  });

  test("accepts optional checksum when hash matches manifest body", () => {
    const body = {
      version: "1.0.0",
      items: [item],
    };
    const checksum = computeRemoteRegistryChecksum(body);

    expect(
      parseRemoteRegistry({
        ...body,
        checksum,
      }),
    ).toEqual({
      ...body,
      checksum,
    });
  });

  test("rejects checksum mismatch", () => {
    expect(() => {
      return verifyRemoteRegistryChecksum({
        version: "1.0.0",
        items: [item],
        checksum: "deadbeef",
      });
    }).toThrow("Remote registry checksum mismatch");
  });

  test("rejects invalid manifest shapes with explicit errors", () => {
    expect(() => {
      return parseRemoteRegistry(null);
    }).toThrow("Remote registry must be a JSON array or manifest object.");

    expect(() => {
      return parseRemoteRegistry({ version: "1.0.0" });
    }).toThrow("Remote registry manifest must contain version and items.");

    expect(() => {
      return parseRemoteRegistry({
        version: "1.0.0",
        items: [{ ...item, canonicalName: 123 }],
      });
    }).toThrow("Remote registry contains invalid registry item at index 0.");
  });
});

describe("isRegistryUrlAllowed", () => {
  test("allows any URL when allowlist is empty", () => {
    expect(isRegistryUrlAllowed("https://example.test/registry.json", [])).toBe(
      true,
    );
    expect(
      isRegistryUrlAllowed("https://example.test/registry.json", undefined),
    ).toBe(true);
  });

  test("matches host, origin, prefix, or full URL entries", () => {
    const allowlist = ["cdn.example.test", "https://trusted.example"];

    expect(
      isRegistryUrlAllowed("https://cdn.example.test/registry.json", allowlist),
    ).toBe(true);
    expect(
      isRegistryUrlAllowed(
        "https://trusted.example/v1/registry.json",
        allowlist,
      ),
    ).toBe(true);
    expect(
      isRegistryUrlAllowed("https://other.example/registry.json", allowlist),
    ).toBe(false);
  });
});

describe("fetchRemoteRegistry", () => {
  test("throws when the remote registry responds with a non-OK status", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        json: async () => {
          return {};
        },
      }),
    );

    const { fetchRemoteRegistry } =
      await import("../../src/registry/remote.js");

    await expect(
      fetchRemoteRegistry("https://example.test/registry.json"),
    ).rejects.toThrow("Remote registry responded with HTTP 503");

    vi.unstubAllGlobals();
  });
});
