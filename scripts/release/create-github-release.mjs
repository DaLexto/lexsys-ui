#!/usr/bin/env node
// Create one GitHub release after npm publish: tag lexsys@<version>, title Lexsys <version>.
import { mkdirSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildReleaseNotes,
  githubReleaseExists,
  readEntryVersion,
  waitForNpmPublish,
} from "./release-utils.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = join(scriptDir, "../..");
const requirePublish = process.env.REQUIRE_PUBLISH === "true";

const exec = (cmd) => {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd: root, stdio: "inherit" });
};

const failOrSkip = (message) => {
  if (requirePublish) {
    console.error(`::error::${message}`);
    process.exit(1);
  }
  console.log(message);
  process.exit(0);
};

const version = readEntryVersion(root);
const tag = `lexsys@${version}`;
const title = `Lexsys ${version}`;

if (githubReleaseExists(tag, { root })) {
  console.log(`Release ${tag} already exists — skipping.`);
  process.exit(0);
}

const onNpm = await waitForNpmPublish(version, { root });
if (!onNpm) {
  failOrSkip(
    `@dalexto/lexsys@${version} is not on npm after polling — skipping GitHub release.`,
  );
}

const resolveTarget = (ref) => {
  try {
    return execSync(`git rev-parse ${ref}^{commit}`, {
      cwd: root,
      encoding: "utf8",
      stdio: "pipe",
    }).trim();
  } catch {
    return ref;
  }
};

const notesDir = join(root, ".tmp");
mkdirSync(notesDir, { recursive: true });
const notesFile = join(notesDir, `release-notes-${version}.md`);
writeFileSync(notesFile, buildReleaseNotes(version, root), "utf8");

const target = resolveTarget(process.env.GITHUB_SHA ?? "HEAD");
exec(
  `gh release create "${tag}" --title "${title}" --notes-file "${notesFile}" --target "${target}"`,
);

console.log(`Created GitHub release ${title} (${tag})`);
