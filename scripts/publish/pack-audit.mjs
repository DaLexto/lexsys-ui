#!/usr/bin/env node
/**
 * M10 publish gate: validate publish metadata and pack @lexsys/cli + @lexsys/registry.
 * Run after `pnpm build`, `pnpm sync:all`, and `pnpm check` (see DEPLOY.md).
 */
import { execSync } from "node:child_process"
import { existsSync, readFileSync, rmSync, mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const scriptDir = dirname(fileURLToPath(import.meta.url))
const root = join(scriptDir, "..", "..")
const outDir = join(root, ".tmp", "pack-audit")

const publishPackages = [
  {
    dir: "packages/registry",
    name: "@lexsys/registry",
    requiredInTarball: [
      "package/dist/index.js",
      "package/templates/styles/tokens.css",
    ],
  },
  {
    dir: "packages/cli",
    name: "@lexsys/cli",
    requiredInTarball: ["package/dist/index.js"],
  },
]

const requiredFields = [
  "name",
  "version",
  "description",
  "license",
  "repository",
  "files",
]

const fail = (message) => {
  console.error(`publish:pack-audit: FAIL — ${message}`)
  process.exit(1)
}

const readPackageJson = (packageDir) => {
  const path = join(root, packageDir, "package.json")
  return JSON.parse(readFileSync(path, "utf8"))
}

const tarballFileName = (name, version) => {
  return `${name.replace("@", "").replace("/", "-")}-${version}.tgz`
}

const listTarballEntries = (tarballPath) => {
  const output = execSync(`tar -tzf "${tarballPath}"`, { encoding: "utf8" })
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

const auditMetadata = () => {
  if (!existsSync(join(root, "LICENSE"))) {
    fail("root LICENSE file is missing")
  }

  if (!existsSync(join(root, "CHANGELOG.md"))) {
    fail("root CHANGELOG.md is missing (M10.1)")
  }

  for (const { dir, name } of publishPackages) {
    const pkg = readPackageJson(dir)

    if (pkg.private === true) {
      fail(`${name}: "private" must be false (or removed) before publish`)
    }

    for (const field of requiredFields) {
      if (
        pkg[field] === undefined ||
        pkg[field] === null ||
        pkg[field] === ""
      ) {
        fail(`${name}: missing package.json field "${field}"`)
      }
    }

    if (pkg.license !== "MIT") {
      fail(`${name}: license must be "MIT"`)
    }

    if (!Array.isArray(pkg.files) || pkg.files.length === 0) {
      fail(`${name}: "files" must list distributable paths`)
    }

    if (name === "@lexsys/cli" && !pkg.bin?.lexsys) {
      fail(`${name}: bin.lexsys is required`)
    }

    if (name === "@lexsys/registry" && !pkg.exports?.["."]) {
      fail(`${name}: exports["."] is required`)
    }

    const distEntry = join(root, dir, "dist", "index.js")
    if (!existsSync(distEntry)) {
      fail(`${name}: dist/index.js missing — run pnpm build first`)
    }
  }

  console.log("publish:pack-audit: metadata OK")
}

const packPackages = () => {
  rmSync(outDir, { recursive: true, force: true })
  mkdirSync(outDir, { recursive: true })

  for (const { dir, name } of publishPackages) {
    console.log(`publish:pack-audit: packing ${name}…`)
    execSync(`pnpm pack --pack-destination "${outDir}"`, {
      cwd: join(root, dir),
      stdio: "inherit",
    })
  }
}

const auditTarballs = () => {
  for (const { dir, name, requiredInTarball } of publishPackages) {
    const version = readPackageJson(dir).version
    const tarballPath = join(outDir, tarballFileName(name, version))

    if (!existsSync(tarballPath)) {
      fail(`expected tarball not found: ${tarballPath}`)
    }

    const entries = listTarballEntries(tarballPath)

    for (const requiredPath of requiredInTarball) {
      if (!entries.includes(requiredPath)) {
        fail(`${name}: tarball missing ${requiredPath}`)
      }
    }

    if (!entries.includes("package/package.json")) {
      fail(`${name}: tarball missing package/package.json`)
    }

    console.log(
      `publish:pack-audit: tarball OK — ${tarballFileName(name, version)} (${entries.length} entries)`,
    )
  }
}

const main = () => {
  console.log("publish:pack-audit: validating publish metadata…")
  auditMetadata()
  packPackages()
  auditTarballs()
  console.log(
    "publish:pack-audit: OK — pack tarballs ready in .tmp/pack-audit/",
  )
}

main()
