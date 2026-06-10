import { getInstallLayer } from "@dalexto/lexsys-registry";
import type { RegistryItem } from "@dalexto/lexsys-registry";

const monorepoCrossLayerPatterns = [
  /\.\.\/\.\.\/primitives\//g,
  /\.\.\/\.\.\/blocks\//g,
  /\.\.\/\.\.\/templates\//g,
] as const;

const registryTemplateLayers = ["primitives", "blocks", "templates"] as const;

const toFlatSiblingImportPath = (importPath: string): string => {
  const segments = importPath.split("/").filter(Boolean);

  if (segments.length >= 2) {
    return `../${segments.join("/")}`;
  }

  const name = segments[0] ?? importPath;

  return `../${name}/${name}`;
};

const relativeJsImportPattern = /from "(\.\/[^"]+)\.js"/g;

export const stripRelativeJsImportExtensions = (content: string): string => {
  return content.replace(relativeJsImportPattern, 'from "$1"');
};

export const rewriteCrossLayerImports = (content: string): string => {
  let rewritten = content;

  for (const pattern of monorepoCrossLayerPatterns) {
    rewritten = rewritten.replace(pattern, "../");
  }

  for (const layer of registryTemplateLayers) {
    const pattern = new RegExp(`from "@/components/${layer}/([^"]+)"`, "g");

    rewritten = rewritten.replace(pattern, (_, importPath: string) => {
      return `from "${toFlatSiblingImportPath(importPath)}"`;
    });
  }

  return rewritten;
};

export const prepareInstalledFileContent = (
  content: string,
  item: RegistryItem,
): string => {
  const layer = getInstallLayer(item);

  if (layer !== "block" && layer !== "template") {
    return content;
  }

  return stripRelativeJsImportExtensions(rewriteCrossLayerImports(content));
};
