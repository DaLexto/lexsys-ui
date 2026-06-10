#!/usr/bin/env node
/**
 * Ensures every workspace package script has a matching root `{shortName}:{script}` alias.
 * Tier-0 tasks (build, check, lint, lint:fix, test, typecheck, dev) must use `turbo run`.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = join(scriptDir, "..");

const TURBO_TIER0 = new Set([
  "build",
  "check",
  "lint",
  "lint:fix",
  "test",
  "typecheck",
  "dev",
]);

/** package script name → preferred root alias (when not `{shortName}:{script}`) */
const ROOT_ALIAS_BY_PACKAGE_SCRIPT = {
  "registry:templates:sync": "registry:sync",
};

const PACKAGES = [
  { shortName: "tokens", path: "packages/tokens/package.json" },
  { shortName: "ui", path: "packages/ui/package.json" },
  { shortName: "registry", path: "packages/registry/package.json" },
  { shortName: "cli", path: "packages/cli/package.json" },
  {
    shortName: "playground",
    path: "apps/playground/package.json",
    allowMissingScripts: ["test"],
  },
  {
    shortName: "docs",
    path: "apps/docs/package.json",
    allowMissingScripts: ["preview"],
  },
];

const readJson = (relativePath) =>
  JSON.parse(readFileSync(join(root, relativePath), "utf8"));

const rootScripts = readJson("package.json").scripts ?? {};
const errors = [];

const rootAliasForScript = (shortName, scriptName) => {
  const key = `${shortName}:${scriptName}`;
  return ROOT_ALIAS_BY_PACKAGE_SCRIPT[key] ?? key;
};

for (const pkg of PACKAGES) {
  const { shortName, path, allowMissingScripts = [] } = pkg;
  const packageScripts = Object.keys(readJson(path).scripts ?? {});

  for (const scriptName of packageScripts) {
    if (allowMissingScripts.includes(scriptName)) {
      continue;
    }

    const rootAlias = rootAliasForScript(shortName, scriptName);
    const rootCommand = rootScripts[rootAlias];

    if (!rootCommand) {
      errors.push(
        `Missing root alias "${rootAlias}" for ${path} script "${scriptName}"`,
      );
      continue;
    }

    if (TURBO_TIER0.has(scriptName) && !rootCommand.includes("turbo run")) {
      errors.push(
        `Root alias "${rootAlias}" must use "turbo run" for Tier-0 task (got: ${rootCommand})`,
      );
    }

    if (!TURBO_TIER0.has(scriptName) && rootCommand.includes("turbo run")) {
      errors.push(
        `Root alias "${rootAlias}" must not use turbo for Tier-1 task "${scriptName}"`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error("Root script parity check failed:\n");
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log("Root script parity check passed.");
