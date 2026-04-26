#!/usr/bin/env node

import { runAdd } from "./commands/add.js";
import { runConfig } from "./commands/config.js";
import { runDoctor } from "./commands/doctor.js";
import { runHelp } from "./commands/help.js";
import { runInit } from "./commands/init.js";
import { runList } from "./commands/list.js";
import { runRegistry } from "./commands/registry.js";
import { runStatus } from "./commands/status.js";
import { runUninstall } from "./commands/uninstall.js";
import { runUpdate } from "./commands/update.js";
import { runVersion } from "./commands/version.js";
import { setCwd } from "./core/context.js";
import { getFlagValue } from "./core/flags.js";

const [, , command, ...args] = process.argv;

const cwd = getFlagValue(args, "--cwd");

if (cwd) {
  setCwd(cwd);
}

if (
  !command ||
  command === "help" ||
  command === "--help" ||
  command === "-h"
) {
  runHelp();
  process.exit(0);
}

if (command === "version" || command === "--version" || command === "-v") {
  await runVersion();
  process.exit(0);
}

if (command === "list") {
  runList({
    json: args.includes("--json"),
  });
  process.exit(0);
}

if (command === "doctor") {
  await runDoctor();
  process.exit(0);
}

if (command === "init") {
  await runInit();
  process.exit(0);
}

if (command === "add") {
  await runAdd(args);
  process.exit(0);
}

if (command === "update") {
  await runUpdate(args);
  process.exit(0);
}

if (command === "status") {
  await runStatus();
  process.exit(0);
}

if (command === "registry") {
  await runRegistry({
    summary: args.includes("--summary"),
  });
  process.exit(0);
}

if (command === "config") {
  await runConfig({
    path: args.includes("--path") || args.includes("-p"),
    exists: args.includes("--exists") || args.includes("-e"),
    setRegistryUrl: getFlagValue(args, "--set-registry-url"),
    clearRegistryUrl: args.includes("--clear-registry-url"),
  });
  process.exit(0);
}

if (command === "uninstall") {
  await runUninstall(args);
  process.exit(0);
}

console.log(`Unknown command: ${command}\n`);
runHelp();
process.exit(1);
