#!/usr/bin/env node

import { mkdir, copyFile, access, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { registryItems } from "@neurex-ui/registry";

const [, , command, ...args] = process.argv;

const cliFilePath = fileURLToPath(import.meta.url);
const cliDistDir = dirname(cliFilePath);
const repoRoot = join(cliDistDir, "..", "..", "..");
const registryTemplatesRoot = join(
  repoRoot,
  "packages",
  "registry",
  "templates",
);

const fileExists = async (path: string): Promise<boolean> => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const filesAreEqual = async (
  sourcePath: string,
  targetPath: string,
): Promise<boolean> => {
  const sourceContent = await readFile(sourcePath, "utf-8");
  const targetContent = await readFile(targetPath, "utf-8");

  return sourceContent === targetContent;
};

const findItem = (name: string) => {
  const normalizedName = name.toLowerCase();

  return registryItems.find(
    (item) =>
      item.name.toLowerCase() === normalizedName ||
      item.canonicalName.toLowerCase() === normalizedName ||
      item.aliases.some((alias) => alias.toLowerCase() === normalizedName),
  );
};

const installDependencies = async (deps: string[]) => {
  if (!deps.length) return;

  let packageJson: any = {};

  try {
    const content = await readFile("package.json", "utf-8");
    packageJson = JSON.parse(content);
  } catch {
    console.log("No package.json found, skipping dependency install.");
    return;
  }

  const existingDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const missing = deps.filter((dep) => !existingDeps?.[dep]);

  if (!missing.length) {
    console.log("All dependencies already installed.\n");
    return;
  }

  console.log("Installing dependencies:");
  missing.forEach((d) => console.log(`- ${d}`));
  console.log("");

  execSync(`pnpm add ${missing.join(" ")}`, {
    stdio: "inherit",
  });
};

const sharedTemplatesRoot = join(registryTemplatesRoot, "shared");

const installUtilities = async (utilities: string[]): Promise<void> => {
  for (const utility of utilities) {
    if (utility !== "cn") {
      console.log(`Unknown utility "${utility}", skipping.`);
      continue;
    }

    const sourcePath = join(sharedTemplatesRoot, "utils", "cn.ts");
    const targetPath = join(process.cwd(), "lib", "neurex", "cn.ts");

    await mkdir(dirname(targetPath), { recursive: true });

    if (await fileExists(targetPath)) {
      const isSameFile = await filesAreEqual(sourcePath, targetPath);

      if (isSameFile) {
        console.log(`Skipped identical utility: ${targetPath}`);
        continue;
      }

      console.log(
        `Conflict: utility already exists and differs: ${targetPath}`,
      );
      continue;
    }
    await copyFile(sourcePath, targetPath);
    console.log(`Created utility: ${targetPath}`);
  }
};

const ensureProjectStructure = async (): Promise<void> => {
  await mkdir(join(process.cwd(), "components", "ui"), { recursive: true });
  await mkdir(join(process.cwd(), "lib", "neurex"), { recursive: true });
  await mkdir(join(process.cwd(), "styles", "neurex"), { recursive: true });
};

const installItemFiles = async (itemName: string): Promise<void> => {
  const item = findItem(itemName);

  if (!item) {
    console.log(`Component "${itemName}" not found.`);
    process.exit(1);
  }

  console.log(`Installing ${item.canonicalName}...\n`);

  await ensureProjectStructure();
  await installDependencies(item.dependencies);
  await installUtilities(item.utilities);

  for (const file of item.files) {
    const sourcePath = join(registryTemplatesRoot, file);
    const fileName = file.split("/").at(-1);

    if (!fileName) {
      console.log(`Invalid registry file path: ${file}`);
      process.exit(1);
    }

    const targetPath = join(process.cwd(), item.target, fileName);

    await mkdir(dirname(targetPath), { recursive: true });

    if (await fileExists(targetPath)) {
      const isSameFile = await filesAreEqual(sourcePath, targetPath);

      if (isSameFile) {
        console.log(`Skipped identical file: ${targetPath}`);
        continue;
      }

      console.log(`Conflict: file already exists and differs: ${targetPath}`);
      continue;
    }

    await copyFile(sourcePath, targetPath);
    console.log(`Created: ${targetPath}`);
  }

  console.log("\nDone.");
};

const runDoctor = async (): Promise<void> => {
  console.log("Neurex UI doctor\n");

  const checks = [
    {
      label: "package.json",
      path: join(process.cwd(), "package.json"),
    },
    {
      label: "components/ui",
      path: join(process.cwd(), "components", "ui"),
    },
    {
      label: "lib/neurex",
      path: join(process.cwd(), "lib", "neurex"),
    },
    {
      label: "styles/neurex",
      path: join(process.cwd(), "styles", "neurex"),
    },
  ];

  for (const check of checks) {
    const exists = await fileExists(check.path);
    console.log(`${exists ? "✓" : "×"} ${check.label}`);
  }
};

const writeFileIfMissing = async (
  path: string,
  content: string,
): Promise<void> => {
  if (await fileExists(path)) {
    console.log(`Skipped existing file: ${path}`);
    return;
  }

  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, "utf-8");
  console.log(`Created: ${path}`);
};

const printAvailableItems = (): void => {
  console.log("Available Neurex UI components:\n");

  for (const item of registryItems) {
    console.log(`- ${item.canonicalName} (${item.category})`);
  }
};

const runInit = async (): Promise<void> => {
  console.log("Initializing Neurex UI...\n");

  await mkdir(join(process.cwd(), "components", "ui"), { recursive: true });
  await mkdir(join(process.cwd(), "lib", "neurex"), { recursive: true });
  await mkdir(join(process.cwd(), "styles", "neurex"), { recursive: true });

  await writeFileIfMissing(
    join(process.cwd(), "neurex.config.json"),
    JSON.stringify(
      {
        componentsPath: "components/ui",
        utilitiesPath: "lib/neurex",
        stylesPath: "styles/neurex",
      },
      null,
      2,
    ) + "\n",
  );

  console.log("\nDone.");
};

if (command === "list") {
  printAvailableItems();
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
  if (!args.length) {
  console.log("No component specified.\n");
  printAvailableItems();
  process.exit(0);
}

  for (const name of args) {
    await installItemFiles(name);
    console.log("");
  }

  process.exit(0);
}

console.log("Neurex UI CLI\n");
console.log("Available commands:");
console.log("- list");
console.log("- add <component>");
console.log("- doctor");
console.log("- init");
