import { loadConfig } from "../config/config.js"
import { isRegistryUrlAllowed } from "./remote.js"

export const getRegistrySource = async (): Promise<string> => {
  const config = await loadConfig()
  const registryUrl = config.registryUrl

  if (!registryUrl) {
    return "local"
  }

  if (!isRegistryUrlAllowed(registryUrl, config.registryAllowlist)) {
    throw new Error(
      `Registry URL is not allowed by registryAllowlist: ${registryUrl}`,
    )
  }

  return registryUrl
}
