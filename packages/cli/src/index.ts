#!/usr/bin/env node

import { runDoctor } from "./commands/doctor.js";
import { runList } from "./commands/list.js";
import { runInit } from "./commands/init.js";
import { runAdd } from "./commands/add.js";
import { runUpdate } from "./commands/update.js";

const [, , command, ...args] = process.argv;

if (command === "list") {
  runList();
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

console.log("Neurex UI CLI\n");
console.log("Available commands:");
console.log("- list");
console.log("- add <component>");
console.log("- doctor");
console.log("- init");
console.log("- update <component>");
console.log("- update --all");
