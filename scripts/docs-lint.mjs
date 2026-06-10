#!/usr/bin/env node
// Lightweight docs linter: required frontmatter metadata on docs markdown files.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = join(scriptDir, "..");
const docsRoot = join(root, "docs");

const REQUIRED_METADATA = ["**Audience:**", "**Type:**", "**Last reviewed:**"];

const SKIP_FILES = new Set(["docs/REVIEW_TODO.md", "docs/ROADMAP.md"]);

const walkMarkdown = (dir, files = []) => {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      walkMarkdown(fullPath, files);
      continue;
    }

    if (entry.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
};

const errors = [];

const checkMetadata = (relativePath, content) => {
  if (SKIP_FILES.has(relativePath.replaceAll("\\", "/"))) {
    return;
  }

  const headingEnd = content.indexOf("\n---");

  if (headingEnd === -1) {
    errors.push(
      `${relativePath}: missing metadata block (expected --- after H1 metadata)`,
    );
    return;
  }

  const metadataBlock = content.slice(0, headingEnd);

  for (const field of REQUIRED_METADATA) {
    if (!metadataBlock.includes(field)) {
      errors.push(`${relativePath}: missing metadata field ${field}`);
    }
  }

  const lastReviewed = metadataBlock.match(/\*\*Last reviewed:\*\*\s*(\S+)/);

  if (lastReviewed && !/^\d{4}-\d{2}-\d{2}$/.test(lastReviewed[1])) {
    errors.push(
      `${relativePath}: Last reviewed must be YYYY-MM-DD (got ${lastReviewed[1]})`,
    );
  }
};

for (const filePath of walkMarkdown(docsRoot)) {
  const relativePath = relative(root, filePath).replaceAll("\\", "/");
  const content = readFileSync(filePath, "utf8");

  checkMetadata(relativePath, content);
}

if (errors.length > 0) {
  console.error("docs:lint failed:\n");
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log("docs:lint passed.");
