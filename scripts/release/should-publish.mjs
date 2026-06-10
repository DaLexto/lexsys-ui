#!/usr/bin/env node
// Exit 0 when main should run npm publish; exit 0 with should_publish=false when skipped; exit 1 when blocked.
import { appendFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  hasRootChangelogSection,
  isPublishedOnNpm,
  listPendingChangesets,
  readEntryVersion,
} from "./release-utils.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const version = readEntryVersion(root);
const pending = listPendingChangesets(root);

const writeOutput = (should) => {
  const value = should ? "true" : "false";
  console.log(`should_publish=${value}`);
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `should_publish=${value}\n`);
  }
};

if (pending.length > 0) {
  console.log(
    `skip: ${pending.length} pending changeset(s) — merge Version packages PR first`,
  );
  writeOutput(false);
  process.exit(0);
}

if (isPublishedOnNpm(version, { root })) {
  console.log(`skip: @dalexto/lexsys@${version} already on npm`);
  writeOutput(false);
  process.exit(0);
}

if (!hasRootChangelogSection(version, root)) {
  console.error(
    `::error::CHANGELOG.md is missing ## [${version}] — promote [Unreleased] before release. See .cursor/skills/changelog-update/SKILL.md`,
  );
  writeOutput(false);
  process.exit(1);
}

console.log(
  `publish: @dalexto/lexsys@${version} not on npm; root CHANGELOG section present`,
);
writeOutput(true);
process.exit(0);
