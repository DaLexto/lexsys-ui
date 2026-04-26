#!/usr/bin/env node

import { runDoctor } from "./commands/doctor.js";
import { runList } from "./commands/list.js";
import { runInit } from "./commands/init.js";
import { runAdd } from "./commands/add.js";
import { runUpdate } from "./commands/update.js";
import { runHelp } from "./commands/help.js";
import { runVersion } from "./commands/version.js";
import { runStatus } from "./commands/status.js";
import { runRegistry } from "./commands/registry.js";
import { runConfig } from "./commands/config.js";

const [, , command, ...args] = process.argv;

if (!command || command === "help" || command === "--help" || command === "-h") {
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

if (command === "add"){
  await runAdd(args)
  process.exit(0)
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
  runRegistry({
    summary: args.includes("--summary"),
  });
  process.exit(0);
}

if (command === "config") {
  await runConfig();
  process.exit(0);
}

console.log(`Unknown command: ${command}\n`);
runHelp();
process.exit(1);
