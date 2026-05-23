import { getInstallLayer } from "@neurex/registry"
import type { RegistryItem } from "@neurex/registry"

const crossLayerImportPatterns = [
  /\.\.\/\.\.\/primitives\//g,
  /\.\.\/\.\.\/blocks\//g,
  /\.\.\/\.\.\/templates\//g,
] as const

export const rewriteCrossLayerImports = (content: string): string => {
  let rewritten = content

  for (const pattern of crossLayerImportPatterns) {
    rewritten = rewritten.replace(pattern, "../")
  }

  return rewritten
}

export const prepareInstalledFileContent = (
  content: string,
  item: RegistryItem,
): string => {
  const layer = getInstallLayer(item)

  if (layer !== "block" && layer !== "template") {
    return content
  }

  return rewriteCrossLayerImports(content)
}
