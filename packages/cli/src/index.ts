#!/usr/bin/env node

import { CliError, handleCliError } from "./utils/cli-error.js"
import { runAdd } from "./commands/add.js"
import { runConfig } from "./commands/config.js"
import { runDoctor } from "./commands/doctor.js"
import { runHelp, runHelpFor } from "./commands/help.js"
import { runInit } from "./commands/init.js"
import { runList } from "./commands/list.js"
import { runRegistry } from "./commands/registry.js"
import { runStatus } from "./commands/status.js"
import { runReset } from "./commands/reset.js"
import { runUninstall } from "./commands/uninstall.js"
import { runUpdate } from "./commands/update.js"
import { runVersion } from "./commands/version.js"
import { setCwd } from "./utils/context.js"
import { getFlagValue, hasFlag } from "./utils/flags.js"

const [, , command, ...args] = process.argv

const cwd = getFlagValue(args, "--cwd", "-C")

if (cwd) {
  setCwd(cwd)
}
try {
  if (
    !command ||
    command === "help" ||
    command === "--help" ||
    command === "-h"
  ) {
    runHelp()
    process.exit(0)
  }

  if (command === "version" || command === "--version" || command === "-v") {
    await runVersion()
    process.exit(0)
  }

  if (command === "list" || command === "ls") {
    if (hasFlag(args, "--help", "-h")) {
      runHelpFor("list")
      process.exit(0)
    }
    await runList({
      json: hasFlag(args, "--json", "-j"),
      noFallback: args.includes("--no-fallback"),
    })
    process.exit(0)
  }

  if (command === "doctor" || command === "dr") {
    if (hasFlag(args, "--help", "-h")) {
      runHelpFor("doctor")
      process.exit(0)
    }
    await runDoctor({
      noFallback: args.includes("--no-fallback"),
    })
    process.exit(0)
  }

  if (command === "init" || command === "create") {
    if (hasFlag(args, "--help", "-h")) {
      runHelpFor("init")
      process.exit(0)
    }
    await runInit(args)
    process.exit(0)
  }

  if (command === "add" || command === "a") {
    if (hasFlag(args, "--help", "-h")) {
      runHelpFor("add")
      process.exit(0)
    }
    await runAdd(args)
    process.exit(0)
  }

  if (command === "update" || command === "up") {
    if (hasFlag(args, "--help", "-h")) {
      runHelpFor("update")
      process.exit(0)
    }
    await runUpdate(args)
    process.exit(0)
  }

  if (command === "status" || command === "st") {
    if (hasFlag(args, "--help", "-h")) {
      runHelpFor("status")
      process.exit(0)
    }
    await runStatus({
      noFallback: args.includes("--no-fallback"),
    })
    process.exit(0)
  }

  if (command === "registry" || command === "reg") {
    if (hasFlag(args, "--help", "-h")) {
      runHelpFor("registry")
      process.exit(0)
    }
    await runRegistry({
      summary: hasFlag(args, "--summary", "-s"),
      source: args.includes("--source"),
      local: hasFlag(args, "--local", "-l"),
      remote: hasFlag(args, "--remote", "-r"),
      noFallback: args.includes("--no-fallback"),
    })
    process.exit(0)
  }

  if (command === "config" || command === "cfg") {
    if (hasFlag(args, "--help", "-h")) {
      runHelpFor("config")
      process.exit(0)
    }
    await runConfig({
      path: args.includes("--path") || args.includes("-p"),
      exists: args.includes("--exists") || args.includes("-e"),
      setRegistryUrl: getFlagValue(args, "--set-registry-url"),
      clearRegistryUrl: args.includes("--clear-registry-url"),
    })
    process.exit(0)
  }

  if (command === "reset") {
    if (hasFlag(args, "--help", "-h")) {
      runHelpFor("reset")
      process.exit(0)
    }
    await runReset(args)
    process.exit(0)
  }

  if (command === "uninstall" || command === "rm") {
    if (hasFlag(args, "--help", "-h")) {
      runHelpFor("uninstall")
      process.exit(0)
    }
    await runUninstall(args)
    process.exit(0)
  }

  throw new CliError(`Unknown command: ${command}`)
} catch (error) {
  handleCliError(error)
}
