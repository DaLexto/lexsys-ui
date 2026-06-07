#!/usr/bin/env node
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import {
  githubReleaseExists,
  isPublishedOnNpm,
  readEntryVersion,
} from "./release-utils.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "../..")
const version = readEntryVersion(root)
const tag = `lexsys@${version}`
const errors = []

if (!isPublishedOnNpm(version, { root })) {
  errors.push(`npm: @dalexto/lexsys@${version} is not published`)
}

if (!githubReleaseExists(tag, { root })) {
  errors.push(`github: release ${tag} does not exist`)
}

if (errors.length > 0) {
  for (const message of errors) {
    console.error(`::error::${message}`)
  }
  process.exit(1)
}

console.log(`release parity OK — npm and GitHub both at ${version} (${tag})`)
