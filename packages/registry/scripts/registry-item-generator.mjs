import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { getRegistryDependenciesFromTemplateContents } from "./lib/registry-composition-imports.mjs";

const scriptsRoot = dirname(fileURLToPath(import.meta.url));
const registryPackageRoot = resolve(scriptsRoot, "..");
const repoRoot = resolve(registryPackageRoot, "../..");

let prettierInstance = null;

const normalizeItemSource = async (source, filepath) => {
  if (!prettierInstance) {
    const prettierModule = await import(
      pathToFileURL(resolve(repoRoot, "node_modules/prettier/index.mjs")).href
    );
    prettierInstance = prettierModule.default;
  }

  const config = await prettierInstance.resolveConfig(filepath);

  return prettierInstance.format(source, {
    ...config,
    filepath,
  });
};

const syncableExtensions = new Set([".ts", ".tsx"]);

const formComponentNames = new Set([
  "Autocomplete",
  "Checkbox",
  "CheckboxGroup",
  "Combobox",
  "Field",
  "Fieldset",
  "Form",
  "Input",
  "NumberField",
  "OtpField",
  "Radio",
  "RadioGroup",
  "Select",
  "Slider",
  "Switch",
  "Textarea",
]);

const overlayComponentNames = new Set([
  "AlertDialog",
  "ContextMenu",
  "Dialog",
  "Drawer",
  "Menu",
  "Menubar",
  "NavigationMenu",
  "Popover",
  "PreviewCard",
  "Tooltip",
]);

const dataDisplayComponentNames = new Set(["Avatar", "Meter"]);

const layoutComponentNames = new Set(["Collapsible", "ScrollArea"]);

const actionComponentNames = new Set([
  "Button",
  "Toggle",
  "ToggleGroup",
  "Toolbar",
]);

const getExtension = (path) => {
  const lastDot = path.lastIndexOf(".");

  if (lastDot === -1) {
    return "";
  }

  return path.slice(lastDot);
};

const fileExists = async (path) => {
  try {
    await readFile(path, "utf-8");
    return true;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return false;
    }

    throw error;
  }
};

const collectFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = resolve(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(path)));
      continue;
    }

    if (entry.isFile() && syncableExtensions.has(getExtension(entry.name))) {
      files.push(path);
    }
  }

  return files;
};

export const listComponentNames = async (directory) => {
  try {
    const entries = await readdir(directory, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }

    throw error;
  }
};

const toKebabCase = (value) => {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};

const toCamelCase = (value) => {
  return value.replace(/[-_\s]+([a-zA-Z0-9])/g, (_, letter) =>
    letter.toUpperCase(),
  );
};

const getPrimitiveCategory = (componentName) => {
  if (actionComponentNames.has(componentName)) {
    return "actions";
  }

  if (formComponentNames.has(componentName)) {
    return "forms";
  }

  if (overlayComponentNames.has(componentName)) {
    return "overlays";
  }

  if (dataDisplayComponentNames.has(componentName)) {
    return "data-display";
  }

  if (layoutComponentNames.has(componentName)) {
    return "layout";
  }

  return "utilities";
};

const getTemplateFileOrder = (componentName, path) => {
  const fileName = path.split("/").at(-1);

  if (fileName === `${componentName}.tsx`) {
    return 0;
  }

  if (fileName === `${componentName}.types.ts`) {
    return 1;
  }

  if (fileName === `${componentName}.variants.ts`) {
    return 2;
  }

  return 10;
};

const formatStringArray = (values) => {
  if (values.length === 0) {
    return "[]";
  }

  return `[\n${values.map((value) => `    "${value}",`).join("\n")}\n  ]`;
};

const formatRemoteFiles = (files) => {
  return `[\n${files
    .map(
      (file) => `    {
      path: "${file}",
    },`,
    )
    .join("\n")}\n  ]`;
};

const parseStringArrayField = (source, fieldName) => {
  const match = new RegExp(`${fieldName}:\\s*(\\[[^\\]]*\\])`, "s").exec(
    source,
  );

  if (!match) {
    return [];
  }

  const values = [];

  for (const itemMatch of match[1].matchAll(/"([^"]+)"/g)) {
    values.push(itemMatch[1]);
  }

  return values;
};

const parseCategory = (source) => {
  const match = /category:\s*"([^"]+)"/.exec(source);

  return match?.[1];
};

const parseExistingItemFields = (source) => {
  return {
    aliases: parseStringArrayField(source, "aliases"),
    category: parseCategory(source),
    hasRemoteFiles: /\bremoteFiles:\s*\[/.test(source),
  };
};

const getTemplateContent = async (absolutePaths) => {
  const contents = await Promise.all(
    absolutePaths.map(async (file) => readFile(file, "utf-8")),
  );

  return contents.join("\n");
};

const getDependencies = (templateContent) => {
  const dependencies = new Set();

  if (templateContent.includes("@base-ui/react")) {
    dependencies.add("@base-ui/react");
  }

  if (templateContent.includes("class-variance-authority")) {
    dependencies.add("class-variance-authority");
  }

  if (templateContent.includes("lucide-react")) {
    dependencies.add("lucide-react");
  }

  if (templateContent.includes("@/lib/utils")) {
    dependencies.add("clsx");
    dependencies.add("tailwind-merge");
  }

  return [...dependencies].sort((a, b) => a.localeCompare(b));
};

const getUtilities = (templateContent) => {
  if (templateContent.includes("@/lib/utils")) {
    return ["cn"];
  }

  return [];
};

const buildRegistryItemSource = async ({
  aliases,
  category,
  componentName,
  includeRemoteFiles,
  itemName,
  itemType,
  itemVariableName,
  templateRoot,
  templatePrefix,
  targetPrefix,
}) => {
  const componentRoot = resolve(templateRoot, componentName);
  const absoluteFiles = await collectFiles(componentRoot);
  const files = absoluteFiles
    .map((file) => {
      return `${templatePrefix}/${relative(templateRoot, file).replaceAll("\\", "/")}`;
    })
    .sort((a, b) => {
      const orderDifference =
        getTemplateFileOrder(componentName, a) -
        getTemplateFileOrder(componentName, b);

      if (orderDifference !== 0) {
        return orderDifference;
      }

      return a.localeCompare(b);
    });
  const templateContents = await Promise.all(
    absoluteFiles.map(async (file) => readFile(file, "utf-8")),
  );
  const templateContent = templateContents.join("\n");
  const dependencies = getDependencies(templateContent);
  const utilities = getUtilities(templateContent);
  const registryDependencies = getRegistryDependenciesFromTemplateContents(
    templateContents.filter((_, index) =>
      absoluteFiles[index].endsWith(".tsx"),
    ),
  );
  const entityLabel = itemType === "block" ? "block" : "component";
  const remoteFilesBlock = includeRemoteFiles
    ? `  remoteFiles: ${formatRemoteFiles(files)},\n`
    : "";

  return `/**
 * ${itemName}.ts
 *
 * Registry metadata for the ${componentName} ${entityLabel}.
 */

import type { RegistryItem } from "../registry.types.js"

export const ${itemVariableName}: RegistryItem = {
  name: "${itemName}",
  canonicalName: "${componentName}",
  type: "${itemType}",
  category: "${category}",
  aliases: ${formatStringArray(aliases)},
  files: ${formatStringArray(files)},
${remoteFilesBlock}  dependencies: ${formatStringArray(dependencies)},
  registryDependencies: ${formatStringArray(registryDependencies)},
  utilities: ${formatStringArray(utilities)},
  styles: ["theme"],
  target: "${targetPrefix}/${componentName}",
}
`;
};

const insertBefore = (source, insertion, marker) => {
  if (source.includes(insertion)) {
    return source;
  }

  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error(`Could not find marker in registry index: ${marker}`);
  }

  return `${source.slice(0, markerIndex)}${insertion}${source.slice(markerIndex)}`;
};

const ensureRegistryItemEntry = (source, itemVariableName) => {
  const entry = `  ${itemVariableName},`;

  if (source.includes(entry)) {
    return source;
  }

  const registryItemsPattern =
    /export const registryItems: RegistryItem\[] = \[\n(?<items>[\s\S]*?)\n\]/;
  const match = registryItemsPattern.exec(source);

  if (match === null || match.groups === undefined) {
    throw new Error("Could not find registryItems array in registry index.");
  }

  const nextItems = `${match.groups.items}\n${entry}`;

  return source.replace(
    registryItemsPattern,
    `export const registryItems: RegistryItem[] = [\n${nextItems}\n]`,
  );
};

const ensureRegistryIndex = async ({ checkOnly, indexPath, items }) => {
  let source = await readFile(indexPath, "utf-8");
  const missingEntries = [];

  for (const item of items) {
    const exportLine = `export { ${item.itemVariableName} } from "./${item.itemName}.js";\n`;
    const importLine = `import { ${item.itemVariableName} } from "./${item.itemName}.js";\n`;
    const registryEntry = `  ${item.itemVariableName},`;

    if (!source.includes(exportLine.trim())) {
      missingEntries.push(`export:${item.itemName}`);
    }

    if (!source.includes(importLine.trim())) {
      missingEntries.push(`import:${item.itemName}`);
    }

    if (!source.includes(registryEntry)) {
      missingEntries.push(`registryItems:${item.itemName}`);
    }

    if (checkOnly) {
      continue;
    }

    source = insertBefore(source, importLine, "\nexport {");
    source = insertBefore(source, exportLine, "export const registryItems");
    source = ensureRegistryItemEntry(source, item.itemVariableName);
  }

  if (checkOnly) {
    return missingEntries;
  }

  await writeFile(indexPath, source, "utf-8");
  return [];
};

export const syncRegistryItems = async ({
  checkOnly,
  defaultCategory,
  itemType = "component",
  reconcile = true,
  registryRoot,
  sourceComponentNames,
  templatePrefix = "primitives",
  targetPrefix = "src/components/ui",
  templateRoot,
  uiSourceRoot,
}) => {
  const componentNames =
    sourceComponentNames ??
    (await listComponentNames(uiSourceRoot ?? templateRoot));
  const itemRoot = resolve(registryRoot, "src/items");
  const indexPath = resolve(registryRoot, "src/items/index.ts");
  const missingItemFiles = [];
  const outOfSyncItemFiles = [];
  const items = [];
  let createdItemCount = 0;
  let updatedItemCount = 0;

  for (const componentName of componentNames) {
    const itemName = toKebabCase(componentName);
    const itemVariableName = `${toCamelCase(itemName)}RegistryItem`;
    const itemPath = resolve(itemRoot, `${itemName}.ts`);
    const itemAlreadyExists = await fileExists(itemPath);

    items.push({ itemName, itemVariableName });

    const resolvedCategory =
      itemType === "component"
        ? getPrimitiveCategory(componentName)
        : (defaultCategory ?? "blocks");

    let aliases = [];
    let category = resolvedCategory;
    let includeRemoteFiles = itemType === "component";

    if (itemAlreadyExists) {
      const existingSource = await readFile(itemPath, "utf-8");
      const preserved = parseExistingItemFields(existingSource);
      aliases = preserved.aliases;
      category = preserved.category ?? resolvedCategory;
      includeRemoteFiles =
        itemType === "component" ? true : preserved.hasRemoteFiles;
    } else {
      missingItemFiles.push(`${itemName}.ts`);
    }

    const nextSource = await buildRegistryItemSource({
      aliases,
      category,
      componentName,
      includeRemoteFiles,
      itemName,
      itemType,
      itemVariableName,
      templateRoot,
      templatePrefix,
      targetPrefix,
    });
    const normalizedNextSource = await normalizeItemSource(
      nextSource,
      itemPath,
    );

    if (checkOnly) {
      if (!itemAlreadyExists) {
        continue;
      }

      const existingSource = await readFile(itemPath, "utf-8");
      const normalizedExistingSource = await normalizeItemSource(
        existingSource,
        itemPath,
      );

      if (normalizedExistingSource !== normalizedNextSource) {
        outOfSyncItemFiles.push(`${itemName}.ts`);
      }

      continue;
    }

    if (!reconcile && itemAlreadyExists) {
      continue;
    }

    const existingSource = itemAlreadyExists
      ? await readFile(itemPath, "utf-8")
      : null;
    const normalizedExistingSource =
      existingSource === null
        ? null
        : await normalizeItemSource(existingSource, itemPath);

    if (
      !itemAlreadyExists ||
      normalizedExistingSource !== normalizedNextSource
    ) {
      await mkdir(dirname(itemPath), { recursive: true });
      await writeFile(itemPath, normalizedNextSource, "utf-8");

      if (itemAlreadyExists) {
        updatedItemCount += 1;
      } else {
        createdItemCount += 1;
      }
    }
  }

  const missingIndexEntries = await ensureRegistryIndex({
    checkOnly,
    indexPath,
    items,
  });

  return {
    createdItemCount,
    missingIndexEntries,
    missingItemFiles,
    outOfSyncItemFiles,
    updatedItemCount,
  };
};
