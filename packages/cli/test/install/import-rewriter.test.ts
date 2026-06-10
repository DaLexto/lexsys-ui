import { describe, expect, test } from "vitest";
import {
  prepareInstalledFileContent,
  stripRelativeJsImportExtensions,
} from "../../src/install/import-rewriter.js";
import type { RegistryItem } from "@dalexto/lexsys-registry";

describe("stripRelativeJsImportExtensions", () => {
  test("removes .js from relative import paths", () => {
    const input =
      'import { x } from "./Sidebar.utils.js"\nexport type { Y } from "./Sidebar.types.js"';

    expect(stripRelativeJsImportExtensions(input)).toBe(
      'import { x } from "./Sidebar.utils"\nexport type { Y } from "./Sidebar.types"',
    );
  });
});

describe("prepareInstalledFileContent", () => {
  const sidebarItem: RegistryItem = {
    name: "sidebar",
    canonicalName: "Sidebar",
    type: "block",
    category: "blocks",
    aliases: [],
    files: ["blocks/Sidebar/Sidebar.tsx"],
    dependencies: [],
    registryDependencies: [],
    utilities: [],
    styles: [],
    target: "src/components/ui/Sidebar",
  };

  test("strips .js suffixes on block installs", () => {
    const content = 'import { x } from "./Sidebar.utils.js"';

    expect(prepareInstalledFileContent(content, sidebarItem)).toBe(
      'import { x } from "./Sidebar.utils"',
    );
  });
});
