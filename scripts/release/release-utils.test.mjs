#!/usr/bin/env node
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildReleaseNotes,
  buildReleaseNotesLinks,
  extractEntryPrLinks,
  hasRootChangelogSection,
  isPublishedOnNpm,
  listPendingChangesets,
  readChangelogFooterUrl,
  readEntryVersion,
} from "./release-utils.mjs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

test("readEntryVersion returns semver from entry package", () => {
  const version = readEntryVersion(root);
  assert.match(version, /^\d+\.\d+\.\d+/);
});

test("listPendingChangesets ignores README.md", () => {
  const pending = listPendingChangesets(root);
  assert.ok(!pending.includes("README.md"));
});

test("isPublishedOnNpm uses npm view result", () => {
  const exec = (cmd) => {
    assert.match(cmd, /@dalexto\/lexsys@0\.0\.0/);
    return "0.0.0";
  };
  assert.equal(isPublishedOnNpm("0.0.0", { root, exec }), true);
});

test("isPublishedOnNpm returns false when npm view fails", () => {
  const exec = () => {
    throw new Error("not found");
  };
  assert.equal(isPublishedOnNpm("99.99.99", { root, exec }), false);
});

test("hasRootChangelogSection detects promoted version block", () => {
  assert.equal(hasRootChangelogSection("0.1.3", root), true);
  assert.equal(hasRootChangelogSection("99.99.99", root), false);
});

test("readChangelogFooterUrl reads compare link for version", () => {
  const url = readChangelogFooterUrl("0.1.3", root);
  assert.match(url, /lexsys@0\.1\.2\.\.\.lexsys@0\.1\.3/);
});

test("extractEntryPrLinks parses Changesets PR references", () => {
  const links = extractEntryPrLinks("0.1.3", root);
  assert.ok(links.some((link) => link.number === "108"));
});

test("buildReleaseNotesLinks appends compare and PR links", () => {
  const links = buildReleaseNotesLinks("0.1.3", root);
  assert.match(links, /### Links/);
  assert.match(links, /Full diff/);
  assert.match(links, /PR #108/);
});

test("buildReleaseNotes includes root section and links footer", () => {
  const notes = buildReleaseNotes("0.1.3", root);
  assert.match(notes, /TOK\.7/);
  assert.match(notes, /### Links/);
});
